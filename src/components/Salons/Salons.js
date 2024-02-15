import React, { useState, useEffect } from "react";
import './Salons.css';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import Api from '../../utils/Api';
import { useParams } from "react-router-dom";
import { CurrentUserContext } from '../../context/CurrentUserContext';

const Salons = () => {
  const { salonId } = useParams();
  const currentUser = React.useContext(CurrentUserContext);
  const [salons, setSalons] = useState([]);
  const [salonInfo, setSalonInfo] = useState(null);
  const { t } = useTranslation();


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


  function getSalonsByRegionForCurrentUser() {
    return api
      .getAllSalonsInRegion(currentUser.regionId)
      .then((salons) => {
        setSalons(salons);
        salons.forEach(salon => {
          getSalonDetails(salon.salonId);
        });
      })
      .catch((error) => console.log(error));
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
      <h2 className="salons__header">{t("AllSalons")}</h2>
      <div className="salons__block">

        {salons.length > 0 ? (
          <ul className="salons__list">
            {salons.map((salon) => (
              <li className="salons__item" key={salon.salonId}>
                <Link className="salons__card" to={`/salons/${salon.salonId}`}>{salon.salonName}</Link>
              </li>
            ))}
          </ul>
        ) : <p className="salon__item notfound">Салонов в вашем регионе не найдено</p>}
        <Link to="/" className="salons__back-button">{t("Back")}</Link>
      </div>
    </div>
  );
}

export default Salons;