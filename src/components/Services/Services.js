import React from "react";
import './Services.css';
import { Link } from "react-router-dom";

const Services = () => {
    return ( 
        <div className="services__container">
        <h1 className="services__header">Все салоны вашего региона:</h1>
        <div className="services__image-container">
          <img className="services__image" src="/images/Без названия.png" alt="Картинка"/>
        </div>
        <ul className="services__list">
          <li className="services__item"><Link to="">Кристина</Link></li>
          <li className="services__item"><Link to="">Ноготочки</Link></li>
          <li className="services__item"><Link to="">Nails</Link></li>
          <li className="services__item"><Link to="">Пилки</Link></li>
          <li className="services__item"><Link to="">Палки в колеса</Link></li>
        </ul>
      </div>
     );
}
 
export default Services;