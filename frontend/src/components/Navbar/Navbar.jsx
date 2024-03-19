import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material';

import ConfigButton from './ConfigButton';
import NavbarLink from './NavbarLink';
import Logo from './Logo';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedComponent from '../../hoc/ProtectedComponent';

const CenteredGrid = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const HomePageLink = ProtectedComponent(() => (
  <NavbarLink href="/">Página Inicial</NavbarLink>
));

function Navbar() {
  const { isLoading } = useAuth();

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          backgroundColor: (theme) => theme.palette.navbar.background,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid container>
          <CenteredGrid item xs={3}>
            <Logo />
          </CenteredGrid>

          <CenteredGrid item xs={6}>
            <HomePageLink />
            <NavbarLink href="/professors">Professores</NavbarLink>
            <NavbarLink href="/deadlines">Prazos</NavbarLink>
          </CenteredGrid>

          <CenteredGrid item xs={3}>
            {isLoading ? <></> : <ConfigButton />}
          </CenteredGrid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
