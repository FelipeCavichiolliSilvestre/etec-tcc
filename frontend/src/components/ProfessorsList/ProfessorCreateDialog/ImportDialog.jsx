import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { useSelection } from '../../../contexts/ProfessorSelectionContext';
import ProfessorSelection from '../../ProfessorSelection';

function ImportDialog({ open, onClose, onCloseAll, ...props }) {
  const { getSelectedOptions, isLoading } = useSelection();


  function submit() {
    console.log(getSelectedOptions());
    onCloseAll();
  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose} {...props}>
      <DialogTitle>Importar professores</DialogTitle>

      <DialogContent>
        <ProfessorSelection />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <LoadingButton loading={isLoading} onClick={submit}>Importar</LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ImportDialog;
