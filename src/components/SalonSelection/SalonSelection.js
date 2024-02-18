import './SalonSelection.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const SalonSelection = () => {
  //const { t } = useTranslation();
  const location = useLocation();
  const { salons } = location.state;
  console.log('салоны в компоненте', salons);

  return (
    <div className='salonselection'>
      <div className="salonselection__block">
        <h3 className="salonselection__header">Выберите салон или мастера:</h3>
        <p className="salonselection__hint">Название (цена/длительность услуги) (рейтинг)</p>
        <p className="salonselection__text">Вы можете сортировать мастеров по цене и рейтингу, а также выбирать нескольких мастеров.</p>
        <div className='salonselection__button-container'>
          <button className='salonselection__sort-button'>По стоимости</button>
          <button className='salonselection__sort-button'>По рейтингу</button>
          <button className='salonselection__sort-button'>Все</button>
        </div>
        <div className="salonselection__container">
          тут салоны
        </div>
        <Link to="" className="salonselection__submit-button">Продолжить</Link>
        <Link to={-1} className="salonselection__back-button">Назад</Link>
      </div>

    </div>
  );
}

export default SalonSelection;