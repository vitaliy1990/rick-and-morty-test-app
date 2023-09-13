import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import css from './ModalHistory.module.css';
import { ModalHistoryProps } from './types';
import { getDataFromLocalStorage } from '../../utils/browser';
import { Character, SelectName } from '../../types';

const ModalHistory: FC<ModalHistoryProps> = ({ handleClick }) => {
  const characterHistoryList = getDataFromLocalStorage(SelectName.character);
  const locationHistoryList = getDataFromLocalStorage(SelectName.location);
  const episodeHistoryList = getDataFromLocalStorage(SelectName.episodes);

  const lastCharacterViewed = getDataFromLocalStorage('profile');

  const renderHistoryValue = (values: [string, string][] | null) => {
    if (values) {
      return values.map((item: [string, string], index: number) => <span key={index}>{`${item[0]}: ${item[1]}`}</span>);
    }

    return <p>Empty</p>;
  };

  const renderLastCharacterViewed = (profile: Character | null) => {
    if (profile) {
      return (
        <div className={css.historyItem}>
          <h3>Last character that was viewed:</h3>
          <NavLink
            to={`/character/${lastCharacterViewed.id}`}
            className={css.historyText}
          >
            {lastCharacterViewed.name}
          </NavLink>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={css.root}>
      <div className={css.modalWrapper}>
        <div className={css.historyDescription}>
          <h2>History</h2>
          <div className={css.historyItem}>
            <h3>Character:</h3>
            <div className={css.historyText}>{renderHistoryValue(characterHistoryList)}</div>
          </div>
          <div className={css.historyItem}>
            <h3>Location:</h3>
            <div className={css.historyText}>{renderHistoryValue(locationHistoryList)}</div>
          </div>
          <div className={css.historyItem}>
            <h3>Episode:</h3>
            <div className={css.historyText}>{renderHistoryValue(episodeHistoryList)}</div>
          </div>
          {renderLastCharacterViewed(lastCharacterViewed)}
        </div>
        <div className={css.buttonWrapper}>
          <button
            type='button'
            onClick={handleClick}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHistory;
