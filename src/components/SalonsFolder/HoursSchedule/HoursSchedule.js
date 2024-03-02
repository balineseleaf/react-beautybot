import React from "react";
import './HoursSchedule.css';
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import LeftArrowButton from "../../elements/LeftArrowButton/LeftArrowButton";

const ScheduleDay = () => {
  const location = useLocation(); // объект , где есть pathname и state  с нашими данными ,переданным по useNavigate
  const { salonSchedule } = location.state;
  let sortedSalonSchedule = Object.values(salonSchedule);
  sortedSalonSchedule.sort((a, b) => a - b);
  const { t } = useTranslation();

  return (
    <div className="scheduleday">
      <div className="scheduleday__block">
        <div className="scheduleday__header-container">
          <h3 className="scheduleday__header"> Выберите подходящее время:</h3>
        </div>
        <div className="scheduleday__container">
          {sortedSalonSchedule.length > 0 ? (
            <ul className="scheduleday__hours-list">
              {sortedSalonSchedule.map((hour, index) => (
                <li key={index} className="scheduleday__hours-item">{hour}:00</li>
              ))}
            </ul>
          ) : (
            <p>Расписание отсутствует</p>
          )}
        </div>
      </div>
      <LeftArrowButton type="button" to={-1} />
    </div>
  );
}

export default ScheduleDay;