import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBoolean } from 'react-hanger';
import { useProfessors } from '../../../contexts/ProfessorsContext';
import { FormProvider } from 'react-hook-form';
import useUpsertProfessorForm from '../useEditProfessorForm';
import ProfessorUpsertFields from '../ProfessorUpsertFields';
import { Typography } from '@mui/material';
import ImportButton from './ImportButton';

function ProfessorCreateDialog({ open, onClose }) {
  const loading = useBoolean();

  const { createProfessor } = useProfessors();
  const { handleSubmit, reset, ...formMethods } = useUpsertProfessorForm();

  async function submit({ name, email }) {
    loading.setTrue();
    await createProfessor({ name, email });
    loading.setFalse();
    onClose();
    reset({ name: '', email: '' });
  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        Adicionar professor
        <ImportButton onClose={onClose} />
      </DialogTitle>
      <DialogContent dividers>
        <FormProvider {...formMethods}>
          <ProfessorUpsertFields />

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography fontSize={16}>
              Senhas são enviadas via e-mail
            </Typography>
          </Alert>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <LoadingButton loading={loading.value} onClick={handleSubmit(submit)}>
          Adicionar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ProfessorCreateDialog;
