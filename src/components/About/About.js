import React from "react";
import './About.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Api from '../../utils/Api';
import { useEffect, useState } from 'react';

const About = () => {
  const [version, setVersion] = useState('');
  const { t } = useTranslation();

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  function getCurrentVersion() {
    api
      .getVersionApp()
      .then((version) => {
        setVersion(version);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getCurrentVersion();
  }, []);

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