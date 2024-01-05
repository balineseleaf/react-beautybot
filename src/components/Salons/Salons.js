import React, { useState } from "react";
import './Salons.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Select from 'react-select'

const options = [{
  value: "turkey",
  label: "Turkey"
}, {
  value: "russia",
  label: "Russia"
}, {
  value: "germany",
  label: "Germany"
}, {
  value: "israel",
  label: "Israel"
}, {
  value: "korea",
  label: "Korea"
}, {
  value: "england",
  label: "England"
},];

const Salons = () => {
  const [currentCountry, setCurrentCountry] = useState('russia');
  const getValue = () => {
    return currentCountry ? options.find(c => c.value === currentCountry) : ''
  }
  const onChange = (newValue) => {
    setCurrentCountry(newValue.value)
  }
  const { t } = useTranslation();
  return (
    <div className="salons__container">
      <h1 className="salons__header">{t("AllSalons")}</h1>
      <p className="text">Choose ur country:</p>
      <Select className="" value={getValue()} onChange={onChange} options={options} />
    </div>
  );
}

export default Salons;