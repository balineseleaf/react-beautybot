import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './NewAppointment.css';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';



const NewAppointment = () => {
  const navigate = useNavigate();

  const [currentService, setCurrentService] = useState('nails');

  const services = [{
    value: "nails",
    label: "Nail Service"
  }, {
    value: "eyelashes",
    label: "Eyelashes"
  }, {
    value: "brows",
    label: "Brow Service"
  }, {
    value: "sugaring",
    label: "Sugaring"
  },];

  const getValue = () => {
    return currentService ? services.find(c => c.value === currentService) : ''
  }
  const onChange = (newValue) => {
    setCurrentService(newValue.value)
  }
  const handleRedirect = () => {
    switch (currentService) {
      case 'nails':
        navigate("/nails");
        break;
      case 'eyelashes':
        navigate("/eyelashes");
        break;
      case 'brows':
        navigate("/brows");
        break;
      case 'sugaring':
        navigate("/sugaring");
        break;
      default:
        navigate("/"); // Редирект на главную или другую страницу по умолчанию
        break;
    }
  }
  return (
    <div className="newappointment">
      <div className="newappointment__block"> </div>
      <h1 className="newappointment__header">Выберите категорию:</h1>
      <Select value={getValue()} onChange={onChange} options={services} />
      <button className="newappointment__button-submit" onClick={handleRedirect}>Продолжить</button>
    </div>);
}

export default NewAppointment;