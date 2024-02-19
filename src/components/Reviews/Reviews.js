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
  }, [salonId]);

  console.log(reviews);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span style={{ color: '#ffa800', fontSize: '23px' }} key={i}>&#9733;</span>);
    }
    return stars;
  };

  return (
    <div className="review">
      <h2 className="review__header">Отзывы</h2>
      <div className="review__block">
        <div className="reviews__list">
          {reviews && reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review__item review__item-header"><span className="review__bold-item">Дата создания:</span></p>
              <p className="review__item"><span className="review__bold-item">Дата записи:</span> {review.appointmentTime}</p>
              <p className="review__item"><span className="review__bold-item">Стоимость:</span> {review.appointmentPrice}</p>
              <p className="review__item"><span className="review__bold-item">Рейтинг:</span> {renderStars(review.rate)}</p>
              <p className="review__item"><span className="review__bold-item">Процедура(ы):</span> {review.reviewDescription}</p>
            </div>
          ))}
        </div>
        <Link to={-1} className="review__back-button">Назад</Link>
      </div>
    </div>
  );
}

export default Reviews;