import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';

function ExportListItem({ user, onSelect }) {
  const loading = user === null;

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
        <Checkbox checked={user.selected} />
      </ListItemAvatar>

      <ListItemText
        primary={user.name}
        primaryTypographyProps={{ fontSize: 17 }}
      />
    </ListItemButton>
  );
}

export default ExportListItem;
