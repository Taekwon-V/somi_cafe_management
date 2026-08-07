import React, { useState, useEffect, useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import BrandingSidebar from '../components/BrandingSidebar';
import BrandingEditor from '../components/BrandingEditor';
import { BrandingDoc } from '../types/branding';

export default function Branding() {
  const [docs, setDocs] = useState<BrandingDoc[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Firestore 실시간 리스너
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'branding_docs'), (snapshot) => {
      const fetchedDocs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BrandingDoc[];
      
      // updatedAt 기준으로 오름차순 정렬 (생성순)
      fetchedDocs.sort((a, b) => a.updatedAt - b.updatedAt);
      setDocs(fetchedDocs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching docs: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddDoc = async (parentId: string | null, type: 'folder' | 'document', title: string) => {
    const newDocRef = doc(collection(db, 'branding_docs'));
    const newDoc: BrandingDoc = {
      id: newDocRef.id,
      title,
      content: '',
      parentId,
      type,
      updatedAt: Date.now(),
    };
    await setDoc(newDocRef, newDoc);
    
    if (type === 'document') {
      setSelectedDocId(newDoc.id);
    }
  };

  const handleDeleteDoc = async (id: string) => {
    const docToDelete = docs.find(d => d.id === id);
    if (!docToDelete) return;

    // 만약 폴더라면 하위 문서들도 모두 삭제
    if (docToDelete.type === 'folder') {
      const children = docs.filter(d => d.parentId === id);
      for (const child of children) {
        await deleteDoc(doc(db, 'branding_docs', child.id));
      }
    }
    
    await deleteDoc(doc(db, 'branding_docs', id));
    
    if (selectedDocId === id || docs.find(d => d.id === selectedDocId)?.parentId === id) {
      setSelectedDocId(null);
    }
  };

  // 디바운스된 업데이트 함수 (API 호출 낭비 방지)
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateFirestore = useCallback(
    debounce(async (id: string, field: string, value: string) => {
      const docRef = doc(db, 'branding_docs', id);
      await updateDoc(docRef, {
        [field]: value,
        updatedAt: Date.now()
      });
    }, 1000),
    []
  );

  const handleUpdateTitle = (id: string, title: string) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, title } : d));
    updateFirestore(id, 'title', title);
  };

  const handleUpdateContent = (id: string, content: string) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, content } : d));
    updateFirestore(id, 'content', content);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  const selectedDoc = docs.find(d => d.id === selectedDocId) || null;

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', m: -3 }}>
      <BrandingSidebar 
        docs={docs} 
        selectedDocId={selectedDocId} 
        onSelectDoc={setSelectedDocId}
        onAddDoc={handleAddDoc}
        onDeleteDoc={handleDeleteDoc}
      />
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <BrandingEditor 
          doc={selectedDoc} 
          onUpdateTitle={handleUpdateTitle}
          onUpdateContent={handleUpdateContent}
        />
      </Box>
    </Box>
  );
}
