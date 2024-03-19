import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    navbar: {
      background: '#fff',
    },
  },
  glass: {
    transparency: '99',
    blur: '10px',
  },
});
