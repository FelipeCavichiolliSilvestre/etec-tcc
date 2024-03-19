import IconButton from '@mui/material/IconButton';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAuth } from '../contexts/AuthContext';

function ItemButtons({ onDelete, onEdit, onView, disabled }) {
  const { isAdmin } = useAuth();

  const adminButtons = (
    <>
      <IconButton disabled={disabled} onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton disabled={disabled} onClick={onEdit}>
        <EditIcon />
      </IconButton>
    </>
  );

  return (
    <>
      {isAdmin && adminButtons}
      <IconButton disabled={disabled} onClick={onView}>
        <AccessTimeIcon />
      </IconButton>
    </>
  );
}

export default ItemButtons;
