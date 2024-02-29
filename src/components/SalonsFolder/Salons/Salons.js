import React, { useState, useEffect } from "react";
import './Salons.css';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Api from '../../../utils/Api';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import Button from '../../elements/Button/Button';
import Preloader from '../../elements/Preloader/Preloader';

const Salons = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [salons, setSalons] = useState([]);
  const [salonInfo, setSalonInfo] = useState(null);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(null);

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (currentUser && currentUser.regionId) {
      getSalonsByRegionForCurrentUser();
    }
  }, [currentUser]);

  useEffect(() => {
    setLoadingTimeout(setTimeout(() => {
      setIsLoading(false);
    }, 10000));
    return () => clearTimeout(loadingTimeout);
  }, [salons]);


  function getSalonsByRegionForCurrentUser() {
    setIsLoading(true);
    return api
      .getAllSalonsInRegion(currentUser.regionId)
      .then((salons) => {
        setSalons(salons);
        salons.forEach(salon => {
          getSalonDetails(salon.salonId);
        });

      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function getSalonDetails(salonId) {
    try {
      const salonInfo = await api.getSalonInfo(salonId);
      setSalonInfo(salonInfo);
    } catch (error) {
      console.error("Error fetching salon info:", error);
    }
  }

  return (
    <div className="salons">
      <div className="salons__block">
        <div className="salonsafterfilter__header-container">
          <h2 className="salons__header">{t("AllSalons")}</h2>
        </div>
        <div className="salons__container">
          {/* <Preloader /> */}
          {isLoading ? (<Preloader />) : (
            salons.length > 0 ? (
              <ul className="salons__list">
                {salons.map((salon) => (
                  <li key={salon.salonId} className="salons__item">
                    <Link to={`/salons/${salon.salonId}`} className="salons__card">
                      {salon.salonName} {`${salon.salonRate !== null ? salon.salonRate : ''}`}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : <p className="salons__item notfound">Салонов в вашем регионе не найдено</p>
          )}
        </div>
      </div>
    </div >
  );
}

export default Salons;