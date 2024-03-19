import Checkbox from '@mui/material/Checkbox';
import { useController } from 'react-hook-form';

function FormCheckbox({ control, name, ...props }) {
  const { field } = useController({
    name,
    control,
  });

  return <Checkbox {...props} {...field} />;
}

export default FormCheckbox;
