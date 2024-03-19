import TextField from '@mui/material/TextField';

import { useController } from 'react-hook-form';

function FormInput(props) {
  const { name, control, ...TextFieldProps } = props;

  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <TextField
      error={Boolean(fieldState.invalid)}
      helperText={fieldState.error?.message}
      {...field}
      {...TextFieldProps}
    />
  );
}

export default FormInput;
