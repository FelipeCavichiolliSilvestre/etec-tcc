import { useState, createContext, useContext } from 'react';
import usePagination from '../hooks/usePagination';
import useSWR from 'swr';
import { useSnackbar } from 'notistack';
import api from '../api';
import ApiError from '../api/ApiError';

const ProfessorsContext = createContext();

function ProfessorsProvider({ children, limit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const isSearching = searchTerm !== '';
  const pagination = usePagination({ defaultLimit: limit });

  const {
    data: usersData,
    error: usersError,
    mutate: mutateUsers,
  } = useSWR(
    () =>
      !isSearching
        ? { role: 'PROFESSOR', page: pagination.page, limit: pagination.limit }
        : null,
    {
      fetcher: api.users.getMany,
    }
  );

  const {
    data: searchData,
    error: searchError,
    mutate: mutateSearch,
  } = useSWR(() => (isSearching ? { term: searchTerm } : null), {
    fetcher: api.users.search,
  });

  const data = isSearching ? searchData : usersData;
  const error = isSearching ? searchError : usersError;
  const mutate = isSearching ? mutateSearch : mutateUsers;
  const isLoading = !data && !error;

  const { enqueueSnackbar } = useSnackbar();

  async function deleteProfessor(id) {
    function applyMutation(professors) {
      return professors.filter((professor) => professor.id !== id);
    }

    async function swrDelete(professors) {
      await api.users.delete(id);

      return applyMutation(professors);
    }

    mutate(swrDelete, {
      revalidate: false,
      rollbackOnError: true,
      optimisticData: applyMutation(data),
    }).catch(handleDeleteError);
  }

  function handleDeleteError(error) {
    if (!(error instanceof ApiError)) throw error;

    enqueueSnackbar({
      message: 'Não foi possível deletar professor.',
      helper: error.message,
    });
  }

  async function updateProfessor(id, { name, email, role }) {
    async function swrUpdate(professors) {
      await api.users.update(id, { name, email, role });

      return professors.map((professor) =>
        professor.id === id ? { id, name, email, role } : professor
      );
    }

    await mutate(swrUpdate, {
      revalidate: false,
    }).catch(handleUpdateError);
  }

  function handleUpdateError(error) {
    if (!(error instanceof ApiError)) throw error;

    enqueueSnackbar({
      message: 'Não foi possível atualizar professor.',
      helper: error.message,
    });
  }

  async function createProfessor({ name, email, role }) {
    async function swrCreate(professors) {
      const professor = await api.users.create({ name, email, role });

      return [professor, ...professors];
    }

    await mutate(swrCreate, {
      revalidate: false,
    }).catch(handleCreateError);
  }

  function handleCreateError(error) {
    if (!(error instanceof ApiError)) throw error;

    enqueueSnackbar({
      message: 'Não foi possível criar novo professor.',
      helper: error.message,
    });
  }

  return (
    <ProfessorsContext.Provider
      value={{
        professors: data,
        error,
        isLoading,
        pagination,
        isSearching,
        search: setSearchTerm,
        deleteProfessor,
        updateProfessor,
        createProfessor,
      }}
    >
      {children}
    </ProfessorsContext.Provider>
  );
}

function useProfessors() {
  return useContext(ProfessorsContext);
}

export default ProfessorsProvider;
export { useProfessors };
