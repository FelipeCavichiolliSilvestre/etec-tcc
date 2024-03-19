import { useSelection } from '../../../contexts/ProfessorSelectionContext';
import LoadingButton from '@mui/lab/LoadingButton';
import { useBoolean } from 'react-hanger';
import api from '../../../api';

function DowloadButton({ onClose, deadline, ...props }) {
  const { getSelectedOptions, isLoading } = useSelection();
  const loading = useBoolean(false);

  async function dowload() {
    const xml = await api.schedules.getXmlSchedule({
      startDate: deadline.fromDate,
      endDate: deadline.toDate,
      userIds: getSelectedOptions().map((u) => u.id),
    });

    let element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(xml)
    );
    element.setAttribute('download', 'schedules.xml');

    element.style.display = 'none';
    element.click();
  }

  async function onClick() {
    try {
      loading.setTrue();
      await dowload();
      onClose();
    } finally {
      loading.setFalse();
    }
  }

  return (
    <LoadingButton
      loading={loading.value || isLoading}
      onClick={onClick}
      {...props}
    >
      Exportar
    </LoadingButton>
  );
}

export default DowloadButton;
