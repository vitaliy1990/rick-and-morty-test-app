import classNames from 'classnames';
import React, { FC } from 'react';
import css from './Pagination.module.css';
import { PaginationPropTypes } from './types';
import { usePagination } from '../../hooks/usePagination';
import disableArrowIcon from '../../assets/icons/disableArrowIcon.svg';
import activeArrowIcon from '../../assets/icons/activeArrowIcon.svg';

const Pagination: FC<PaginationPropTypes> = ({ pagesCount, className, handleClickPage, currentPage = 1, pageSize = 10 }) => {
  const paginationRange = usePagination({
    currentPage,
    pagesCount,
    pageSize,
  });

  if (pagesCount <= 1 || !pagesCount) {
    return null;
  }

  const createPagesList = () => {
    if (pagesCount <= pageSize) {
      return paginationRange?.map((page: number, index: number) => (
        <button
          type='button'
          onClick={() => handleClickPage && handleClickPage(page)}
          className={page === currentPage ? css.active : ''}
          key={index}
        >
          {page}
        </button>
      ));
    }

    const prevRange = paginationRange[0] - 1;
    const nextRange = paginationRange[paginationRange.length - 1] + 1;

    const isDisableLeftArrow = currentPage <= pageSize;
    const isDisableRightArrow = paginationRange.includes(pagesCount);

    return (
      <>
        <button
          type='button'
          disabled={isDisableLeftArrow}
          onClick={() => handleClickPage && handleClickPage(prevRange)}
          className={css.arrow}
        >
          <img
            src={isDisableLeftArrow ? disableArrowIcon : activeArrowIcon}
            alt=''
          />
        </button>
        <div className={css.pagesWrapper}>
          {paginationRange?.map((page: number, index: number) => (
            <button
              type='button'
              onClick={() => handleClickPage && handleClickPage(page)}
              className={page === currentPage ? css.active : ''}
              key={index}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          type='button'
          disabled={isDisableRightArrow}
          onClick={() => handleClickPage && handleClickPage(nextRange)}
          className={css.arrow}
        >
          <img
            src={isDisableRightArrow ? disableArrowIcon : activeArrowIcon}
            alt=''
          />
        </button>
      </>
    );
  };

  const rootClassName = classNames(css.root, className);

  return <div className={rootClassName}>{createPagesList()}</div>;
};

export default Pagination;
