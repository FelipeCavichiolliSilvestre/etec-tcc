import { createContext, useContext } from 'react';
import usePagination from '../hooks/usePagination';
import useSWR from 'swr';
import { useSnackbar } from 'notistack';
import api from '../api';
import ApiError from '../api/ApiError';

const DeadlinesContext = createContext();

function DeadlinesProvider({ children, limit }) {
  const pagination = usePagination({ defaultLimit: limit ?? 20 });

  const { data, error, mutate } = useSWR(
    { page: pagination.page, limit: pagination.limit },
    {
      fetcher: api.deadlines.getMany,
    }
  );
  const { enqueueSnackbar } = useSnackbar();

  async function deleteDeadline(id) {
    function applyMutation(deadlines) {
      return deadlines.filter((deadline) => deadline.id !== id);
    }

    await mutate(
      async (deadlines) => {
        await api.deadlines.delete(id);

        return applyMutation(deadlines);
      },
      {
        revalidate: false,
        rollbackOnError: true,
        optimisticData: applyMutation(data),
      }
    ).catch((error) => {
      if (!(error instanceof ApiError)) throw error;

      enqueueSnackbar({
        message: 'Não foi possível deletar o prazo.',
        helper: error.message,
        variant: 'error',
      });
    });
  }

  async function updateDeadline(id, { fromDate, toDate }) {
    async function update(deadlines) {
      await api.deadlines.update(id, { fromDate, toDate });

      return deadlines.map((current) => {
        if (id !== current.id) return current;

        return {
          id,
          fromDate,
          toDate,
        };
      });
    }

    await mutate(update, {
      revalidate: false,
    }).catch((error) => {
      if (!(error instanceof ApiError)) throw error;

      enqueueSnackbar({
        message: 'Não foi possível alterar o prazo.',
        helper: error.message,
        variant: 'error',
      });
    });
  }

  async function createDeadline({ fromDate, toDate }) {
    async function create(deadlines) {
      const deadline = await api.deadlines.create({ fromDate, toDate });

      return [deadline, ...deadlines];
    }

    await mutate(create, {
      revalidate: false,
    }).catch((error) => {
      if (!(error instanceof ApiError)) throw error;

      enqueueSnackbar({
        message: 'Não foi possível criar novo prazo.',
        helper: error.message,
        variant: 'error',
      });
    });
  }

  return (
    <DeadlinesContext.Provider
      value={{
        deadlines: data,
        isLoading: !error && !data,
        error,
        deleteDeadline,
        updateDeadline,
        createDeadline,
        pagination,
      }}
    >
      {children}
    </DeadlinesContext.Provider>
  );
}

function useDeadlines() {
  return useContext(DeadlinesContext);
}

export default DeadlinesProvider;
export { useDeadlines };
