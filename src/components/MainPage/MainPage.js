import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './MainPage.css';
import { useTranslation } from 'react-i18next';

const MainPage = () => {

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className='container'>
      <div className="langbox">
        <button onClick={() => changeLanguage("en")}>EN</button>
        <button onClick={() => changeLanguage("ru")}>RU</button>
      </div>
      <div className="header-block">
      <h1 data-lang='welcome-message' className='header__title'>
        {t("NameProject")}
      </h1>
      </div>
      <div className="main__container">
          <div className="main__links-item-round">
            <Link to="/appointment" className="main__link-round"><span className='main__text-in-button'>{t("SignUp")}</span></Link>
          </div>
      <div className='inner-container'>
          <ul className='main__links-block'>
            <li className="main__links-item">
              <Link to='/salons' className="main__link">{t("Salons")}</Link>
            </li>
            <li className="main__links-item">
              <Link to='/mynotes' className="main__link">{t("MyNotes")}</Link>
            </li>
            <li className="main__links-item">
              <Link to='/aboutus' className="main__link">{t("AboutUs")}</Link>
            </li>
          </ul>
      </div>
        <NavLink to='/preprofile' className="main__account-link" >
          <div className="main__link-logo"  alt="Иконка профиля"></div>
        </NavLink>
      </div>
      </div>
  );
};

export default MainPage;
