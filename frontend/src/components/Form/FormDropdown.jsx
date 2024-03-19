import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useController } from 'react-hook-form';

function FormDropdown({ name, control, label, options, ...props }) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  console.log(field);

  return (
    <Autocomplete
      {...field}
      options={options}
      renderInput={(params) => (
        <TextField
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          {...params}
          {...props}
        />
      )}
    />
  );
}

export default FormDropdown;
