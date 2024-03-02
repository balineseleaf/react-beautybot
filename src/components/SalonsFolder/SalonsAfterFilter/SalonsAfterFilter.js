import './SalonsAfterFilter.css';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import Api from '../../../utils/Api';
import { useLocation } from "react-router-dom";
import LeftArrowButton from '../../elements/LeftArrowButton/LeftArrowButton';
import RightArrowButton from '../../elements/RightArrowButton/RightArrowButton';


const SalonsAfterFilter = () => {
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
    }
  }, [salonsAfterChooseProcedures]);

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

      <LeftArrowButton type="button" to={-1} />
      <RightArrowButton type="submit" to="/appointmentcalendar" />

    </div>
  );
}

export default SalonsAfterFilter;