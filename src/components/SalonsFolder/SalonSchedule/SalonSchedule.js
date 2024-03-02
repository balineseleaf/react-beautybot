import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SalonSchedule.css';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Api from '../../../utils/Api';
import { useLocation } from 'react-router-dom';
import { CurrentSalonContext } from '../../../context/CurrentSalonContext';
import leftArrow from "../../../images/leftArrow.svg";
import LeftArrowButton from '../../elements/LeftArrowButton/LeftArrowButton';


const SalonSchedule = () => {
  // const salons = React.useContext(CurrentSalonContext);
  // console.log('112', salons.salonId);
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
    const getSalonInfo = async function () {
      try {
        const salonInfo = await api.getSalonInfo(salonId);
        setSalonInfo(salonInfo);
      } catch (error) {
        console.error("Error fetching salon info:", error);
      }
    }
    getSalonInfo();
  }, [])

  // ----------------------------работа с компонентом Calendar------------------------

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const onClickDay = async (value) => {
    setSelectedDay(value);
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
    let dayIndex = date.getDay();
    if (dayIndex === 0) {
      dayIndex = 7;
    }
    // Проверяем, есть ли расписание для выбранного дня
    if (salonInfo && salonInfo.schedule && salonInfo.schedule[dayIndex]) {
      return 'avaliable';
    } else {
      return 'not-avaliable';
    }
  };

  useEffect(() => {
    if (scheduleForDay && selectedDay) {
      const localDate = new Date(selectedDay.getTime() - selectedDay.getTimezoneOffset() * 60000); // Преобразование в локальное время
      navigate(`/schedule/${localDate.toISOString().split('T')[0]}`, { state: { salonSchedule: scheduleForDay } });
    }
  }, [selectedDay])

  return (
    <div className="salonschedule">
      <div className="salonschedule__header-container">
        <h3 className="salonschedule__header">Расписание салона </h3>
      </div>
      <div className="salonschedule__calendar-container">
        <Calendar
          className="salonschedule__component"
          onChange={onChange}
          value={date}
          onClickDay={onClickDay}
          tileClassName={getTileClassName}
        />
      </div>
      {/* <p className="salonschedule__hint">Для записи к мастеру, пожалуйста, нажмите кнопку "Новая запись" или перейдите в раздел "Цены".</p> */}
      <LeftArrowButton alt="стрелка влево" type="button" src={leftArrow} to={-1} />
    </div>
  );
}

export default SalonSchedule;