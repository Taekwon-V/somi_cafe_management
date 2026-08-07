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
import ChairIcon from '@mui/icons-material/Chair';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

const menuItems = [
  { text: '대시보드', path: '/', icon: <DashboardIcon /> },
  { text: '인테리어/공간', path: '/interior', icon: <ChairIcon /> },
  { text: '메뉴/레시피', path: '/menu', icon: <LocalCafeIcon /> },
  { text: '브랜딩/마케팅', path: '/branding', icon: <CampaignIcon /> },
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
    <Box sx={{ bgcolor: '#1e293b', color: 'white', height: '100%' }}>
      <Toolbar sx={{ mb: 2, mt: 1 }}>
        <LocalCafeIcon sx={{ mr: 1, color: 'white' }} />
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
          Café Pulse
        </Typography>
      </Toolbar>
      <List sx={{ px: 1 }}>
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
                '&.Mui-selected': {
                  bgcolor: 'rgba(255,255,255,0.15)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' }
                },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'white' : 'rgba(255,255,255,0.7)', minWidth: 40 }}>
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
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
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#1e293b' },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none', bgcolor: '#1e293b' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, bgcolor: '#f5f5f5', minHeight: '100vh' }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
