import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { Link } from "react-router-dom";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar">
      <div className="calendar__container">
        <h3 className="calendar__header">Расписание салона </h3>
        <p className="calendar__hint">Для записи к мастеру, пожалуйста, нажмите кнопку "Новая запись" или перейдите в раздел "Цены".</p>
        <Calendar
          className="calendar__component"
          onChange={onChange}
          value={date}
        />
        <Link to={-1} className="calendar__back-button">Назад</Link>
      </div>
    </div>
  );
}

export default MyCalendar;