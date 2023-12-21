import React from "react";
import './MyNotes.css';
import { useTranslation } from 'react-i18next';


const MyNotes = () => {

  const { t } = useTranslation();
    return (     
    <div className="mynotes__container">
    <h1 className="mynotes__header">{t("MyFutureProcedures")}</h1>
    <div className="mynotes__image-container">
      <img className="mynotes__image" src="/images/Без названия.png" alt ="картинка"/>
    </div>
    <p className="textwithoutnotes">{t("Story")}</p>
  </div> );
}
 
export default MyNotes;