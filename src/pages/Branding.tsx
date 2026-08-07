import { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Container, CircularProgress, Tabs, Tab, Paper, Divider } from '@mui/material';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { BrandingProposal, GalleryCardData } from '../types/branding';
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
  const [proposals, setProposals] = useState<BrandingProposal[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | false>(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, 'branding_proposals');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as BrandingProposal));
      data.sort((a, b) => a.title.localeCompare(b.title));
      setProposals(data);
      if (data.length > 0 && !activeTabId) {
        setActiveTabId(data[0].id);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching proposals: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeTabId]);

  const activeProposal = proposals.find(p => p.id === activeTabId) || null;
  const selectedCard = activeProposal?.cards.find(c => c.id === selectedCardId) || null;

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
    setDrawerOpen(true);
  };

  const debouncedUpdateFirebase = useCallback(
    debounce(async (proposalId: string, updatedCards: GalleryCardData[]) => {
      try {
        const ref = doc(db, 'branding_proposals', proposalId);
        await updateDoc(ref, { cards: updatedCards, updatedAt: Date.now() });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }, 1000),
    []
  );

  const handleUpdateField = (fieldId: string, newValue: string) => {
    if (!activeProposal || !selectedCardId) return;

    const newCards = activeProposal.cards.map(card => {
      if (card.id === selectedCardId) {
        const newFields = card.fields.map(f => f.id === fieldId ? { ...f, value: newValue } : f);
        return { ...card, fields: newFields };
      }
      return card;
    });

    // Optimistic Update
    setProposals(prev => prev.map(p => p.id === activeProposal.id ? { ...p, cards: newCards } : p));
    debouncedUpdateFirebase(activeProposal.id, newCards);
  };

  const handleUpdateSummary = (newValue: string) => {
    if (!activeProposal || !selectedCardId) return;

    const newCards = activeProposal.cards.map(card => {
      if (card.id === selectedCardId) {
        return { ...card, summarySentence: newValue };
      }
      return card;
    });

    setProposals(prev => prev.map(p => p.id === activeProposal.id ? { ...p, cards: newCards } : p));
    debouncedUpdateFirebase(activeProposal.id, newCards);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8f9fa', minHeight: '100vh', overflowY: 'auto' }}>
      
      {/* 탭 네비게이션 */}
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e0e0e0', px: { xs: 2, md: 8 }, pt: 2 }}>
        <Tabs 
          value={activeTabId} 
          onChange={(_, newValue) => setActiveTabId(newValue)}
          TabIndicatorProps={{ sx: { height: 3, borderRadius: '3px 3px 0 0', bgcolor: '#111' } }}
          sx={{ '& .MuiTab-root': { fontWeight: 600, fontSize: '1rem', color: '#888', '&.Mui-selected': { color: '#111' } } }}
        >
          {proposals.map(p => (
            <Tab key={p.id} value={p.id} label={p.title} />
          ))}
        </Tabs>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {activeProposal && (
          <>
            {/* 요약본 헤더 (Summary Header) */}
            <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 4, border: '1px solid #e0e0e0', bgcolor: '#fff' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#111', mb: 3, letterSpacing: '-0.02em' }}>
                💡 기획안 요약 보드
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activeProposal.cards.map(card => (
                  <Box key={`summary-${card.id}`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ 
                      px: 1.5, py: 0.5, bgcolor: '#f0f0f0', borderRadius: 2, 
                      minWidth: '130px', textAlign: 'center', fontWeight: 700, color: '#555', fontSize: '0.85rem' 
                    }}>
                      {card.title}
                    </Box>
                    <Typography variant="body1" sx={{ color: '#333', pt: 0.25, fontWeight: 500 }}>
                      {card.summarySentence || '아직 요약이 작성되지 않았습니다.'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            <Divider sx={{ my: 6, borderColor: '#eaeaea' }} />

            {/* 2x2 갤러리 그리드 */}
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#111', mb: 4, letterSpacing: '-0.02em' }}>
              🎨 세부 갤러리 
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
              {activeProposal.cards.map(card => (
                <Box key={card.id}>
                  <BrandingGalleryCard card={card} onClick={() => handleCardClick(card.id)} />
                </Box>
              ))}
            </Box>
          </>
        )}
      </Container>

      <BrandingDrawer 
        open={drawerOpen}
        card={selectedCard}
        onClose={() => setDrawerOpen(false)}
        onUpdateField={handleUpdateField}
        onUpdateSummary={handleUpdateSummary}
      />
    </Box>
  );
}
