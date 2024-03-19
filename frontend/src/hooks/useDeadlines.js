import useSWR from 'swr';
import { useSnackbar } from 'notistack';
import api from '../api';
import ApiError from '../api/ApiError';

function useDeadlines({ page, limit }) {
  const { data, error, mutate } = useSWR(
    { page, limit },
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
    function applyMutation(deadlines) {
      return deadlines.map((current) => {
        if (id !== current.id) return current;

        return {
          id,
          fromDate,
          toDate,
        };
      });
    }

    await mutate(
      async (deadlines) => {
        await api.deadlines.update(id, { fromDate, toDate });

        return applyMutation(deadlines);
      },
      {
        optimisticData: applyMutation(data),
        rollbackOnError: true,
        revalidate: false,
      }
    ).catch((error) => {
      if (!(error instanceof ApiError)) throw error;

      enqueueSnackbar({
        message: 'Não foi possível alterar o prazo.',
        helper: error.message,
        variant: 'error',
      });
    });
  }

  return {
    deadlines: data,
    isLoading: !error && !data,
    error,
    deleteDeadline,
    updateDeadline,
  };
}

export default useDeadlines;
