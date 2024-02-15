import React, { useState, useEffect } from "react";
import './SalonCard.css';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Api from '../../utils/Api';

const SalonCard = () => {
  const { salonId } = useParams();
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


  return (
    <div className="saloncard">
      <div className="saloncard__block">
        <h3 className="saloncard__header">{salonInfo && salonInfo.salonName}</h3>
        <ul className="saloncard__list">
          <li className="saloncard__list-item saloncard__description"> Описание: {salonInfo && salonInfo.salonDescription}</li>
          <li className="saloncard__list-item saloncard__rate">Рейтинг салона: {salonInfo && salonInfo.salonRate}</li>
          <li className="saloncard__list-item saloncard__email">Почта салона: {salonInfo && salonInfo.salonEmail}</li>
          <li className="saloncard__list-item saloncard__phone">Телефон: {salonInfo && salonInfo.salonPhone}</li>
          <li className="saloncard__list-item saloncard__address">Адрес: {salonInfo && salonInfo.salonAddress}</li>
        </ul>
        <div className="saloncard__menu">
          <Link to={`/pricelist/${salonId}`} className="saloncard__menu-button">Прайс-лист</Link>
          <Link to="/calendar" className="saloncard__menu-button">Расписание</Link>
          <Link to={`/reviews/${salonId}`} className="saloncard__menu-button">Отзывы</Link>
        </div>

        <Link to="/salons" className="saloncard__back-button">{t("Back2")}</Link>
      </div>
    </div>
  );
}

export default SalonCard;