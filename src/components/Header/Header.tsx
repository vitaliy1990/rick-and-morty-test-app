import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../Container/Container';
import userIcon from '../../assets/icons/userIcon.svg';
import css from './Header.module.css';

const Header: FC = () => {
  return (
    <div className={css.root}>
      <Container>
        <div className={css.userProfile}>
          <NavLink to='/'>
            <img
              src={userIcon}
              alt='user'
            />
          </NavLink>
        </div>
        <div className={css.banner}>
          <h1>The Rick and Morty API</h1>
        </div>
      </Container>
    </div>
  );
};

export default Header;
