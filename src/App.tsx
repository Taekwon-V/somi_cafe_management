import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Interior from './pages/Interior';
import Menu from './pages/Menu';
import Branding from './pages/Branding';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isAllowed } = useAuth();
  if (!user || !isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#795548', // Brown (Cafe vibe)
    },
    secondary: {
      main: '#ffb74d', // Orange
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="interior" element={<Interior />} />
              <Route path="menu" element={<Menu />} />
              <Route path="branding" element={<Branding />} />
              <Route path="admin" element={<Admin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
