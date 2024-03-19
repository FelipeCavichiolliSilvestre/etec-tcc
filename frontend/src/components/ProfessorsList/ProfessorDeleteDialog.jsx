import { useProfessors } from '../../contexts/ProfessorsContext';
import DeleteDialog from '../DeleteDialog';

function ProfessorDeleteDialog({ value: professor, ...props }) {
  const { deleteProfessor } = useProfessors();

  async function onConfirm() {
    deleteProfessor(professor.id);
    props.onClose();
  }

  if (!professor) return <></>;
  return (
    <DeleteDialog
      title={`Deletar professor ${professor.name}?`}
      desc="Esta ação é irreversível. Deseja continuar?"
      onConfirm={onConfirm}
      {...props}
    />
  );
}

export default ProfessorDeleteDialog;
