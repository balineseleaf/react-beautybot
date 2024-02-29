import './Header.css';
import { ReactComponent as Logo } from '../../../images/O-logo.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const Header = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="header">
      <div className="langbox">
        <button className="lang__button_eng" onClick={() => changeLanguage("en")}>EN</button>
        <button className="lang__button_ru" onClick={() => changeLanguage("ru")}>RU</button>
      </div>
      <div className='header__logo-box'>
        <Logo className="header__logo" />
        <h1 className="header__text">koshko</h1>
      </div>
      <Link to='/profile' >
        <div className="header__link-to-profile" alt="Иконка профиля"></div>
      </Link>
    </div>);
}

export default Header;