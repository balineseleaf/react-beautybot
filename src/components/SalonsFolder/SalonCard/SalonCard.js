import React, { useState, useEffect } from "react";
import './SalonCard.css';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Api from '../../../utils/Api';
import { useNavigate } from "react-router-dom";
import ToolTip from "../../elements/ToolTip/ToolTip";
import LeftArrowButton from '../../elements/LeftArrowButton/LeftArrowButton';
import RightArrowButton from '../../elements/RightArrowButton/RightArrowButton';
import leftArrow from "../../../images/leftArrow.svg";
import rightArrow from "../../../images/rightArrow.svg";

const SalonCard = () => {
  const { salonId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [salonInfo, setSalonInfo] = useState(null);
  const [reviews, setReviews] = useState(null);

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });


  useEffect(() => {
    const getSalonDetails = async () => {
      try {
        const salonData = await api.getSalonInfo(salonId);
        setSalonInfo(salonData);
      } catch (error) {
        console.error("Error fetching salon info:", error);
      }
    };

    getSalonDetails();
  }, [salonId]);

  useEffect(() => {
    const getSalonReview = async () => {
      try {
        const reviewInfo = await api.getReviews(salonId);
        setReviews(reviewInfo);
      } catch (error) {
        console.error("Error fetching salon info:", error);
      }
    };

    getSalonReview();
  }, [salonId]);



  const handleMoveToCalendar = () => {
    navigate(`/calendar/${salonId}`, { state: { salonId: salonId } });
  }

  return (
    <div className="saloncard">
      <div className="saloncard__block">
        <div className="saloncard__header-container">
          <h3 className="saloncard__header"><span className="saloncard__bold-header">Салон:</span> {salonInfo && salonInfo.salonName} {salonInfo && salonInfo.salonRate?.toFixed(2)}* ()</h3>
        </div>
        <ul className="saloncard__list">
          <li className="saloncard__list-item saloncard__description"> <span className="saloncard__list-bold-item">Описание:</span> {salonInfo && salonInfo.salonDescription}</li>
          <li className="saloncard__list-item saloncard__email"> <span className="saloncard__list-bold-item">Почта салона:</span> {salonInfo && salonInfo.salonEmail}</li>
          <li className="saloncard__list-item saloncard__phone"> <span className="saloncard__list-bold-item">Телефон:</span> {salonInfo && salonInfo.salonPhone}</li>
          <li className="saloncard__list-item saloncard__address"> <span className="saloncard__list-bold-item">Адрес:</span> {salonInfo && salonInfo.salonAddress}</li>
          <li className="saloncard__list-item saloncard__location"> <span id="salonAddress" className="saloncard__list-bold-item">Местоположение:</span> {salonInfo && salonInfo.salonLocation}</li>
        </ul>
        <div className="saloncard__menu">
          <Link to={`/pricelist/${salonId}`} className="saloncard__menu-button">Прайс-лист</Link>
          <button onClick={handleMoveToCalendar} className="saloncard__button" type="button">Расписание</button>
          <ToolTip showTooltip={reviews && reviews.length === 0} text={"Нет отзывов"} >
            <Link onClick={(event) => reviews && reviews.length === 0 && event.preventDefault()} to={`/reviews/${salonId}`} className={reviews && reviews.length === 0 ? "saloncard__menu-button inactive" : "saloncard__menu-button"}>Отзывы</Link>
          </ToolTip>
        </div>
      </div>
      <LeftArrowButton alt="стрелка влево" type="button" src={leftArrow} to={-1} />
    </div>
  );
}

export default SalonCard;