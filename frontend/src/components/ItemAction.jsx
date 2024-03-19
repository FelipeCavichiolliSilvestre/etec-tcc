import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useRef } from 'react';
import { useBoolean } from 'react-hanger';

function ItemAction({ disabled, onEdit, onDelete, onView, ...props }) {
  const menuOpen = useBoolean();
  const menuAnchor = useRef();

  function handleActions(fn) {
    return async (...args) => {
      fn(...args);
      props.onClose();
    };
  }

  return (
    <>
      <IconButton
        disabled={disabled}
        ref={menuAnchor}
        onClick={menuOpen.toggle}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        open={menuOpen.value}
        onClose={menuOpen.setFalse}
        anchorEl={menuAnchor.current}
      >
        <MenuItem onClick={handleActions(onView)}>
          <ListItemIcon>
            <AccessTimeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Visualizar</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleActions(onEdit)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleActions(onDelete)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Remover</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ItemAction;
