import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';

function SelectionItem({ professor, onSelect }) {
  const loading = professor === null;

  if (loading)
    return (
      <ListItemButton>
        <ListItemAvatar>
          <Checkbox disabled />
        </ListItemAvatar>

        <ListItemText
          primary={<Skeleton />}
          primaryTypographyProps={{ fontSize: 17 }}
        />
      </ListItemButton>
    );

  return (
    <ListItemButton onClick={onSelect}>
      <ListItemAvatar>
        <Checkbox checked={professor.selected} />
      </ListItemAvatar>

      <ListItemText
        primary={professor.name}
        primaryTypographyProps={{ fontSize: 17 }}
      />
    </ListItemButton>
  );
}

export default SelectionItem;
