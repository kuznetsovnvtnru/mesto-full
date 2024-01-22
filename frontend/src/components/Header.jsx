import React from 'react';
import headerLogo from '../image/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();
  return (
    <header className='header'>
      <img src={headerLogo} className='header__logo' alt='Логотип Места России' />
      {location.pathname === '/sign-in' && (
        <Link className='header__link' to={'/sign-up'}>
          Регистрация
        </Link>
      )}
      {location.pathname === '/sign-up' && (
        <Link className='header__link' to={'/sign-in'}>
          Вход
        </Link>
      )}
      {loggedIn && (
        <>
          <div className='header__email'>
            {email}
            <Link className='header__link' to={'/sign-in'} onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;

