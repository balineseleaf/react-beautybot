import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import './PriceList.css';
import { useTranslation } from 'react-i18next';
import Api from '../../../utils/Api';
import Preloader from "../../elements/Preloader/Preloader";
import leftArrow from "../../../images/leftArrow.svg";
import LeftArrowButton from '../../elements/LeftArrowButton/LeftArrowButton';

const Pricelist = () => {
  const { salonId } = useParams();
  const [salonInfo, setSalonInfo] = useState(null);
  const [procedurePrices, setProcedurePrices] = useState(new Map());
  const [procedureInfo, setProcedureInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(null);
  const { t } = useTranslation();

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    setLoadingTimeout(setTimeout(() => {
      setIsLoading(false);
    }, 10000));
    return () => clearTimeout(loadingTimeout);
  }, [salonInfo]);

  useEffect(() => {
    setIsLoading(true);
    const getSalonDetails = async () => {
      try {
        const salonInfo = await api.getSalonInfo(salonId);
        setSalonInfo(salonInfo)
        setProcedurePrices(new Map(Object.entries(salonInfo.procedurePrices)));
      } catch (error) {
        console.error("Error fetching salon info:", error);
      }
      finally {
        setIsLoading(false);
      };
    };

    getSalonDetails();
  }, [salonId]);


  useEffect(() => {
    // setIsLoading(true);
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
        <div>
          <h3 className="pricelist__header"><span className="pricelist__bold-header">Процедуры и цены салона:</span> {salonInfo && salonInfo.salonName}</h3>
          <div className="pricelist__container">
            {isLoading ? (<Preloader />) : (
              Array.from(procedurePrices.entries()).map(([procedureId, { price, duration }]) => (
                <div key={procedureId} className="pricelist__procedure">
                  <p className="pricelist__procedure-info">{procedureMapFromIdToName[procedureId]} ({price}р / {duration}ч)</p>
                </div>
              ))
            )}
            {!isLoading && procedurePrices.size === 0 && <p className="salons__item notfound">Салонов в вашем регионе не найдено</p>}
          </div>

        </div>
      </div>
      <LeftArrowButton alt="стрелка влево" type="button" src={leftArrow} to={-1} />
    </div>
  );
}

export default Pricelist;