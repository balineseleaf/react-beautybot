import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { useTranslation } from 'react-i18next';
import MainButton from '../../elements/MainButton/MainButton';
import Api from '../../../utils/Api';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import newappointment from "../../../images/newappointment.png";
import myappointments from "../../../images/myAppoint.png";
import info from "../../../images/Information.png";
import salonIcon from "../../../images/salon.png";

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
      <div className="main__block">
        <nav className='main__navbar'>
          <MainButton src={newappointment} alt="новая запись" to="/" />
          <MainButton src={salonIcon} alt="салоны" disabled={salons.length === 0} type="button" to="/salons" />
          <MainButton src={myappointments} alt="мои записи" to="/mynotes" />
          <MainButton src={info} alt="о нас" to="/aboutus" />
        </nav>
      </div>
    </div>
  );
};

export default MainPage;
