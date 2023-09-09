import React, { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import css from './FallbackErrorBoundary.module.css';

const FallbackErrorBoundary: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className={css.root}>
      <h1>An error occurred: {error.message}</h1>
      <button
        type='button'
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </div>
  );
};

export default FallbackErrorBoundary;
