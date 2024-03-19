import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBoolean } from 'react-hanger';
import { useDeadlines } from '../../contexts/DeadlinesContext';
import useUpsertDeadlineForm from './useUpsertDeadlineForm';
import { FormProvider } from 'react-hook-form';
import { useMemo } from 'react';
import DeadlineUpsertFields from './DeadlineUpsertFields';

function DeadlineCreateDialog({ open, onClose }) {
  const defaultValue = useMemo(
    () => ({
      fromDate: new Date(),
      toDate: new Date(),
    }),
    []
  );

  const { createDeadline } = useDeadlines();
  const { reset, handleSubmit, ...formMethods } =
    useUpsertDeadlineForm(defaultValue);

  const loading = useBoolean();

  async function submit({ fromDate, toDate }) {
    loading.setTrue();
    await createDeadline({ fromDate, toDate });
    loading.setFalse();
    onClose();
    reset(defaultValue);
  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Adicionar prazo</DialogTitle>
      <DialogContent dividers>
        <FormProvider {...formMethods}>
          <DeadlineUpsertFields watch={formMethods.watch} />
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

export default DeadlineCreateDialog;
