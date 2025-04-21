import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul para botones
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#4791db', // Color de fondo global
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5f5f5f',
    },
    common:{
        white: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
