import React, { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage: FC = () => {
  const { state } = useLocation();
  const stateMessage = state?.message;

  return (
    <div className={css.root}>
      <h1>404 Page not found</h1>
      {stateMessage && <p>{stateMessage}</p>}
    </div>
  );
};

export default memo(NotFoundPage);
