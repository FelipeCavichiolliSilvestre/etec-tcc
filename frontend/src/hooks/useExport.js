import api from '../api';
import useSWR from 'swr';
import { useArray } from 'react-hanger';
import { useEffect, useState } from 'react';

function useExport(deadlineId) {
  const { data, error } = useSWR(deadlineId, api.deadlines.getOne, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  const [query, setQuery] = useState('');
  const users = useArray([]);

  useEffect(() => {
    if (!data) return;

    users.setValue(
      data.users.map((user) => ({
        ...user,
        selected: false,
      }))
    );
  }, [data]);

  const selectedCounter = users.value.reduce(
    (counter, user) => (user.selected ? counter + 1 : counter),
    0
  );

  const isPartiallySelected =
    selectedCounter > 0 && selectedCounter < users.value.length;
  const isFullySelected = selectedCounter == users.value.length;

  return {
    data,
    users,
    error,
    isLoading: !data && !error,
    selectedCounter,
    isPartiallySelected,
    isFullySelected,
    query,
    search: setQuery,
  };
}

export default useExport;
