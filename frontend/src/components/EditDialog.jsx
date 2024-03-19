import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';

function EditDialog({
  title,
  onClose,
  onConfirm,
  children,
  loading,
  ...props
}) {
  return (
    <Dialog maxWidth="sm" fullWidth onClose={onClose} {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <LoadingButton loading={loading} onClick={onConfirm}>
          Salvar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
