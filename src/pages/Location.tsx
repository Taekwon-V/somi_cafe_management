import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  IconButton, 
  Divider,
  Button,
  Avatar,
  Tooltip
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CommentIcon from '@mui/icons-material/Comment';

// 매물 데이터
const locationCandidates = [
  { id: 1, title: '판교 백현동 카페거리', location: '경기 성남시 분당구', size: '35평', deposit: '1억', rent: '450만', premium: '5000만', tags: ['#고급배후세대', '#넓은테라스'], desc: '판교 신도시의 구매력 높은 배후 세대를 둔 검증된 상권', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: '광교 카페거리', location: '경기 수원시 영통구', size: '32평', deposit: '8000만', rent: '400만', premium: '3000만', tags: ['#자연친화', '#브런치'], desc: '광교호수공원으로 이어지는 쾌적하고 자연 친화적인 상권', color: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
  { id: 3, title: '동탄2신도시 호수공원', location: '경기 화성시', size: '40평', deposit: '7000만', rent: '350만', premium: '없음', tags: ['#젊은부부', '#대형공간'], desc: '30~40대 젊은 부부 비율이 높은 신도시 핵심 상권', color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 4, title: '일산 밤리단길', location: '경기 고양시 일산동구', size: '30평', deposit: '5000만', rent: '300만', premium: '4000만', tags: ['#핫플레이스', '#감성카페'], desc: '저층 단독주택단지 사이사이에 형성된 일산 최고 핫플레이스', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' },
  { id: 5, title: '보정동 카페거리', location: '경기 용인시 기흥구', size: '38평', deposit: '1억', rent: '500만', premium: '8000만', tags: ['#대학상권', '#이국적'], desc: '아파트 단지와 단국대 학생 수요를 동시에 확보한 상권', color: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)' },
  { id: 6, title: '위례 서일로 카페거리', location: '경기 하남시 위례동', size: '35평', deposit: '6000만', rent: '380만', premium: '2000만', tags: ['#가족단위', '#반려견'], desc: '위례신도시 창곡천을 따라 다가구 주택 1층에 늘어선 상권', color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
  { id: 7, title: '미사강변도시 망월천', location: '경기 하남시 망월동', size: '33평', deposit: '5000만', rent: '350만', premium: '1000만', tags: ['#수변조망', '#뷰맛집'], desc: '망월천 수변공원 조망이 가능한 상가주택 지역', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 8, title: '별내 카페거리', location: '경기 남양주시 별내동', size: '40평', deposit: '8000만', rent: '420만', premium: '6000만', tags: ['#주차편리', '#넓은공간'], desc: '용암천을 따라 형성되어 서울 동북권 유입이 많은 특화 거리', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 9, title: '운정신도시 동패동', location: '경기 파주시 동패동', size: '36평', deposit: '4000만', rent: '250만', premium: '없음', tags: ['#합리적임대료', '#신흥상권'], desc: '대규모 신도시의 높은 소비력을 흡수할 수 있는 상가주택 상권', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 10, title: '장기동 라베니체 인근', location: '경기 김포시 장기동', size: '38평', deposit: '4500만', rent: '280만', premium: '1000만', tags: ['#키즈프렌들리', '#젊은부모'], desc: '유아동 동반 세대가 많아 넓은 유모차 동선 확보에 유리한 곳', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
];

export default function Location() {
  const [likes, setLikes] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.6s ease-out' }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        mb: 4,
        background: 'linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.4))',
        p: 3,
        borderRadius: 4,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1, letterSpacing: '-1px' }}>
            상권 및 부동산 분석 📍
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            수도권 30~40평 주택단지 상가 추천 리스트 10곳을 비교해 보세요.
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<MapIcon />}
          sx={{ 
            bgcolor: '#0f172a', 
            borderRadius: 3, 
            px: 3, 
            py: 1,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.4)',
            '&:hover': { bgcolor: '#1e293b' }
          }}
        >
          지도 뷰로 보기
        </Button>
      </Box>

      {/* Grid List */}
      <Grid container spacing={3}>
        {locationCandidates.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 4,
              border: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                '& .header-overlay': {
                  opacity: 0.1
                }
              }
            }}>
              {/* Card Header Background */}
              <Box sx={{ 
                height: 120, 
                background: item.color,
                position: 'relative'
              }}>
                <Box className="header-overlay" sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'black',
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }} />
                <Avatar sx={{ 
                  position: 'absolute', 
                  bottom: -24, 
                  left: 24, 
                  width: 56, 
                  height: 56, 
                  bgcolor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  color: '#0f172a'
                }}>
                  <StorefrontIcon />
                </Avatar>
                <IconButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12, 
                    bgcolor: 'rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(4px)',
                    color: likes[item.id] ? '#ef4444' : 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' }
                  }}
                >
                  {likes[item.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>

              <CardContent sx={{ pt: 5, pb: 3, px: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 0.5 }}>
                  {item.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#64748b', mb: 2 }}>
                  <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2">{item.location}</Typography>
                </Box>

                <Typography variant="body2" sx={{ color: '#475569', mb: 3, lineHeight: 1.6, flexGrow: 1 }}>
                  "{item.desc}"
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                  {item.tags.map(tag => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(56, 189, 248, 0.1)', 
                        color: '#0284c7', 
                        fontWeight: 600,
                        borderRadius: 2
                      }} 
                    />
                  ))}
                </Box>

                <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.06)' }} />

                {/* Specs */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SquareFootIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>면적</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>{item.size}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoneyIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>보증금/월세</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>{item.deposit} / {item.rent}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Tooltip title="댓글 0개">
                    <IconButton size="small" sx={{ color: '#94a3b8' }}>
                      <CommentIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Box>
  );
}
