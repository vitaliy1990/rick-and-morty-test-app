import { useMemo } from 'react';

export const usePagination = (pagination: Pagination) => {
  const { currentPage, pagesCount, pageSize } = pagination;

  const paginationRange = useMemo(() => {
    if (pagesCount <= pageSize) {
      return createRange(1, pagesCount);
    }

    if (currentPage <= pageSize) {
      return createRange(1, pageSize);
    }

    const startRange = currentPage - (currentPage % pageSize);

    if (currentPage === startRange) {
      return createRange(currentPage - pageSize + 1, startRange);
    }

    const endRange = startRange + pageSize > pagesCount ? pagesCount : startRange + pageSize;

    return createRange(startRange + 1, endRange);
  }, [ pageSize, currentPage]);

  return paginationRange;
};

const createRange: createRangeType = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

interface Pagination {
  currentPage: number;
  pagesCount: number;
  pageSize: number;
}

type createRangeType = (start: number, end: number) => Array<number>;
