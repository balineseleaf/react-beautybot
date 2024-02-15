import React, { useState, useEffect } from "react";
import './Reviews.css';
import { useTranslation } from 'react-i18next';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Api from '../../utils/Api';

const Reviews = () => {
  const { salonId } = useParams();
  const [reviews, setReviews] = useState(null);
  const { t } = useTranslation();

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

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
  }, [reviews]);

  return (
    <div className="review">
      <h2 className="review__header">Отзывы</h2>
      <div className="review__block">
        <div className="reviews__list">
          {reviews && reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review__item review__item-header">Дата создания:</p>
              <p className="review__item">Дата записи:{review.appointmentTime}</p>
              <p className="review__item">Стоимость:{review.appointmentPrice}</p>
              <p className="review__item">Рейтинг:{review.rate}</p>
              <p className="review__item">Процедура(ы):{review.reviewDescription}</p>
            </div>
          ))}
        </div>
        <Link to={-1} className="review__back-button">Назад</Link>
      </div>
    </div>
  );
}

export default Reviews;