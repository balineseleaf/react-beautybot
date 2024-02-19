import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './PriceList.css';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Api from '../../utils/Api';

const Pricelist = () => {
  const { salonId } = useParams();

  const [salonInfo, setSalonInfo] = useState(null);
  const [procedurePrices, setProcedurePrices] = useState(new Map());

  // console.log(procedurePrices);
  const [procedureInfo, setProcedureInfo] = useState(null);
  const { t } = useTranslation();

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    const getSalonDetails = async () => {
      try {
        const salonInfo = await api.getSalonInfo(salonId);
        setSalonInfo(salonInfo)
        setProcedurePrices(new Map(Object.entries(salonInfo.procedurePrices)));
      } catch (error) {
        console.error("Error fetching salon info:", error);
      }
    };

    getSalonDetails();
  }, [salonId]);


  useEffect(() => {
    const getProcedureInformation = async () => {
      try {
        const procedureInfo = await api.getProcedureInfo(salonId);
        setProcedureInfo(procedureInfo);
      } catch (error) {
        console.error("Error fetching procedure info:", error);
      }
    };

    getProcedureInformation();
  }, [salonId]);


  //----------------------Mapping--------------------
  const procedureMapFromIdToName = {};

  procedureInfo && procedureInfo.forEach(procedure => {
    procedureMapFromIdToName[procedure.procedureId] = t(procedure.procedureName);
  });

  return (
    <div className="pricelist">
      <div className="pricelist__block">
        <h3 className="pricelist__header"><span className="pricelist__bold-header">Процедуры и цены салона:</span> {salonInfo && salonInfo.salonName}</h3>
        <div className="pricelist__container">
          {Array.from(procedurePrices.entries()).map(([procedureId, { price, duration }]) => (
            <div key={procedureId} className="pricelist__procedure">
              <p>{procedureMapFromIdToName[procedureId]} ({price}р / {duration}ч)</p>
            </div>
          ))}
        </div>
        <Link to={-1} className="pricelist__back-button">Назад</Link>
      </div>
    </div>);
}

export default Pricelist;