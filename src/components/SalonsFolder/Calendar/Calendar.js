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
    if (scheduleForDay && selectedDay) {
      const localDate = new Date(selectedDay.getTime() - selectedDay.getTimezoneOffset() * 60000); // Преобразование в локальное время
      navigate(`/schedule/${localDate.toISOString().split('T')[0]}`, { state: { salonSchedule: scheduleForDay } });
    }
  }, [selectedDay])


  // ----------------------------работа с компонентом Calendar------------------------

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



  //------------ работаем с полем schedule  чтобы он понимал дни недели--------------------


  const getScheduleForDay = (dayIndex) => {
    // Преобразуем дни недели для объекта Date, чтобы они совпадали с вашими индексами
    const salonSchedule = {
      1: salonInfo && salonInfo.schedule[1],
      2: salonInfo && salonInfo.schedule[2],
      3: salonInfo && salonInfo.schedule[3],
      4: salonInfo && salonInfo.schedule[4],
      5: salonInfo && salonInfo.schedule[5],
      6: salonInfo && salonInfo.schedule[6],
      7: salonInfo && salonInfo.schedule[7],
    };
    return salonSchedule[dayIndex];
  };

  // Получаем день недели для выбранной даты
  const dayIndex = selectedDay ? selectedDay.getDay() : null; // 1, 2, 3, 4, 5, 6, 7
  // Получаем расписание для выбранного дня
  const scheduleForDay = dayIndex !== null ? getScheduleForDay(dayIndex) : null;



  //------------------------------ закрашиваем свободные окошки зеленым-------------
  const getTileClassName = ({ date }) => {
    // Получаем день недели для выбранной даты
    const dayIndex = date.getDay();

    // Проверяем, есть ли расписание для выбранного дня
    if (salonInfo && salonInfo.schedule && salonInfo.schedule[dayIndex]) {
      return 'not-avaliable';
    } else {
      return 'avaliable';
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
          tileClassName={getTileClassName}
        />
        <Button type="button" buttonText={t("Back2")} to={-1} />
      </div>
    </div>
  );
}

export default MyCalendar;