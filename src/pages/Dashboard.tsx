import { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  Paper, Divider, Dialog, DialogTitle, DialogContent, 
  IconButton, CardMedia, Fade
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BrushIcon from '@mui/icons-material/Brush';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CampaignIcon from '@mui/icons-material/Campaign';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useAuth } from '../context/AuthContext';

// Dummy data for Recent Updates
const recentUpdates = [
  { id: 1, category: '브랜딩', text: 'A안 (The Venue: 재즈가 흐르는 프리미엄 카페) 기획안 픽스 완료', time: '방금 전', icon: <CampaignIcon sx={{ color: '#10b981' }} />, color: '#d1fae5' },
  { id: 2, category: '메뉴 및 레시피', text: '주류 배제 및 커피 페어링용 가벼운 핑거푸드/구움과자 기획', time: '2시간 전', icon: <RestaurantMenuIcon sx={{ color: '#f59e0b' }} />, color: '#fef3c7' },
  { id: 3, category: '인테리어', text: '바 8석, 2인석 4개, 4인석 2개 최적화 도면 및 가구 수량 파악', time: '1일 전', icon: <BrushIcon sx={{ color: '#ef4444' }} />, color: '#fee2e2' },
];

// Dummy data for Vision Board History
const visionHistory = [
  { id: 1, image: '/images/the_venue_vision.jpg', version: 'v2026.08.07', desc: '기획안 A: The Venue (프리미엄 재즈 살롱)' },
  { id: 2, image: '/images/modern_cozy_cafe.jpg', version: 'v2026.08.06', desc: '초기 모던 코지 컨셉 초안' }
];

export default function Dashboard() {
  const { user } = useAuth();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % visionHistory.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + visionHistory.length) % visionHistory.length);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
            환영합니다, {user?.email?.split('@')[0]}님! 👋
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', fontWeight: 500 }}>
            현재 창업 준비 현황과 새로운 소식을 확인해보세요.
          </Typography>
        </Box>
        
        <Grid container spacing={4} sx={{ mb: 5 }}>
          {/* 1. 비전 보드 (Vision Board) */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              bgcolor: 'white', 
              borderRadius: 4, 
              border: '1px solid rgba(0,0,0,0.05)', 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1e293b' }}>
                🖼️ 비전 보드 (Vision Board)
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                우리가 그려가는 카페의 대표 이미지입니다. 클릭해서 히스토리를 확인해보세요.
              </Typography>
              
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: 3, 
                  position: 'relative', 
                  cursor: 'pointer',
                  border: '8px solid #f1f5f9',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': { transform: 'scale(1.02)' },
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#f8fafc',
                  minHeight: 300
                }}
                onClick={() => setGalleryOpen(true)}
              >
                <CardMedia
                  component="img"
                  image={visionHistory[0].image}
                  alt="Vision Board"
                  sx={{ 
                    maxHeight: 400, 
                    objectFit: 'cover',
                    width: '100%'
                  }}
                />
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 12, 
                  right: 12, 
                  bgcolor: 'rgba(0,0,0,0.6)', 
                  color: 'white', 
                  px: 1.5, 
                  py: 0.5, 
                  borderRadius: 2,
                  backdropFilter: 'blur(4px)'
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{visionHistory[0].version}</Typography>
                </Box>
              </Card>
            </Paper>
          </Grid>

          {/* 2. 최근 업데이트 (Recent Updates) */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              bgcolor: 'white', 
              borderRadius: 4, 
              border: '1px solid rgba(0,0,0,0.05)', 
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1e293b' }}>
                ⚡ 최근 업데이트
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                다른 메뉴 카테고리의 변경 내역입니다.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                {recentUpdates.map((update) => (
                  <Card key={update.id} elevation={0} sx={{ 
                    border: '1px solid rgba(0,0,0,0.05)', 
                    borderRadius: 3,
                    bgcolor: '#f8fafc',
                    '&:hover': { bgcolor: 'white', borderColor: 'rgba(0,0,0,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
                    transition: 'all 0.2s'
                  }}>
                    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 }, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ bgcolor: update.color, p: 1.5, borderRadius: 2, display: 'flex' }}>
                        {update.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#0f172a', mb: 0.5 }}>
                          {update.category}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#334155', mb: 1, lineHeight: 1.5 }}>
                          {update.text}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                          {update.time}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

      </Box>

      {/* 갤러리 모달 */}
      <Dialog 
        open={galleryOpen} 
        onClose={() => setGalleryOpen(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 4,
            bgcolor: '#0f172a'
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>비전 보드 갤러리</Typography>
          <IconButton onClick={() => setGalleryOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, pb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          
          <Box sx={{ width: '100%', p: 3, display: 'flex', justifyContent: 'center', position: 'relative', minHeight: '50vh', alignItems: 'center' }}>
            {/* 좌측 버튼 */}
            <IconButton 
              onClick={handlePrevImage}
              sx={{ position: 'absolute', left: 16, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
            >
              <ChevronLeftIcon fontSize="large" />
            </IconButton>

            <Fade in={true} key={currentImageIndex}>
              <img 
                src={visionHistory[currentImageIndex].image} 
                alt="Gallery" 
                style={{ maxWidth: '80%', maxHeight: '60vh', objectFit: 'contain', borderRadius: '8px' }} 
              />
            </Fade>

            {/* 우측 버튼 */}
            <IconButton 
              onClick={handleNextImage}
              sx={{ position: 'absolute', right: 16, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
            >
              <ChevronRightIcon fontSize="large" />
            </IconButton>
          </Box>

          <Typography variant="body1" sx={{ color: '#cbd5e1', mt: 2, textAlign: 'center' }}>
            {visionHistory[currentImageIndex].version} - {visionHistory[currentImageIndex].desc}
          </Typography>
          
          <Divider sx={{ width: '80%', my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
          
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            {currentImageIndex + 1} / {visionHistory.length}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
