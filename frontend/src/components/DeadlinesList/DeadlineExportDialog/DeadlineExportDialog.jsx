import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

import ExportList from './ExportList';
import ExportProvider from '../../../contexts/ExportContext';
import DowloadButton from './DowloadButton';
import ProfessorSelection from '../../ProfessorSelection';
import ProfessorSelectionContext from '../../../contexts/ProfessorSelectionContext';
import useSWR from 'swr';
import api from '../../../api';

function DeadlineExportDialog({ open, onClose, value: deadline }) {
  const { data, error } = useSWR(deadline?.id ?? null, {
    fetcher: api.deadlines.getOne,
  });

  if (!deadline) return <></>;
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <ProfessorSelectionContext professors={data?.users}>
        <DialogTitle>Exportar disponibilidades</DialogTitle>
        <DialogContent>
          <ProfessorSelection />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <DowloadButton onClose={onClose} deadline={deadline} />
        </DialogActions>
      </ProfessorSelectionContext>
    </Dialog>
  );
}

export default DeadlineExportDialog;
