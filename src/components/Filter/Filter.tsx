import React, { FC, useState } from 'react';
import css from './Filter.module.css';
import FilterForm from '../FilterForm/FilterForm';
import { FilterProps } from './types';

const Filter: FC<FilterProps> = ({ handleSubmit }) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <div className={css.root}>
      <button
        type='button'
        className={css.filterButton}
        onClick={() => setIsOpenFilter(!isOpenFilter)}
      >
        {isOpenFilter ? 'Remove filter' : 'Filter'}
      </button>
      {isOpenFilter && <FilterForm handleSubmitForm={handleSubmit} />}
    </div>
  );
};

export default Filter;
