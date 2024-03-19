import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Divider from '@mui/material/Divider';
import ProfessorItem from './ProfessorItem';

import { useProfessors } from '../../contexts/ProfessorsContext';
import useModalSelect from '../../hooks/useModalSelect';
import ProfessorEditDialog from './ProfessorEditDialog';
import ProfessorDeleteDialog from './ProfessorDeleteDialog';
import DividerAddFab from '../DividerAddFab';
import { useBoolean } from 'react-hanger';
import ProfessorCreateDialog from './ProfessorCreateDialog/ProfessorCreateDialog';

function ProfessorList() {
  const {
    isLoading,
    professors,
    pagination: { limit },
  } = useProfessors();

  const deleteSelect = useModalSelect();
  const editSelect = useModalSelect();
  const viewSelect = useModalSelect();
  const addModalOpen = useBoolean(false);

  if (isLoading) {
    return (
      <Grid container>
        <Grid xs={12}>
          <DividerAddFab onClick={addModalOpen.setTrue} />
        </Grid>

        {Array(limit)
          .fill()
          .map((_, i) => (
            <Grid xs={6} key={i}>
              <ProfessorItem loading />

              <Divider variant="middle" />
            </Grid>
          ))}
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid xs={12}>
        <DividerAddFab onClick={addModalOpen.setTrue} />
      </Grid>

      {professors.map(({ id, name, email }) => {
        return (
          <Grid xs={6} key={id}>
            <ProfessorItem
              id={id}
              name={name}
              email={email}
              onDelete={deleteSelect.select}
              onEdit={editSelect.select}
              onView={viewSelect.select}
            />

            <Divider variant="middle" />
          </Grid>
        );
      })}

      <ProfessorCreateDialog
        open={addModalOpen.value}
        onClose={addModalOpen.setFalse}
      />
      <ProfessorDeleteDialog {...deleteSelect.registerModal()} />
      <ProfessorEditDialog {...editSelect.registerModal()} />
    </Grid>
  );
}

export default ProfessorList;
