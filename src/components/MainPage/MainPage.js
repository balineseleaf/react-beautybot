import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <div className='main'>
      <Header />
      <div className="main__container">
        <Link to="/appointment" className='main__central-link'>{t("SignUp")}
        </Link>
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
      </div>
    </div>
  );
};

export default MainPage;
