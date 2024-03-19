import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const upsertProfessorSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

const useUpsertProfessorForm = (defaultValues) => {
  return useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(upsertProfessorSchema),
  });
};

export default useUpsertProfessorForm;
