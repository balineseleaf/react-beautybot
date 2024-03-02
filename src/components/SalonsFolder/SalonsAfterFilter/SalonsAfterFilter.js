import './SalonsAfterFilter.css';
import { useTranslation } from 'react-i18next';

import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
// import { CurrentSalonContext } from '../../../context/CurrentSalonContext';
import Api from '../../../utils/Api';
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../../images/leftArrow.svg";
import rightArrow from "../../../images/rightArrow.svg";
import LeftArrowButton from '../../elements/LeftArrowButton/LeftArrowButton';
import RightArrowButton from '../../elements/RightArrowButton/RightArrowButton';


const SalonsAfterFilter = () => {
  const navigate = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();
  const location = useLocation(); // объект , где есть pathname и state  с нашими данными ,переданным по useNavigate
  const { matches } = location.state;

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //--------------------------------------------------get salons after filter ----------------------------------
  const [salonsAfterChooseProcedures, setSalonsAfterChooseProcedures] = useState([]);// это надо передать в другой компонент

  async function getSalonsThatPerformTheSelectedProcedures(selectedProcedures) {
    try {
      const salonsInfo = await api.getSalonsForSelectedProcedures(selectedProcedures);
      console.log('q', salonsInfo)
      setSalonsAfterChooseProcedures(salonsInfo);
    } catch (error) {
      return console.log(error);
    }
  }


  useEffect(() => {
    getSalonsThatPerformTheSelectedProcedures(finallyCategoriesAndUserIdObject)
  }, [])

  let finallyCategoriesAndUserIdObject = {}; //финальный объект для отправки на сервер 
  finallyCategoriesAndUserIdObject = {
    clientId: currentUser.clientId,
    selectedProcedures: matches
  }


  useEffect(() => {
    if (salonsAfterChooseProcedures.length > 0) {
      localStorage.setItem('salonId', JSON.stringify(salonsAfterChooseProcedures));
      //navigate(`/appointmentcalendar/${salonId}`, { state: { salonId: salonsAfterChooseProcedures.salonId } });
    }
  }, [salonsAfterChooseProcedures]);

  // const handleMoveToCalendar = () => {
  //   navigate(`/appointmentcalendar`, { state: { salonId: salonsAfterChooseProcedures.salonId } });
  // }

  return (
    <div className='salonsafterfilter'>
      <div className="salonsafterfilter__block">
        <div className="salonsafterfilter__header-container">
          <h3 className="salonsafterfilter__header">Выберите салон или мастера:</h3>
        </div>
        <div className="salonsafterfilter__container">
          {salonsAfterChooseProcedures.length > 0 ? (
            <ul className="salonsafterfilter__list">
              {salonsAfterChooseProcedures.map((salon) => (
                <li key={salon.salonId} className="salonsafterfilter__item">{salon.salonName}</li>
              ))}
            </ul>
          ) : <p className="salons__item notfound">Салонов в вашем регионе не найдено</p>}
        </div>
      </div>

      <LeftArrowButton alt="стрелка влево" type="button" src={leftArrow} to={-1} />
      <RightArrowButton src={rightArrow} alt="стрелка вправо" type="submit" to="/appointmentcalendar" />
      {/* <Button onClick={handleMoveToCalendar} type="button" buttonText="Продолжить" /> */}

    </div>
  );
}

export default SalonsAfterFilter;