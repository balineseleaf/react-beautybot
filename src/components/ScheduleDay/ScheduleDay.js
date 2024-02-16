import React from "react";
import './ScheduleDay.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const ScheduleDay = () => {
  return (
    <div className="scheduleday">
      <div className="scheduleday__block">
        <h3 className="scheduleday__header"> Выберите подходящее время:</h3>
        <ul className="scheduleday__hours-list">
          <li className="scheduleday__hours-item">10:00-11:00</li>
          <li className="scheduleday__hours-item">11:00-12:00</li>
          <li className="scheduleday__hours-item">12:00-13:00</li>
          <li className="scheduleday__hours-item">13:00-14:00</li>
          <li className="scheduleday__hours-item">14:00-15:00</li>
          <li className="scheduleday__hours-item">15:00-16:00</li>
          <li className="scheduleday__hours-item">16:00-17:00</li>
          <li className="scheduleday__hours-item">17:00-18:00</li>
          <li className="scheduleday__hours-item">18:00-19:00</li>
        </ul>
        <Link to={-1} className="scheduleday__back-button">Назад</Link>
      </div>

    </div>);
}

export default ScheduleDay;