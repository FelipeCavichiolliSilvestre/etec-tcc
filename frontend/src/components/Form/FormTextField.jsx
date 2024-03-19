import TextField from '@mui/material/TextField';
import { useController } from 'react-hook-form';

function FormTextField({ control, name, ...props }) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <TextField
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message}
      {...props}
      {...field}
    />
  );
}

export default FormTextField;
