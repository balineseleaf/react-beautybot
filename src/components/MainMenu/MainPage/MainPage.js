import React from 'react';
import './MainPage.css';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import MainButton from '../../elements/MainButton/MainButton';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <div className='main'>
      <Header />
      <div className="main__block">
        <div className='main__buttons-container'>
          <div className='main__central-button-block'>
            <MainButton type="button" buttonText={t("NewAppointment")} to="/appointment" />
          </div>
          <div className='main__bottom-buttons-block'>
            <MainButton type="button" buttonText={t("Salons")} to="/salons" />
            <MainButton type="button" buttonText={t("MyNotes")} to="/mynotes" />
            <MainButton type="button" buttonText={t("AboutUs")} to="/aboutus" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
