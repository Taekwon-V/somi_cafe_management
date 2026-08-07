import { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress, Tabs, Tab, Paper, Avatar } from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import type { BrandingProposal } from '../types/branding';
import BrandingGalleryCard from '../components/BrandingGalleryCard';

export default function Branding() {
  const [proposals, setProposals] = useState<BrandingProposal[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | false>(false);
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8f9fa' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f8f9fa', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* 탭 네비게이션 */}
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #e0e0e0', px: { xs: 2, md: 8 }, pt: 2 }}>
        <Tabs 
          value={activeTabId} 
          onChange={(_, newValue) => setActiveTabId(newValue)}
          sx={{ 
            '& .MuiTabs-indicator': { height: 3, bgcolor: '#111' },
            '& .MuiTab-root': { 
              fontWeight: 600, fontSize: '1rem', color: '#888', 
              minWidth: '120px',
              '&.Mui-selected': { color: '#111', bgcolor: '#f0f0f0' } 
            } 
          }}
        >
          {proposals.map(p => (
            <Tab key={p.id} value={p.id} label={p.title} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 5 }}>
        <Container maxWidth="lg" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {activeProposal && (
            <>
              {/* 컨셉 타이틀 헤더 */}
              {activeProposal.conceptTitle && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3, px: 1 }}>
                  {activeProposal.logoUrl && (
                    <Avatar 
                      src={activeProposal.logoUrl} 
                      alt="Brand Logo" 
                      sx={{ width: 56, height: 56, border: '1px solid #eaeaea', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                    />
                  )}
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#111', letterSpacing: '-0.02em' }}>
                      {activeProposal.conceptTitle}
                    </Typography>
                    {activeProposal.conceptSubtitle && (
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#333' }}>
                        {activeProposal.conceptSubtitle}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}

              {/* 요약본 헤더 (Summary Header) */}
              <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid #e0e0e0', bgcolor: '#fff' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {activeProposal.cards.map(card => (
                  <Box key={`summary-${card.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ 
                      px: 1, py: 0.25, bgcolor: '#f0f0f0', borderRadius: 1.5, 
                      minWidth: '110px', textAlign: 'center', fontWeight: 700, color: '#555', fontSize: '0.75rem' 
                    }}>
                      {card.title.split(' ')[0]} {/* 핵심 정체성, 타겟 고객 등으로 짧게 표시 */}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#333', fontWeight: 500 }}>
                      {card.summarySentence || '아직 요약이 작성되지 않았습니다.'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

              {/* 2x2 갤러리 그리드 */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
                {activeProposal.cards.map(card => (
                  <Box key={card.id}>
                    <BrandingGalleryCard card={card} />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}
