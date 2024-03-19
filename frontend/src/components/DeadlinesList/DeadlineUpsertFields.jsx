import FormDateField from '../Form/FormDateField';
import Stack from '@mui/material/Stack';

function DeadlineUpsertFields({ watch }) {
  return (
    <Stack spacing={2}>
      <FormDateField
        maxDate={watch('toDate')}
        name="fromDate"
        label="Data de início"
      />
      <FormDateField
        minDate={watch('fromDate')}
        name="toDate"
        label="Data de término"
      />
    </Stack>
  );
}

export default DeadlineUpsertFields;
