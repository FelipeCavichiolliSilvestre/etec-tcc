import EditDialog from '../EditDialog.jsx';

import { FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { useBoolean } from 'react-hanger';
import useUpsertProfessorForm from './useEditProfessorForm.js';
import { useProfessors } from '../../contexts/ProfessorsContext.jsx';
import ProfessorUpsertFields from './ProfessorUpsertFields.jsx';

function ProfessorEditDialog({ value: professor, ...props }) {
  const { handleSubmit, reset, ...formMethods } = useUpsertProfessorForm();
  const { updateProfessor } = useProfessors();
  const loading = useBoolean(false);

  useEffect(() => {
    professor && reset(professor);
  }, [professor]);

  async function submit({ name, email, role }) {
    loading.setTrue();
    await updateProfessor(professor.id, { name, email, role });
    props.onClose();
    loading.setFalse();
  }

  return (
    <EditDialog
      title="Editar professor"
      loading={loading.value}
      onConfirm={handleSubmit(submit)}
      {...props}
    >
      <FormProvider {...formMethods}>
        <ProfessorUpsertFields />
      </FormProvider>
    </EditDialog>
  );
}

export default ProfessorEditDialog;
