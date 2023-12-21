import React from "react";
import './About.css';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
    return ( 
        <div className="container__about">
          <div className="image__about-container">
            <img className="image__about" src="/images/Без названия.png" alt="картинка"/>
          </div>
          <p className="info">&#8520;{t("About")}
          </p>
      </div>
     );
}
 
export default About;