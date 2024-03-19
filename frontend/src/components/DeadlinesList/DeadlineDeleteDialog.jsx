import { useDeadlines } from '../../contexts/DeadlinesContext';
import DeleteDialog from '../DeleteDialog';

function DeadlineDeleteDialog({ value: deadline, ...props }) {
  const { deleteDeadline } = useDeadlines();

  async function onConfirm() {
    deleteDeadline(deadline.id);
    props.onClose();
  }

  if (!deadline) return <></>;

  return (
    <DeleteDialog
      title={`Deletar prazo do dia ${deadline.fromDate.toLocaleDateString(
        'pt-BR'
      )} até ${deadline.toDate.toLocaleDateString('pt-BR')}`}
      desc="Esta ação é irreversível. Deseja continuar?"
      onConfirm={onConfirm}
      {...props}
    />
  );
}

export default DeadlineDeleteDialog;
