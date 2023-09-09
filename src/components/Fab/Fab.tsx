import React, { FC, useState } from 'react';
import classNames from 'classnames';
import crossIcon from '../../assets/icons/crossIcon.svg';
import verticalDotsIcon from '../../assets/icons/verticalDots.svg';
import infoIcon from '../../assets/icons/infoIcon.svg';
import downloadIcon from '../../assets/icons/downloadIcon.svg';
import css from './Fab.module.css';
import { FabTypes } from './types';

const Fab: FC<FabTypes> = ({ isDisableDownload = false }) => {
  const [isOpenFab, setIsOpenFab] = useState<boolean>(false);

  const rootClassName = classNames(css.buttonsWrapper, {
    [css.showButtons]: isOpenFab,
  });

  return (
    <div className={css.root}>
      <div className={css.fabWrapper}>
        <button
          type='button'
          onClick={() => setIsOpenFab(!isOpenFab)}
          className={css.fabButton}
        >
          <img
            src={isOpenFab ? crossIcon : verticalDotsIcon}
            alt=''
          />
        </button>
        <div className={rootClassName}>
          <button type='button'>
            <img
              src={infoIcon}
              alt=''
            />
          </button>
          <button
            type='button'
            disabled={isDisableDownload}
          >
            <img
              src={downloadIcon}
              alt=''
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fab;
