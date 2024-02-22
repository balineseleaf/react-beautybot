import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { useTranslation } from 'react-i18next';
import Header from '../Header/Header';
import MainButton from '../../elements/MainButton/MainButton';
import Api from '../../../utils/Api';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import ToolTip from '../../elements/ToolTip/ToolTip';

const MainPage = () => {
  const { t } = useTranslation();
  const [salons, setSalons] = useState([]);
  const currentUser = React.useContext(CurrentUserContext);

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (currentUser && currentUser.regionId) {
      getSalonsByRegionForCurrentUser();
    }

  }, [currentUser]);

  function getSalonsByRegionForCurrentUser() {
    api.getAllSalonsInRegion(currentUser.regionId)
      .then((salons) => {
        setSalons(salons);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className='main'>
      <Header />
      <div className="main__block">
        <div className='main__buttons-container'>
          <div className='main__central-button-block'>
            <MainButton type="button" buttonText={t("NewAppointment")} to="/appointment" />
          </div>
          <div className='main__bottom-buttons-block'>
            <MainButton disabled={salons.length === 0} type="button" buttonText={t("Salons")} to="/salons" />
            <MainButton type="button" buttonText={t("MyNotes")} to="/mynotes" />
            <MainButton type="button" buttonText={t("AboutUs")} to="/aboutus" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
