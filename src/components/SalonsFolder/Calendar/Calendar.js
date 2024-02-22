import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { useNavigate } from "react-router-dom";
import Button from '../../elements/Button/Button';
import { useTranslation } from 'react-i18next';
import Api from '../../../utils/Api';
import { useLocation } from 'react-router-dom';


const MyCalendar = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const [salonInfo, setSalonInfo] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const location = useLocation(); // объект , где есть pathname и state  с нашими данными ,переданным по useNavigate
  const { salonId } = location.state;

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (salonInfo && selectedDay) {
      const localDate = new Date(selectedDay.getTime() - selectedDay.getTimezoneOffset() * 60000); // Преобразование в локальное время
      navigate(`/schedule/${localDate.toISOString().split('T')[0]}`, { state: { salonInfo: salonInfo } });
    }
  }, [salonInfo, selectedDay])


  const onChange = (newDate) => {
    setDate(newDate);
  };

  const onClickDay = async (value) => {
    try {
      const salonInfo = await api.getSalonInfo(salonId);
      setSelectedDay(value);
      setSalonInfo(salonInfo);
    } catch (error) {
      console.error("Error fetching salon info:", error);
    }
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
          onClickDay={onClickDay}
        />
        <Button type="button" buttonText={t("Back2")} to={-1} />
      </div>
    </div>
  );
}

export default MyCalendar;