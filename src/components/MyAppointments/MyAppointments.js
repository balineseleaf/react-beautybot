import React from "react";
import './MyAppointments.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MyAppointments = () => {
  const { t } = useTranslation();

  return (
    <div className="appointments">
      <h1 className="appointments__header">{t("MyFutureProcedures")}</h1>
      <div className="appointments__block">
        <p className="appointments__text">{t("Story")}</p>
        <Link to="/" className="appointments__back-button">{t("Back2")}</Link>
      </div>
    </div>);
}

export default MyAppointments;