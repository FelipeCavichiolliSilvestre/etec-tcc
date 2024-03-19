import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import { useSelection } from '../../contexts/ProfessorSelectionContext';

function SelectionHeader() {
  const {
    isFullySelected,
    isPartiallySelected,
    selectedCounter,
    totalCount,
    toggleAll,
    isLoading,
  } = useSelection();

  if (isLoading) {
    return (
      <ListItem dense={false}>
        <ListItemAvatar>
          <Checkbox disabled />
        </ListItemAvatar>
        <ListItemSecondaryAction>
          <Typography>0 / 00</Typography>
        </ListItemSecondaryAction>
        <ListItemText
          primary="Selecionar todos"
          primaryTypographyProps={{ fontSize: 18 }}
        />
      </ListItem>
    );
  }

  return (
    <ListItem dense={false}>
      <ListItemAvatar>
        <Checkbox
          onClick={toggleAll}
          indeterminate={isPartiallySelected}
          checked={isFullySelected}
        />
      </ListItemAvatar>
      <ListItemSecondaryAction>
        <Typography>
          {selectedCounter} / {totalCount}
        </Typography>
      </ListItemSecondaryAction>
      <ListItemText
        primary="Selecionar todos"
        primaryTypographyProps={{ fontSize: 18 }}
      />
    </ListItem>
  );
}

export default SelectionHeader;
