import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormInput from '../Form/FormInput';
import SubmitButton from '../Form/SubmitButton';

import useLoginForm from './useLoginForm';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const { control, handleSubmit } = useLoginForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  async function onSubmit({ login: loginData, password }) {
    try {
      setIsLoading(true);

      await login({
        login: loginData,
        password,
      });

      navigate('/');
    } catch (error) {
      const status = error.response.status;
      let message = '';

      if (status === 403) message = 'Senha incorreta.';
      else if (status === 404) message = 'Usuário não encontrado.';
      else if (status === 500) message = 'Erro no servidor.';
      else throw error;

      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: '90vh' }}>
      <Typography
        fontWeight={700}
        letterSpacing={-1}
        color="primary"
        component="h1"
        variant="h4"
      >
        LOGIN
      </Typography>

      <Divider
        flexItem
        variant="middle"
        sx={{ marginBottom: 3, marginTop: 5 }}
      />

      <Stack
        sx={{ width: '100%' }}
        spacing={2.5}
        component="form"
        alignItems="center"
        justifyContent="center"
      >
        <FormInput
          name="login"
          control={control}
          autoComplete="current-password"
          label="Login"
          placeholder="Nome de usuário ou email"
          fullWidth
        />

        <FormInput
          name="password"
          type="password"
          control={control}
          autoComplete="current-password"
          label="Senha"
          fullWidth
        />

        <SubmitButton
          LoadingButtonProps={{
            onClick: handleSubmit(onSubmit),
            loading: isLoading,
          }}
        >
          Log In
        </SubmitButton>
      </Stack>
    </Stack>
  );
}

export default LoginForm;
