import "./AppointmentCalendar.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from "react";
import { isBefore } from 'date-fns';
import Api from "../../../utils/Api";
import { useNavigate, useLocation } from "react-router-dom";
import { CurrentSalonContext } from '../../../context/CurrentSalonContext';
import leftArrow from "../../../images/leftArrow.svg";
import LeftArrowButton from '../../elements/LeftArrowButton/LeftArrowButton';

const AppointmentCalendar = () => {
  // const salons = React.useContext(CurrentSalonContext);
  // console.log('1', salons.salonId);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [date, setDate] = useState(new Date());
  const [salonInfo, setSalonInfo] = useState(null);
  const location = useLocation(); // объект , где есть pathname и state  с нашими данными ,переданным по useNavigate
  // const { salonId } = location.state;
  // console.log(location);

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

  // ------------ работаем с полем schedule  чтобы он понимал дни недели--------------------

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

  // // ----------------------------работа с компонентом Calendar------------------------

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // const onClickDay = async (value) => {
  //   try {
  //     const salonInfo = await api.getSalonInfo(salonId);
  //     setSelectedDay(value);
  //     setSalonInfo(salonInfo);
  //   } catch (error) {
  //     console.error("Error fetching salon info:", error);
  //   }
  // };

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
        // onClickDay={onClickDay}
        />
        <LeftArrowButton alt="стрелка влево" type="button" src={leftArrow} to={-1} />
      </div>
    </div>
  );
}

export default AppointmentCalendar;