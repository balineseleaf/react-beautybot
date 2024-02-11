import React from "react";
import './About.css';
import { useTranslation } from 'react-i18next';

const About = ({ version }) => {

  const { t } = useTranslation();
  return (
    <div className="about">
      <div className="about__block">
        <p className="about__info">&#8520;{t("About")} <span>{version}</span>{t("About2")}</p>
      </div>
    </div>
  );
}

export default About;