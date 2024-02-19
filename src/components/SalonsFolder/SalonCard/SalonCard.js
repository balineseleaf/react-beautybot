import React, { useState, useEffect } from "react";
import './SalonCard.css';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Api from '../../../utils/Api';
import BackButton from '../..//elements/BackButton/BackButton';

const SalonCard = () => {
  const { salonId } = useParams();
  //console.log(salonId);
  const { t } = useTranslation();
  const [salonInfo, setSalonInfo] = useState(null);

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });


  useEffect(() => {
    const getSalonDetails = async () => {
      try {
        const salonInfo = await api.getSalonInfo(salonId);
        setSalonInfo(salonInfo);
      } catch (error) {
        console.error("Error fetching salon info:", error);
      }
    };

    getSalonDetails();
  }, [salonId]);
  // let location = salonInfo && salonInfo.salonLocation;
  // // Создаем ссылку с адресом, который ведет на Google Maps
  // let googleMapsLink = `<a href=${location} target="_blank">Местоположение</a>`;

  return (
    <div className="saloncard">
      <div className="saloncard__block">
        <h3 className="saloncard__header">Салон: {salonInfo && salonInfo.salonName} {salonInfo && salonInfo.salonRate.toFixed(2)}* ()</h3>
        <ul className="saloncard__list">
          <li className="saloncard__list-item saloncard__description"> <span className="saloncard__list-bold-item">Описание:</span> {salonInfo && salonInfo.salonDescription}</li>
          <li className="saloncard__list-item saloncard__email"> <span className="saloncard__list-bold-item">Почта салона:</span> {salonInfo && salonInfo.salonEmail}</li>
          <li className="saloncard__list-item saloncard__phone"> <span className="saloncard__list-bold-item">Телефон:</span> {salonInfo && salonInfo.salonPhone}</li>
          <li className="saloncard__list-item saloncard__address"> <span className="saloncard__list-bold-item">Адрес:</span> {salonInfo && salonInfo.salonAddress}</li>
          <li className="saloncard__list-item saloncard__location"> <span id="salonAddress" className="saloncard__list-bold-item">Местоположение:</span> {salonInfo && salonInfo.salonLocation}</li>
        </ul>
        <div className="saloncard__menu">
          <Link to={`/pricelist/${salonId}`} className="saloncard__menu-button">Прайс-лист</Link>
          <Link to="/calendar" className="saloncard__menu-button">Расписание</Link>
          <Link to={`/reviews/${salonId}`} className="saloncard__menu-button">Отзывы</Link>
        </div>
        <BackButton type="button" buttonText={t("Back2")} to="/salons" />
      </div>
    </div>
  );
}

export default SalonCard;