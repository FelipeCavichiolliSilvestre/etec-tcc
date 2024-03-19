import { useDeadlines } from '../../contexts/DeadlinesContext';
import Pagination from '../Pagination';

function DeadlinePagination(props) {
  const { pagination } = useDeadlines();

  return <Pagination {...pagination.register()} {...props} />;
}

export default DeadlinePagination;
