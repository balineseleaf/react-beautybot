import './SalonsAfterFilter.css';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Button from '../../elements/Button/Button';
import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import Api from '../../../utils/Api';

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
  const [salonsAfterChooseProcedures, setSalonsAfterChooseProcedures] = useState([]); // это нао передать в другой компонент

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

  return (
    <div className='salonsafterfilter'>
      <div className="salonsafterfilter__block">
        <h3 className="salonsafterfilter__header">Выберите салон или мастера:</h3>
        <p className="salonsafterfilter__hint">Название (цена/длительность услуги) (рейтинг)</p>
        <p className="salonsafterfilter__text">Вы можете сортировать мастеров по цене и рейтингу, а также выбирать нескольких мастеров.</p>
        <div className='salonsafterfilter__button-container'>
          <div className='salonsafterfilter__sort-block'>
            <button className='salonsafterfilter__sort-button'>По стоимости</button>
            <button className='salonsafterfilter__sort-button'>По рейтингу</button>
          </div>
          <button className='salonsafterfilter__sort-button salonsafterfilter__sort-button-right'>Все</button>
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
        <Button type="button" buttonText="Продолжить" to="" />
        <Button type="button" buttonText={t("Back2")} to={-1} />
      </div>

    </div>
  );
}

export default SalonsAfterFilter;