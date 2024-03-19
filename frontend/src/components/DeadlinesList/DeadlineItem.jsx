import Skeleton from '@mui/material/Skeleton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import ItemAction from '../ItemAction';

function DeadlineItem({
  id,
  fromDate,
  toDate,
  onDelete,
  onEdit,
  onView,
  loading,
}) {
  const now = new Date();
  const active = now >= fromDate && now <= toDate;

  const actionButtons = (
    <ItemAction
      onView={() => onView({ id, fromDate, toDate })}
      onDelete={() => onDelete({ id, fromDate, toDate })}
      onEdit={() => onEdit({ id, fromDate, toDate })}
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
        primary={`${fromDate.toLocaleDateString(
          'pt-BR'
        )} até ${toDate.toLocaleDateString('pt-BR')}`}
        primaryTypographyProps={{
          fontSize: 20,
          color: 'text.primary',
        }}
        secondary={active ? 'Ativo' : 'Vencido'}
        secondaryTypographyProps={{
          fontSize: 15,
          color: (theme) =>
            active ? theme.palette.success.main : theme.palette.error.main,
          variant: 'body2',
        }}
      />
    </ListItem>
  );
}

export default DeadlineItem;
