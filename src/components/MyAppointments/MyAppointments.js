import React from "react";
import './MyAppointments.css';
import { useTranslation } from 'react-i18next';


const MyAppointments = () => {

  const { t } = useTranslation();
  return (
    <div className="mynotes__container">
      <h1 className="mynotes__header">{t("MyFutureProcedures")}</h1>
      <p className="textwithoutnotes">{t("Story")}</p>
    </div>);
}

export default MyAppointments;