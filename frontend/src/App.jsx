import { AppRouter } from './routes/Routes';
import { ThemeModeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import CustomSnackbar from './components/CustomSnackbar';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={'pt-BR'}>
      <ThemeModeProvider>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          Components={{
            default: CustomSnackbar,
            error: CustomSnackbar,
            info: CustomSnackbar,
            success: CustomSnackbar,
            warning: CustomSnackbar,
          }}
        >
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </SnackbarProvider>
      </ThemeModeProvider>
    </LocalizationProvider>
  );
}
export default App;
