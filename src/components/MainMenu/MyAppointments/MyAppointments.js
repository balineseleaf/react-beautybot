import React from "react";
import './MyAppointments.css';
import { useTranslation } from 'react-i18next';
// import Button from '../../elements/Button/Button';

const MyAppointments = () => {
  const { t } = useTranslation();

  return (
    <div className="appointments">
      <h1 className="appointments__header">{t("MyFutureProcedures")}</h1>
      <div className="appointments__block">
        <p className="appointments__text">{t("Story")}</p>
      </div>
    </div>
  );
}

export default MyAppointments;