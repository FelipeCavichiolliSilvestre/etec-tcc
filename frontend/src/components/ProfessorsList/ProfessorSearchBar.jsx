import { useProfessors } from '../../contexts/ProfessorsContext';
import SearchBar from '../SearchBar';

function ProfessorSearchBar() {
  const { search } = useProfessors();

  return <SearchBar onChange={search} delay={500} />;
}

export default ProfessorSearchBar;
