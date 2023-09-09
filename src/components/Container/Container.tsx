import React, { FC, PropsWithChildren } from 'react';
import css from './Container.module.css';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={css.root}>{children}</div>;
};

export default Container;
