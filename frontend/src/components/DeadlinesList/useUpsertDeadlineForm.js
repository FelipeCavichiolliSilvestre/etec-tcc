import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const upsertDeadlineSchema = yup
  .object({
    fromDate: yup.date().required(),
    toDate: yup.date().required().min(yup.ref('fromDate')),
  })
  .required();

const useUpsertDeadlineForm = (defaultValues) => {
  return useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(upsertDeadlineSchema),
  });
};

export default useUpsertDeadlineForm;
