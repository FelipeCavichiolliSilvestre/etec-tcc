import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
}));

function AuthButtons() {
  return (
    <Box>
      <StyledButton href="/login" variant="outlined">
        LOGIN
      </StyledButton>
    </Box>
  );
}

export default AuthButtons;
