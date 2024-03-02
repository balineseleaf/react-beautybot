import "./AppointmentCalendar.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from "react";
import { isBefore } from 'date-fns';
import Api from "../../../utils/Api";
import { useNavigate, useLocation } from "react-router-dom";
import LeftArrowButton from '../../elements/LeftArrowButton/LeftArrowButton';

const AppointmentCalendar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [date, setDate] = useState(new Date());
  const [salonInfo, setSalonInfo] = useState([]);
  const location = useLocation(); // объект , где есть pathname и state  с нашими данными ,переданным по useNavigate

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    const salons = JSON.parse(localStorage.getItem('salonId'));
    const getSalonInfo = async function () {
      try {
        const avaliableSalon = [];
        for (const salon of salons) {
          const salonInfo = await api.getSalonInfo(salon.salonId);
          avaliableSalon.push(salonInfo);
        }
        setSalonInfo(avaliableSalon);
      } catch (error) {
        console.error("Error fetching salon info:", error);
      }
    }
    getSalonInfo();
  }, [])


  useEffect(() => {
    // Получаем расписание для выбранного дня
    if (selectedDay) {
      const dayIndex = selectedDay ? selectedDay.getDay() : null; // 1, 2, 3, 4, 5, 6, 7
      const scheduleForDay = dayIndex !== null ? getScheduleForDay(dayIndex) : null;
      if (scheduleForDay.length === 0) {
        return
      }
      const localDate = new Date(selectedDay.getTime() - selectedDay.getTimezoneOffset() * 60000); // Преобразование в локальное время
      navigate(`/schedule/${localDate.toISOString().split('T')[0]}`, { state: { salonSchedule: scheduleForDay } });
    }
  }, [selectedDay])


  const getScheduleForDay = (dayIndex) => { // возвращаем часы для выбранного дня
    // Преобразуем дни недели для объекта Date, чтобы они совпадали с вашими индексами
    if (dayIndex === 0) {
      dayIndex = 7;
    }
    const salonSchedule = [];
    for (const salon of salonInfo) {
      const salonScheduleHours = salon.schedule[dayIndex];
      for (const scheduleHour of salonScheduleHours) {
        if (!salonSchedule.includes(scheduleHour)) {
          salonSchedule.push(scheduleHour)
        }
      }
    }
    return salonSchedule;
  };


  // // ----------------------------работа с компонентом Calendar------------------------

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const onClickDay = async (value) => {
    setSelectedDay(value);
  };

  const tileDisabled = ({ date, view }) => {
    if (view !== 'month') {
      return false;
    }
    return isBefore(date, new Date());
  };

  return (
    <div className="appointmentcalendar">
      <div className="appointmentcalendar__container">
        <div className="appointmentcalendar__header-container">
          <h3 className="appointmentcalendar__header">Выберите свободную дату:</h3>
        </div>
        <Calendar
          className="appointmentcalendar__component"
          onChange={onChange}
          value={date}
          tileDisabled={tileDisabled}
          onClickDay={onClickDay}
        />
        <LeftArrowButton type="button" to={-1} />
      </div>
    </div>
  );
}

export default AppointmentCalendar;