import React from "react";
import './About.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const About = ({ version }) => {

  const { t } = useTranslation();
  return (
    <div className="aboutus">
      <div className="aboutus__block">
        <p className="aboutus__info">&#8520;{t("About")} <span>{version}</span>{t("About2")}</p>
        <Link to="https://telegra.ph/Telegram-bot-dlya-zapisi-k-byuti-masteru-09-19" className="aboutus__link-instruction">Подробная инструкция</Link>
        <Link to={-1} className="aboutus__back-button">Назад</Link>
      </div>
    </div>
  );
}

export default About;