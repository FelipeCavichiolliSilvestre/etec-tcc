import Stack from '@mui/material/Stack';
import FormTextField from '../Form/FormTextField';

function ProfessorUpsertFields() {
  return (
    <Stack spacing={2}>
      <FormTextField name="name" label="Nome" />
      <FormTextField name="email" label="Email" />
    </Stack>
  );
}

export default ProfessorUpsertFields;
