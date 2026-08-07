import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Interior from './pages/Interior';
import Menu from './pages/Menu';
import Branding from './pages/Branding';

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="interior" element={<Interior />} />
            <Route path="menu" element={<Menu />} />
            <Route path="branding" element={<Branding />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
