import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    navbar: {
      background: '#1e1e1e',
    },
  },
  glass: {
    transparency: 'bb',
    blur: '20px',
  },
});
