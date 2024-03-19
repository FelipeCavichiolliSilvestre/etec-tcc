import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Container from '@mui/material/Container';
import {
  ProfessorsList,
  ProfessorPagination,
  ProfessorSearchBar,
} from '../components/ProfessorsList';

import ProtectedRoute from '../hoc/ProtectedRoute';
import ProfessorsProvider from '../contexts/ProfessorsContext';

function ProfessorsPage() {
  return (
    <Container maxWidth="md">
      <ProfessorsProvider limit={20}>
        <Grid container columnSpacing={4} mt={3} mb={2}>
          <Grid xs={6}>
            <ProfessorPagination />
          </Grid>

          <Grid xs={6} pr={4}>
            <ProfessorSearchBar />
          </Grid>
        </Grid>

        <ProfessorsList />

        <Grid container columnSpacing={4} mt={2} mb={3} justifyContent="center">
          <Grid xs={6}>
            <ProfessorPagination />
          </Grid>
        </Grid>
      </ProfessorsProvider>
    </Container>
  );
}

export default ProtectedRoute(ProfessorsPage);
