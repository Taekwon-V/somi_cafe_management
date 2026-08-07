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

const drawerWidth = 240;

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
      bgcolor: 'white', 
      color: '#1e293b', 
      height: '100%', 
      borderRight: '1px solid rgba(0,0,0,0.05)' 
    }}>
      <Toolbar sx={{ mb: 2, mt: 1 }}>
        <LocalCafeIcon sx={{ mr: 1, color: '#0f172a' }} />
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: '#0f172a' }}>
          Café Pulse
        </Typography>
      </Toolbar>
      <List sx={{ px: 2 }}>
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
                color: location.pathname === item.path ? '#0f172a' : '#64748b',
                '&.Mui-selected': {
                  bgcolor: '#f1f5f9',
                  '&:hover': { bgcolor: '#e2e8f0' }
                },
                '&:hover': { bgcolor: '#f8f9fa' }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#0f172a' : '#94a3b8', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: location.pathname === item.path ? 'bold' : 'medium', fontSize: '0.95rem' }}>
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
      p: { xs: 0, md: 4 } // 데스크탑에서 주변 배경이 보이도록 패딩 추가
    }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        maxWidth: 1440,
        height: { xs: '100vh', md: 'calc(100vh - 64px)' },
        bgcolor: '#f8f9fa', // 앱 내부의 기본 배경색 (미니멀 바탕)
        borderRadius: { xs: 0, md: 4 },
        boxShadow: { xs: 'none', md: '0 20px 60px rgba(0,0,0,0.08)' },
        overflow: 'hidden',
        position: 'relative'
      }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          elevation={0}
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: 'transparent',
            color: '#1e293b',
            borderBottom: 'none',
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                {user?.email}
              </Typography>
              <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
                로그아웃
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
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
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'transparent' },
            }}
          >
            {drawer}
          </Drawer>
          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth, 
                borderRight: 'none', 
                bgcolor: 'transparent',
                position: 'absolute', // 컨테이너 내부에 귀속되도록 absolute 처리
                height: '100%' 
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, bgcolor: 'transparent', height: '100%', overflow: 'auto' }}
        >
          <Toolbar />
          <Outlet />
        </Box>
        <BgmPlayer />
      </Box>
    </Box>
  );
}
