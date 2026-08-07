import { useState } from 'react';
import { 
  Box, 
  Typography, 
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
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import UndoIcon from '@mui/icons-material/Undo';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// 매물 데이터 (확장)
const locationCandidates = [
  { id: 2, title: '광교 카페거리', location: '경기 수원시 영통구', size: '32평', floor: '1층', deposit: '8000만', rent: '400만', premium: '3000만', salePrice: '12억', tags: ['#자연친화', '#브런치'], desc: '광교호수공원으로 이어지는 쾌적하고 자연 친화적인 상권', color: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', lat: 37.2913, lng: 127.0456, footTraffic: '약 12,000명', households: '반경 500m 내 4,500세대', competitors: '8개', mainDemographic: '30대 초중반 신혼부부 및 가족 단위', link: 'https://land.naver.com/' },
  { id: 3, title: '동탄2신도시 호수공원', location: '경기 화성시', size: '40평', floor: '2층', deposit: '7000만', rent: '350만', premium: '없음', salePrice: '매매 불가(임대 전용)', tags: ['#젊은부부', '#대형공간'], desc: '30~40대 젊은 부부 비율이 높은 신도시 핵심 상권', color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', lat: 37.1685, lng: 127.1082, footTraffic: '약 18,000명', households: '반경 500m 내 8,000세대', competitors: '15개', mainDemographic: '30~40대 유아동 동반 가족 단위', link: 'https://land.naver.com/' },
  { id: 4, title: '일산 밤리단길', location: '경기 고양시 일산동구', size: '30평', floor: '1층', deposit: '5000만', rent: '300만', premium: '4000만', salePrice: '9억', tags: ['#핫플레이스', '#감성카페'], desc: '저층 단독주택단지 사이사이에 형성된 일산 최고 핫플레이스', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)', lat: 37.6695, lng: 126.7820, footTraffic: '약 8,000명', households: '주택단지 밀집 구역 (세대수 유동적)', competitors: '20개 이상', mainDemographic: '20대 커플 및 30대 핫플 탐방객', link: 'https://land.naver.com/' },
  { id: 5, title: '보정동 카페거리', location: '경기 용인시 기흥구', size: '38평', floor: '1층', deposit: '1억', rent: '500만', premium: '8000만', salePrice: '16억', tags: ['#대학상권', '#이국적'], desc: '아파트 단지와 단국대 학생 수요를 동시에 확보한 상권', color: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)', lat: 37.3204, lng: 127.1098, footTraffic: '약 14,000명', households: '반경 500m 내 2,800세대', competitors: '18개', mainDemographic: '단국대 대학생 및 인근 아파트 40대 주민', link: 'https://land.naver.com/' },
  { id: 6, title: '위례 서일로 카페거리', location: '경기 하남시 위례동', size: '35평', floor: '1층', deposit: '6000만', rent: '380만', premium: '2000만', salePrice: '10억 5천만', tags: ['#가족단위', '#반려견'], desc: '위례신도시 창곡천을 따라 다가구 주택 1층에 늘어선 상권', color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', lat: 37.4725, lng: 127.1432, footTraffic: '약 10,000명', households: '반경 500m 내 5,200세대', competitors: '10개', mainDemographic: '반려견 동반 30대 산책족 및 주부', link: 'https://land.naver.com/' },
  { id: 7, title: '미사강변도시 망월천', location: '경기 하남시 망월동', size: '33평', floor: '1.5층', deposit: '5000만', rent: '350만', premium: '1000만', salePrice: '매매 불가(임대 전용)', tags: ['#수변조망', '#뷰맛집'], desc: '망월천 수변공원 조망이 가능한 상가주택 지역', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', lat: 37.5683, lng: 127.1895, footTraffic: '약 9,500명', households: '반경 500m 내 6,000세대', competitors: '14개', mainDemographic: '데이트하는 20대 커플 및 산책하는 지역 주민', link: 'https://land.naver.com/' },
  { id: 8, title: '별내 카페거리', location: '경기 남양주시 별내동', size: '40평', floor: '1층', deposit: '8000만', rent: '420만', premium: '6000만', salePrice: '13억', tags: ['#주차편리', '#넓은공간'], desc: '용암천을 따라 형성되어 서울 동북권 유입이 많은 특화 거리', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', lat: 37.6436, lng: 127.1166, footTraffic: '약 11,000명', households: '반경 500m 내 3,800세대', competitors: '9개', mainDemographic: '서울 북동부 거주 30~40대 및 주말 드라이브 객', link: 'https://land.naver.com/' },
  { id: 9, title: '운정신도시 동패동', location: '경기 파주시 동패동', size: '36평', floor: '1층', deposit: '4000만', rent: '250만', premium: '없음', salePrice: '8억', tags: ['#합리적임대료', '#신흥상권'], desc: '대규모 신도시의 높은 소비력을 흡수할 수 있는 상가주택 상권', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', lat: 37.7126, lng: 126.7423, footTraffic: '약 7,000명', households: '반경 500m 내 7,500세대', competitors: '5개', mainDemographic: '합리적 소비를 지향하는 신도시 30대 초기 입주자', link: 'https://land.naver.com/' },
  { id: 10, title: '장기동 라베니체 인근', location: '경기 김포시 장기동', size: '38평', floor: '1층', deposit: '4500만', rent: '280만', premium: '1000만', salePrice: '8억 5천만', tags: ['#키즈프렌들리', '#젊은부모'], desc: '유아동 동반 세대가 많아 넓은 유모차 동선 확보에 유리한 곳', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', lat: 37.6427, lng: 126.6664, footTraffic: '약 13,000명', households: '반경 500m 내 4,200세대', competitors: '11개', mainDemographic: '유모차를 동반한 유아동 및 초등학생 자녀를 둔 부모', link: 'https://land.naver.com/' },
  { id: 11, title: '영종국제도시 구읍뱃터', location: '인천 중구 중산동', size: '50평', floor: '1층', deposit: '1.2억', rent: '600만', premium: '1억', salePrice: '18억', tags: ['#오션뷰', '#관광객'], desc: '바다 조망이 가능하며 주말 관광객 수요가 폭발적인 오션뷰 상권', color: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)', lat: 37.4925, lng: 126.5683, footTraffic: '약 20,000명(주말)', households: '구읍뱃터 특화거리', competitors: '15개', mainDemographic: '20~30대 관광객 및 영종도 주민', link: 'https://land.naver.com/' },
  { id: 12, title: '청라국제도시 커낼웨이', location: '인천 서구 청라동', size: '35평', floor: '1층', deposit: '8000만', rent: '450만', premium: '5000만', salePrice: '14억', tags: ['#수변상권', '#가족단위'], desc: '수로를 따라 형성된 이국적인 분위기의 청라 핵심 수변 상권', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', lat: 37.5312, lng: 126.6341, footTraffic: '약 16,000명', households: '반경 500m 내 6,500세대', competitors: '25개', mainDemographic: '30~40대 청라 거주민 가족', link: 'https://land.naver.com/' },
  { id: 13, title: '송도 센트럴파크 상권', location: '인천 연수구 송도동', size: '45평', floor: '1층', deposit: '1.5억', rent: '700만', premium: '1.5억', salePrice: '25억', tags: ['#센팍뷰', '#프리미엄'], desc: '송도국제도시의 랜드마크 센트럴파크와 바로 연결되는 하이엔드 상권', color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', lat: 37.3925, lng: 126.6396, footTraffic: '약 25,000명', households: '반경 500m 내 8,000세대(고가 주택)', competitors: '30개 이상', mainDemographic: '송도 거주민 및 주말 외부 방문객', link: 'https://land.naver.com/' },
];

export default function Location() {
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [isMapView, setIsMapView] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.6s ease-out', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
            수도권 30~40평 주택단지 상가 추천 리스트 10곳을 비교해 보세요. (카드를 클릭하면 상세 분석이 나옵니다)
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={isMapView ? <ViewModuleIcon /> : <MapIcon />}
          onClick={() => setIsMapView(!isMapView)}
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
          {isMapView ? '리스트 뷰로 보기' : '지도 뷰로 보기'}
        </Button>
      </Box>

      {/* Main Content Area */}
      {isMapView ? (
        <Box sx={{ flexGrow: 1, borderRadius: 4, overflow: 'hidden', minHeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <MapContainer center={[37.5, 127.0]} zoom={10} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locationCandidates.map(item => (
              <Marker key={item.id} position={[item.lat, item.lng]}>
                <Popup>
                  <Box sx={{ p: 0.5, minWidth: 200 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>{item.location}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">면적/층수</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{item.size}/{item.floor}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">보증금/월세</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{item.deposit}/{item.rent}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">매매가</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#0284c7' }}>{item.salePrice}</Typography>
                    </Box>
                  </Box>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {locationCandidates.map((item) => (
            <Box 
              key={item.id} 
              sx={{ 
                perspective: '1500px', 
                minHeight: 490 
              }}
            >
              <Box 
                onClick={() => toggleFlip(item.id)}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                  transform: flippedCards[item.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  cursor: 'pointer',
                  '&:hover': {
                    '& .front-card': { boxShadow: '0 20px 40px rgba(0,0,0,0.12)' },
                    '& .back-card': { boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }
                  }
                }}
              >
                {/* --- 카드 앞면 (Front) --- */}
                <Card className="front-card" sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  border: 'none',
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.3s'
                }}>
                  <Box sx={{ height: 120, background: item.color, position: 'relative' }}>
                    <Avatar sx={{ position: 'absolute', bottom: -24, left: 24, width: 56, height: 56, bgcolor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: '#0f172a' }}>
                      <StorefrontIcon />
                    </Avatar>
                    
                    {/* 링크 아이콘 버튼 추가 */}
                    <Box sx={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 1 }}>
                      <Tooltip title="부동산 매물 링크 열기">
                        <IconButton 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            window.open(item.link, '_blank'); 
                          }}
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.3)', 
                            backdropFilter: 'blur(4px)', 
                            color: 'white', 
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' } 
                          }}
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <IconButton 
                        onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.3)', 
                          backdropFilter: 'blur(4px)', 
                          color: likes[item.id] ? '#ef4444' : 'white', 
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' } 
                        }}
                      >
                        {likes[item.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>
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
                        <Chip key={tag} label={tag} size="small" sx={{ bgcolor: 'rgba(56, 189, 248, 0.1)', color: '#0284c7', fontWeight: 600, borderRadius: 2 }} />
                      ))}
                    </Box>

                    <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.06)' }} />

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SquareFootIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>면적/층수</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>{item.size} / {item.floor}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AttachMoneyIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>보증금/월세</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>{item.deposit} / {item.rent}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, gridColumn: 'span 2', mt: 0.5 }}>
                        <StorefrontIcon sx={{ color: '#0ea5e9', fontSize: 18 }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: '#0ea5e9', display: 'block', lineHeight: 1 }}>매매가</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#0284c7' }}>{item.salePrice}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Tooltip title="클릭하여 상세 상권 분석 보기">
                        <Chip 
                          label="상세 분석 보기" 
                          size="small" 
                          icon={<UndoIcon fontSize="small" sx={{ transform: 'scaleX(-1)' }} />} 
                          sx={{ cursor: 'pointer', bgcolor: '#f1f5f9', fontWeight: 600, color: '#64748b' }} 
                        />
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>

                {/* --- 카드 뒷면 (Back) --- */}
                <Card className="back-card" sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  border: 'none',
                  bgcolor: '#0f172a',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  transition: 'box-shadow 0.3s'
                }}>
                  <Box sx={{ p: 3, pt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'white', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AutoGraphIcon sx={{ color: '#38bdf8' }} />
                      상세 상권 분석
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 4 }}>
                      {item.title} 주변의 심층 인구 통계 및 상권 데이터를 확인하세요.
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flexGrow: 1 }}>
                      {/* 유동 인구 */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', width: 40, height: 40 }}>
                          <PeopleAltIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 0.5 }}>일평균 유동인구</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>{item.footTraffic}</Typography>
                        </Box>
                      </Box>

                      {/* 배후 세대 */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa', width: 40, height: 40 }}>
                          <ApartmentIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 0.5 }}>주변 배후 세대</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>{item.households}</Typography>
                        </Box>
                      </Box>

                      {/* 경쟁 카페 수 */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', width: 40, height: 40 }}>
                          <LocalCafeIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 0.5 }}>반경 300m 내 카페</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>{item.competitors}</Typography>
                        </Box>
                      </Box>

                      {/* 주요 연령층 */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(52, 211, 153, 0.1)', color: '#34d399', width: 40, height: 40 }}>
                          <AutoGraphIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 0.5 }}>주요 상권 타겟</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.4 }}>{item.mainDemographic}</Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <Chip 
                        label="뒤로 돌아가기" 
                        size="small" 
                        icon={<UndoIcon fontSize="small" />} 
                        sx={{ cursor: 'pointer', bgcolor: 'rgba(255,255,255,0.1)', color: '#94a3b8', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }} 
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          /* Fix leaflet popup style */
          .leaflet-popup-content-wrapper {
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </Box>
  );
}
