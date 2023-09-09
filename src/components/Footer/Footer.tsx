import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';

import logo from '../../assets/images/logo.png';
import twitterIcon from '../../assets/icons/twitterIcon.svg';
import githubIcon from '../../assets/icons/githubIcon.svg';
import supportUsIcon from '../../assets/icons/supportUsIcon.svg';

import css from './Footer.module.css';

const Footer: FC = () => {
  return (
    <div className={css.root}>
      <Container>
        <div className={css.slogan}>Performed as part of a test case for the company</div>
        <div className={css.logo}>
          <Link to='/'>
            <img
              src={logo}
              alt=''
            />
          </Link>
        </div>
        <div className={css.links}>
          <Link to='/'>
            <img
              src={githubIcon}
              alt=''
            />
          </Link>
          <Link to='/'>
            <img
              src={twitterIcon}
              alt=''
            />
          </Link>
          <Link to='/'>
            <img
              src={supportUsIcon}
              alt=''
            />
          </Link>
        </div>
        <div className={css.year}>2023</div>
      </Container>
    </div>
  );
};

export default Footer;
