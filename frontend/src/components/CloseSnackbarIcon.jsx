import { useSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function CloseSnackbarIcon(snackbarId) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton color="inherit" onClick={() => closeSnackbar(snackbarId)}>
      <CloseIcon />
    </IconButton>
  );
}

export default CloseSnackbarIcon;
