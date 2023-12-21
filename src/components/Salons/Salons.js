import React from "react";
import './Salons.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Salons = () => {
    const { t } = useTranslation();
    return ( 
        <div className="salons__container">
        <h1 className="salons__header">{t("AllSalons")}</h1>
        <div className="salons__image-container">
          <img className="salons__image" src="/images/Без названия.png" alt="картинка" />
        </div>
        <ul className="salons__list">
          <li className="salons__item"><Link to="#">Кристина</Link></li>
          <li className="salons__item"><Link to="#">Ноготочки</Link></li>
          <li className="salons__item"><Link to="#">Nails</Link></li>
          <li className="salons__item"><Link to="#">Пилки</Link></li>
          <li className="salons__item"><Link to="#">Палки в колеса</Link></li>
        </ul>
      </div>
     );
}
 
export default Salons;