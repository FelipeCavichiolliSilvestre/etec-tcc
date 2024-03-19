import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { useController } from 'react-hook-form';

function FormRadioGroup({
  children,
  label,
  name,
  control,
  FormControlProps,
  RadioGroupProps,
}) {
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <FormControl error={Boolean(fieldState.error)} {...FormControlProps}>
      <FormLabel>{label ? label : ''}</FormLabel>

      <RadioGroup {...field} {...RadioGroupProps}>
        {children}
      </RadioGroup>

      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}

export default FormRadioGroup;
