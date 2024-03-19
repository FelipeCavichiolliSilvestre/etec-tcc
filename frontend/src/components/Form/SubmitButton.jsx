import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

function SubmitButton({ LoadingButtonProps, children }) {
  return (
    <StyledLoadingButton
      type="submit"
      variant="contained"
      fullWidth
      {...LoadingButtonProps}
    >
      {children}
    </StyledLoadingButton>
  );
}

export default SubmitButton;
