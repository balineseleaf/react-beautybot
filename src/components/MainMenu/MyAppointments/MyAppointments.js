import React from "react";
import './MyAppointments.css';
import { useTranslation } from 'react-i18next';
// import Button from '../../elements/Button/Button';

const MyAppointments = () => {
  const { t } = useTranslation();

  return (
    <div className="myappointments">
      <div className="myappointments__header-container">
        <h1 className="myappointments__header">{t("MyFutureProcedures")}</h1>
      </div>
      <div className="myappointments__block">
        <p className="myappointments__text">{t("Story")}</p>
      </div>
    </div>
  );
}

export default MyAppointments;