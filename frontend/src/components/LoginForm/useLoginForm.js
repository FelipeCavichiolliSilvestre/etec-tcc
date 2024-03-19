import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const loginFormSchema = yup
  .object({
    login: yup.string().required('Login is required'),
    password: yup.string().required(),
  })
  .required();

const useLoginForm = () => {
  return useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(loginFormSchema),
  });
};

export default useLoginForm;
