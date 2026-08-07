import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Container, Grid, CircularProgress } from '@mui/material';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { GalleryCardData } from '../types/branding';
import BrandingGalleryCard from '../components/BrandingGalleryCard';
import BrandingDrawer from '../components/BrandingDrawer';

// Debounce helper for Firebase writes
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Branding() {
  const [cards, setCards] = useState<GalleryCardData[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, 'branding_docs');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GalleryCardData));
      docsData.sort((a, b) => a.title.localeCompare(b.title));
      setCards(docsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching docs: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCardClick = (id: string) => {
    setSelectedCardId(id);
    setDrawerOpen(true);
  };

  const debouncedUpdateFirebase = useCallback(
    debounce(async (cardId: string, updatedFields: any[]) => {
      try {
        const cardRef = doc(db, 'branding_docs', cardId);
        await updateDoc(cardRef, { fields: updatedFields, updatedAt: Date.now() });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }, 1000),
    []
  );

  const handleUpdateField = (cardId: string, fieldId: string, newValue: string) => {
    let newFields: any[] = [];
    
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        newFields = card.fields.map(f => f.id === fieldId ? { ...f, value: newValue } : f);
        return { ...card, fields: newFields };
      }
      return card;
    }));

    debouncedUpdateFirebase(cardId, newFields);
  };

  const selectedCard = cards.find(c => c.id === selectedCardId) || null;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8f9fa', minHeight: '100vh', overflowY: 'auto' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#111', mb: 1.5, letterSpacing: '-0.02em' }}>
            브랜드 기획 갤러리
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', fontSize: '1.1rem' }}>
            카페의 정체성과 공간 무드를 시각적인 갤러리 뷰에서 직관적으로 구체화해 보세요.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {cards.map(card => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <BrandingGalleryCard card={card} onClick={() => handleCardClick(card.id)} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <BrandingDrawer 
        open={drawerOpen}
        card={selectedCard}
        onClose={() => setDrawerOpen(false)}
        onUpdateField={handleUpdateField}
      />
    </Box>
  );
}
