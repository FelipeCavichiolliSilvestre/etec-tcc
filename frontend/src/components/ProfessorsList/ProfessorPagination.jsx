import { useProfessors } from '../../contexts/ProfessorsContext';
import Pagination from '../Pagination';

function ProfessorPagination(props) {
  const { pagination, isSearching, professors } = useProfessors();

  return (
    <Pagination
      {...pagination.register()}
      disableRight={professors.length < pagination.limit}
      disable={isSearching}
      {...props}
    />
  );
}

export default ProfessorPagination;
