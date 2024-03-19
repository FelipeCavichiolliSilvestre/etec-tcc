import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SearchBar from '../SearchBar';

import { useSelection } from '../../contexts/ProfessorSelectionContext';
import SelectionItem from './SelectionItem';
import SelectionHeader from './SelectionHeader';

function ProfessorSelection() {
  const { professors, search, isLoading, makeProfessorSelect } = useSelection();

  return (
    <List sx={{ minHeight: '100vh' }} scroll="body" dense>
      <ListItem>
        <ListItemText>
          <SearchBar
            disabled={isLoading}
            delay={100}
            onChange={(v) => search(v.toUpperCase())}
          />
        </ListItemText>
      </ListItem>

      <SelectionHeader />
      <Divider />

      {(isLoading ? Array(20).fill(null) : professors).map((professor) => {
        return (
          <>
            <SelectionItem
              professor={professor}
              onSelect={professor && makeProfessorSelect(professor)}
            />
            <Divider />
          </>
        );
      })}
    </List>
  );
}

export default ProfessorSelection;
