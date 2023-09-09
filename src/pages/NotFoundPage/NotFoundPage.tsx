import React, { FC, memo } from 'react';
import css from './NotFoundPage.module.css';

const NotFoundPage: FC = () => {
  return (
    <div className={css.root}>
      <h1>404 Page not found</h1>
    </div>
  );
};

export default memo(NotFoundPage);
