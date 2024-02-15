import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './PriceList.css';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Api from '../../utils/Api';

const Pricelist = () => {
  const { salonId } = useParams();

  // const [salonInfo, setSalonInfo] = useState(null);

  // const api = new Api({
  //   url: 'http://localhost:5000',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });


  // useEffect(() => {
  //   const getSalonDetails = async () => {
  //     try {
  //       const salonInfo = await api.getSalonInfo(salonId);
  //       setSalonInfo(salonInfo);
  //     } catch (error) {
  //       console.error("Error fetching salon info:", error);
  //     }
  //   };

  //   getSalonDetails();
  // }, [salonId]);


  return (
    <div className="pricelist">
      <div className="pricelist__block">
        <div className="pricelist__header">Процедуры и цены салона</div>
        <Link to="/salons" className="pricelist__back-button">Назад</Link>
      </div>
    </div>);
}

export default Pricelist;