import React, { useState } from "react";
import './Services.css';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const services= [{
  value: "nails", 
  label: "Nail Service" 
},{
  value: "eyelashes", 
  label: "Eyelashes" 
},{
  value: "brows", 
  label: "Brow Service" 
},{
  value: "sugaring", 
  label: "Sugaring" 
},];

const Services = () => {
  const navigate = useNavigate();

  const [currentService, setCurrentService] = useState('nails');
    const getValue = () => {
      return currentService ? services.find(c => c.value === currentService) : ''
    }
    const onChange = (newValue) => {
      setCurrentService(newValue.value)
    }
      //const selectedValue = newValue.value;
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
        <div className="services__container">
          <h1 className="services__header">Выберите категорию:</h1>
          <Select value={getValue()} onChange={onChange} options={services} />
          <button className="services__button-submit" onClick={handleRedirect}>Продолжить</button>
      </div>
     );
}
 
export default Services;