import { useState } from 'react';

function usePagination({ defaultLimit, defaultPage } = {}) {
  const [page, setPage] = useState(defaultPage ?? 0);
  const [limit, setLimit] = useState(defaultLimit ?? 10);
  const userPage = page + 1;

  function nextPage() {
    setPage((value) => value + 1);
  }

  function prevPage() {
    setPage((value) => value - 1);
  }

  function jumpToPage(value) {
    setPage(value);
  }

  function register() {
    return {
      currentPage: userPage,
      onNext: nextPage,
      onPrev: prevPage,
      disableLeft: page === 0,
    };
  }

  return {
    page,
    userPage,
    limit,
    nextPage,
    prevPage,
    setLimit,
    jumpToPage,
    register,
  };
}

export default usePagination;
