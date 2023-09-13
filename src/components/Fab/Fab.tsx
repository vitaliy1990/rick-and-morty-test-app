import React, { FC, useState, MouseEvent } from 'react';
import classNames from 'classnames';
import crossIcon from '../../assets/icons/crossIcon.svg';
import verticalDotsIcon from '../../assets/icons/verticalDots.svg';
import infoIcon from '../../assets/icons/infoIcon.svg';
import downloadIcon from '../../assets/icons/downloadIcon.svg';
import css from './Fab.module.css';
import { FabTypes } from './types';
import { useAppSelector } from '../../store/hooks';
import { selectCharacters } from '../../pages/MainPage/MainPageSlice';
import { exportToCsv } from '../../utils/download';
import ModalHistory from '../ModalHistory/ModalHistory';

const Fab: FC<FabTypes> = ({ isDisableDownload = false }) => {
  const [isOpenFab, setIsOpenFab] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const characters = useAppSelector(selectCharacters);

  const rootClassName = classNames(css.buttonsWrapper, {
    [css.showButtons]: isOpenFab,
  });

  const handleClickDownload = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    exportToCsv(characters?.results || []);
  };

  const handleClickHistory = () => {
    setIsOpenModal(false);
  };

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
          <button
            type='button'
            onClick={() => setIsOpenModal(!isOpenModal)}
          >
            <img
              src={infoIcon}
              alt=''
            />
          </button>
          <button
            type='button'
            disabled={isDisableDownload}
            onClick={handleClickDownload}
          >
            <img
              src={downloadIcon}
              alt=''
            />
          </button>
        </div>
      </div>
      {isOpenModal && <ModalHistory handleClick={handleClickHistory} />}
    </div>
  );
};

export default Fab;
