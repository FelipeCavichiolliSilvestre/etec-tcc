import { forwardRef } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSnackbar } from 'notistack';

function CustomSnackbar({ id, message, helper, variant }, ref) {
  const { closeSnackbar } = useSnackbar();

  return (
    <Alert
      ref={ref}
      severity={variant}
      onClose={() => closeSnackbar(id)}
      variant="filled"
    >
      <AlertTitle sx={{ m: helper ?? 0 }} fontSize={16}>
        {message}
      </AlertTitle>
      {helper}
    </Alert>
  );
}

export default forwardRef(CustomSnackbar);
