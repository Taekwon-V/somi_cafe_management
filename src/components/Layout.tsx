import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaletteIcon from '@mui/icons-material/Palette';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ChairIcon from '@mui/icons-material/Chair';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BgmPlayer from './BgmPlayer';

const drawerWidth = 260; // 사이드바 너비를 살짝 넓혀서 여유롭게

const menuItems = [
  { text: '대시보드', path: '/', icon: <DashboardIcon /> },
  { text: '브랜드 기획', path: '/branding', icon: <PaletteIcon /> },
  { text: '상권 & 부동산', path: '/location', icon: <StorefrontIcon /> },
  { text: '인테리어 & 시공', path: '/interior', icon: <ChairIcon /> },
  { text: '메뉴 & 레시피', path: '/menu', icon: <LocalCafeIcon /> },
  { text: '장비 & 집기', path: '/equipment', icon: <CoffeeMakerIcon /> },
  { text: '재무 & 행정', path: '/finance-admin', icon: <ReceiptLongIcon /> },
  { text: '멤버 권한 관리', path: '/admin', icon: <SettingsIcon /> },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ 
      bgcolor: '#0f172a', // 미드나잇 블루
      color: '#f8fafc', 
      height: '100%', 
      borderRight: 'none',
      borderRadius: { xs: 0, md: 4 }, // 둥근 모서리 적용
      boxShadow: { xs: 'none', md: '0 20px 60px rgba(0,0,0,0.1)' },
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <Toolbar sx={{ mb: 2, mt: 2, px: 3 }}>
        <LocalCafeIcon sx={{ mr: 1.5, color: '#38bdf8', fontSize: 28 }} />
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: '800', color: 'white', letterSpacing: '-0.5px' }}>
          Café Pulse
        </Typography>
      </Toolbar>
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 2,
                py: 1.2,
                color: location.pathname === item.path ? 'white' : '#94a3b8',
                '&.Mui-selected': {
                  bgcolor: '#1e293b', 
                  '&:hover': { bgcolor: '#334155' }
                },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#38bdf8' : '#64748b', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: location.pathname === item.path ? '600' : '500', fontSize: '0.95rem' }}>
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      {/* 하단 유저 정보 영역 */}
      <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="body2" noWrap sx={{ color: '#94a3b8', mb: 1 }}>
          {user?.email}
        </Typography>
        <Button 
          fullWidth 
          color="inherit" 
          onClick={logout} 
          startIcon={<LogoutIcon />}
          sx={{ justifyContent: 'flex-start', color: '#cbd5e1', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: 'white' } }}
        >
          로그아웃
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      backgroundImage: `url('/bg-minimal.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      p: { xs: 0, md: 4 } // 데스크탑에서 주변 여백 넉넉히
    }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        maxWidth: 1440,
        height: { xs: '100vh', md: 'calc(100vh - 64px)' },
        gap: { xs: 0, md: 3 }, // 🌟 사이드바와 메인 화면 사이를 띄우는 핵심 속성
        position: 'relative'
      }}>
        <CssBaseline />
        
        {/* 사이드바 영역 */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, position: 'relative' }}
          aria-label="mailbox folders"
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'transparent', border: 'none' },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              height: '100%',
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth, 
                borderRight: 'none', 
                bgcolor: 'transparent', // 내부 Box에서 배경색/그림자 처리하므로 투명
                position: 'relative', // absolute에서 relative로 변경하여 gap 속성이 먹히도록 함
                height: '100%' 
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* 메인 콘텐츠 영역 (Floating) */}
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            bgcolor: '#f8f9fa', 
            borderRadius: { xs: 0, md: 4 }, // 별도의 둥근 모서리
            boxShadow: { xs: 'none', md: '0 20px 60px rgba(0,0,0,0.08)' }, // 별도의 그림자
            border: { xs: 'none', md: '1px solid rgba(0,0,0,0.08)' }, // 메인 영역 테두리 추가
            height: '100%', 
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* 독립적인 상단 AppBar */}
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              bgcolor: 'transparent',
              color: '#1e293b',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              px: { xs: 0, md: 2 }
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                {menuItems.find(item => item.path === location.pathname)?.text || 'Somi Cafe Management'}
              </Typography>
            </Toolbar>
          </AppBar>

          {/* 실제 페이지 내용 */}
          <Box sx={{ p: { xs: 2, md: 3 }, flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
        
        <BgmPlayer />
      </Box>
    </Box>
  );
}
