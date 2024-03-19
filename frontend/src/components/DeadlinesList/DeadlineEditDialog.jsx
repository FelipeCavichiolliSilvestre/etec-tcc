import EditDialog from '../EditDialog.jsx';

import useUpsertDeadlineForm from './useUpsertDeadlineForm.js';
import { FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { useDeadlines } from '../../contexts/DeadlinesContext';
import { useBoolean } from 'react-hanger';
import DeadlineUpsertFields from './DeadlineUpsertFields.jsx';

function DeadlineEditDialog({ value: deadline, ...props }) {
  const { handleSubmit, reset, ...formMethods } = useUpsertDeadlineForm();
  const { updateDeadline } = useDeadlines();
  const loading = useBoolean(false);

  useEffect(() => {
    deadline && reset(deadline);
  }, [deadline]);

  async function submit({ fromDate, toDate }) {
    loading.setTrue();
    await updateDeadline(deadline.id, {
      fromDate,
      toDate,
    });
    props.onClose();
    loading.setFalse();
  }

  return (
    <EditDialog
      title="Editar prazo"
      loading={loading.value}
      onConfirm={handleSubmit(submit)}
      {...props}
    >
      <FormProvider {...formMethods}>
        <DeadlineUpsertFields watch={formMethods.watch} />
      </FormProvider>
    </EditDialog>
  );
}

export default DeadlineEditDialog;
