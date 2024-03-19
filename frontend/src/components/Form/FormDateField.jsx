import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function FormDateField({ control, name, ...props }) {
  const { field } = useController({
    name,
    control,
  });

  return (
    <DesktopDatePicker
      {...props}
      {...field}
      inputFormat="DD/MM/YYYY"
      renderInput={(params) => <TextField {...params} />}
    />
  );
}

export default FormDateField;
