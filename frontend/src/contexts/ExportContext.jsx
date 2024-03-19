import api from '../api';
import useSWR from 'swr';
import { useState, createContext } from 'react';
import { useContext } from 'react';
import { useArray } from 'react-hanger';
import { useEffect } from 'react';

const ExportContext = createContext({});

function ExportProvider({ children, deadline }) {
  const { data, error } = useSWR(deadline.id, {
    fetcher: api.deadlines.getOne,
  });
  const users = useArray([]);
  const [query, setQuery] = useState('');

  const totalCount = users.value.length;
  const selectedCounter = users.value.reduce(
    (counter, user) => (user.selected ? counter + 1 : counter),
    0
  );
  const isPartiallySelected =
    selectedCounter > 0 && selectedCounter < totalCount;
  const isFullySelected = selectedCounter == totalCount;

  useEffect(() => {
    if (!data) return;

    users.setValue(data.users.map((user) => ({ ...user, selected: false })));
  }, [data]);

  function toggleAll() {
    users.setValue((users) =>
      users.map((user) => ({
        ...user,
        selected: isPartiallySelected ? true : !isFullySelected,
      }))
    );
  }

  function makeUserSelect({ id, selected }) {
    return () => {
      users.modifyById(id, {
        selected: !selected,
      });
    };
  }

  async function dowload() {
    const xml = await api.schedules.getXmlSchedule({
      startDate: deadline.fromDate,
      endDate: deadline.toDate,
      userIds: users.value
        .filter((u) => u.selected === true)
        .map((u) => u.id)
        .join(','),
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

  return (
    <ExportContext.Provider
      value={{
        users: users.value.filter((u) => u.name.toUpperCase().includes(query)),
        error,
        isLoading: !data && !error,
        selectedCounter,
        totalCount,
        isPartiallySelected,
        isFullySelected,
        search: setQuery,
        makeUserSelect,
        toggleAll,
        dowload,
      }}
    >
      {children}
    </ExportContext.Provider>
  );
}

function useExport() {
  return useContext(ExportContext);
}

export default ExportProvider;
export { useExport };
