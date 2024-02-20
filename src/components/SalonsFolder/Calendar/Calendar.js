import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { useNavigate } from "react-router-dom";
import Button from '../../elements/Button/Button';
import { useTranslation } from 'react-i18next';

const MyCalendar = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();


  const onChange = (newDate) => {
    setDate(newDate);
  };

  const onClickDay = (value, event) => {
    const localDate = new Date(value.getTime() - value.getTimezoneOffset() * 60000); // Преобразование в локальное время
    navigate(`/calendar/${localDate.toISOString().split('T')[0]}`);
  };

  const tileDisabled = ({ date, view }) => {
    // Если вид календаря не 'month', то отключаем мутность
    if (view !== 'month') {
      return false;
    }
    // Отключаем мутность для дат до текущей даты
    const currentDate = new Date();
    return date < currentDate && !isSameDay(date, currentDate);
  };

  // Функция для проверки, является ли две даты одним и тем же днем
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
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
          tileDisabled={tileDisabled}
          onClickDay={onClickDay}
        />
        <Button type="button" buttonText={t("Back2")} to={-1} />
      </div>
    </div>
  );
}

export default MyCalendar;