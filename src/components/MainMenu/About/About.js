import React from "react";
import './About.css';
import { useTranslation } from 'react-i18next';
import Api from '../../../utils/Api';
import { useEffect, useState } from 'react';
import Button from '../../elements/Button/Button';

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
        <div className="aboutus__button-block">
          <Button type="button" buttonText="Подробная инструкция" to="https://telegra.ph/Telegram-bot-dlya-zapisi-k-byuti-masteru-09-19" />
          <Button type="button" buttonText={t("Back2")} to={-1} />
        </div>
      </div>
    </div>
  );
}

export default About;