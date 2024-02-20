import './SalonsAfterFilter.css';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Button from '../../elements/Button/Button';

const SalonsAfterFilter = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { salons } = location.state;

  return (
    <div className='salonselection'>
      <div className="salonselection__block">
        <h3 className="salonselection__header">Выберите салон или мастера:</h3>
        <p className="salonselection__hint">Название (цена/длительность услуги) (рейтинг)</p>
        <p className="salonselection__text">Вы можете сортировать мастеров по цене и рейтингу, а также выбирать нескольких мастеров.</p>
        <div className='salonselection__button-container'>
          <div className='salonselection__sort-block'>
            <button className='salonselection__sort-button'>По стоимости</button>
            <button className='salonselection__sort-button'>По рейтингу</button>
          </div>
          <button className='salonselection__sort-button salonselection__sort-button-right'>Все</button>
        </div>
        <div className="salonselection__container">
          {salons.length > 0 ? (
            <ul className="salonselection__list">
              {salons.map((salon) => (
                <li key={salon.salonId} className="salonselection__item">{salon.salonName}</li>
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