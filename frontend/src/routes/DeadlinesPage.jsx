import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { DeadlinesList, DeadlinePagination } from '../components/DeadlinesList';
import ProtectedRoute from '../hoc/ProtectedRoute';
import DeadlinesProvider from '../contexts/DeadlinesContext';

function DeadlinesPage() {
  return (
    <Container maxWidth="md">
      <DeadlinesProvider limit={20}>
        <Grid container mt={3} mb={2} justifyContent="center">
          <Grid xs={6}>
            <DeadlinePagination />
          </Grid>
        </Grid>

        <DeadlinesList />

        <Grid container mt={2} mb={3} justifyContent="center">
          <Grid xs={6}>
            <DeadlinePagination />
          </Grid>
        </Grid>
      </DeadlinesProvider>
    </Container>
  );
}

export default ProtectedRoute(DeadlinesPage);
