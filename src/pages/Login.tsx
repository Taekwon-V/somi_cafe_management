import { Box, Button, Typography, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { user, isAllowed, login } = useAuth();

  if (user && isAllowed) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center', borderRadius: 3, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
          Somi Cafe
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>
          동업자 전용 관리 시스템입니다.
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<GoogleIcon />}
          onClick={login}
          fullWidth
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          Google 계정으로 로그인
        </Button>
        <Typography variant="caption" sx={{ display: 'block', mt: 3, color: 'text.secondary' }}>
          * 권한이 등록된 계정만 접속할 수 있습니다.
        </Typography>
      </Paper>
    </Box>
  );
}
