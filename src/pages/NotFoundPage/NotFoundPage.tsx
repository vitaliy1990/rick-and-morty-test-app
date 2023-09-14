import React, { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage: FC = () => {
  const { state } = useLocation();
  const stateMessage = state?.message;

  return (
    <div className={css.root}>
      <h1>404 Page not found</h1>
      {stateMessage && (
        <p className={css.infoMessage}>
          {stateMessage} <Link to='/'> &#8810; Go Back</Link>
        </p>
      )}
    </div>
  );
};

export default memo(NotFoundPage);
