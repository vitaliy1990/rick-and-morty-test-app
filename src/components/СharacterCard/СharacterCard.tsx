import React, { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import css from './СharacterCard.module.css';
import { CharacterCard } from './types';
import { setDataInLocalStorage } from '../../utils/browser';

const СharacterCard: FC<CharacterCard> = ({ id, name, status, species, image, location, firstEpisodeName, size = 'small' }) => {
  const rootClassName = classNames(css.root, css[size]);
  const classNameStatus = status.toLocaleLowerCase();

  useEffect(() => {
    if (size === 'large') {
      const profile = { id, name };
      return () => setDataInLocalStorage('profile', profile);
    }
  }, []);

  return (
    <div className={rootClassName}>
      <div className={css.characterImage}>
        <img
          src={image}
          alt=''
        />
      </div>
      <div className={css.characterInfoWrapper}>
        <div className={css.characterStatus}>
          <NavLink to={`/character/${id}`}>{name}</NavLink>
          <p className={css[classNameStatus]}>
            {status} - {species}
          </p>
        </div>
        <div className={css.characterLatLocation}>
          <h3>Last known location:</h3>
          <p className={css.location}>{location}</p>
        </div>
        <div className={css.firstLocation}>
          <h3>First seen in:</h3>
          <p className={css.location}>{firstEpisodeName}</p>
        </div>
        {size === 'large' && (
          <div className={css.otherInfo}>
            <h3>Other Info</h3>
            <div className={css.otherText}>
              <p className={css.location}>The Mosaic Rooms are a leading non-profit arts organisation and bookshop dedicated to supporting and promoting contemporary culture from the Arab world and beyond in London.</p>
              <p className={css.location}>Established in 2009, as a project of the A.M. Qattan Foundation, it dedicates its work to championing creative and critical voices that are often underrepresented.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default СharacterCard;
