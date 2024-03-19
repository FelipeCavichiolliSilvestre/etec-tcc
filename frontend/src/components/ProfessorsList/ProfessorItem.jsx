import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import ItemAction from '../ItemAction';

function ProfessorListItem({
  id,
  name,
  email,
  onDelete,
  onEdit,
  onView,
  loading,
}) {
  const actionButtons = (
    <ItemAction
      onView={() => onView({ id, name, email })}
      onDelete={() => onDelete({ id, name, email })}
      onEdit={() => onEdit({ id, name, email })}
      disabled={loading}
    />
  );

  if (loading) {
    return (
      <ListItem secondaryAction={actionButtons}>
        <ListItemText
          primary={<Skeleton />}
          primaryTypographyProps={{
            fontSize: 20,
            maxWidth: '70%',
          }}
          secondary={<Skeleton />}
          secondaryTypographyProps={{
            fontSize: 15,
            maxWidth: '60%',
          }}
        />
      </ListItem>
    );
  }

  return (
    <ListItem secondaryAction={actionButtons}>
      <ListItemText
        primary={name}
        primaryTypographyProps={{
          fontSize: 20,
          color: 'text.primary',
        }}
        secondary={email}
        secondaryTypographyProps={{
          fontSize: 15,
          color: 'text.secondary',
          variant: 'body2',
        }}
      />
    </ListItem>
  );
}

export default ProfessorListItem;
