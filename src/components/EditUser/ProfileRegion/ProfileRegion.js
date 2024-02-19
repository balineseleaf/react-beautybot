import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import './ProfileRegion.css';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import editIcon from '../../../images/editIcon.svg';
import Select from 'react-select';


const ProfileRegion = ({ onEditProfile, allRegions }) => {

  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();

  // кнопка состояния Сохранить у Регионов пользователя

  // Регионы и их состояния
  const [editingRegion, setEditingRegion] = useState(false);
  const [currentRegion, setCurrentRegion] = useState('');

  // Маппинг регионов и превращение их в норм внешний вид
  const regionToUidMapping = {};
  allRegions.forEach(region => {
    regionToUidMapping[region.regionName] = region.id;// имя и ему юайди
  });
  const regionNames = Object.keys(regionToUidMapping);
  // для Selector компонента нужен именно такой массив---------------------------------------------------------
  const transformedNamesArray = regionNames.map(cityName => {// в value будет значение uid от нашего региона 
    return {
      value: regionToUidMapping[cityName],
      label: t(cityName),
    };
  });

  // //Маппинг пришедшего региона пользователя из uid в строку 
  const [regionNameForUserInfo, setRegionNameForUserInfo] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const regionObject = transformedNamesArray.find(region => region.value === currentUser.regionId);
      const name = regionObject ? regionObject.label : '';
      setRegionNameForUserInfo(name);
    }, 50); // Таймаут -исправить надо, пока хз как!!!

    return () => clearTimeout(timeout); // Очищаем таймаут при размонтировании компонента
  }, [transformedNamesArray, currentUser.regionId]);

  const getValueRegion = () => {
    return currentRegion ? transformedNamesArray.find(region => region.value === currentRegion) : '';
  }

  const handleEditClickRegion = () => {
    setEditingRegion(true);
  };

  const handleSaveClickRegion = () => {
    const selectedRegion = transformedNamesArray.find(region => region.label === currentRegion);
    const inputData = {
      clientId: currentUser.clientId,
      regionId: selectedRegion.value
    };
    onEditProfile(inputData);
    setCurrentRegion(currentRegion);
    setEditingRegion(false);
  };

  const handleCancelClickRegion = () => {
    setEditingRegion(false);
  };

  const onChangeRegion = (newValue) => {
    if (newValue) {
      setCurrentRegion(newValue.label);
    } else {
      setCurrentRegion('');
    }
  }
  const isSaveButtonDisabled = !currentRegion;
  // const isSaveButtonDisabled = !currentRegion || (getValueRegion() && getValueRegion().label.trim() === '');

  const [isHoveredRegion, setIsHoveredRegion] = useState(false);

  const handleMouseEnterRegion = () => {
    setIsHoveredRegion(true);
  };

  const handleMouseLeaveRegion = () => {
    setIsHoveredRegion(false);
  };

  return (
    <div>
      {editingRegion ? (
        <div className="container-input-region">
          <Select placeholder="Выберите регион" className="profile__region" options={transformedNamesArray} value={getValueRegion()} onChange={onChangeRegion} />
          <div className="profile__block-buttons">
            <button className="profile__button-save-region" onClick={handleSaveClickRegion} disabled={isSaveButtonDisabled}>Сохранить</button>
            <button className="profile__button-cancel-region" onClick={handleCancelClickRegion}>Отмена</button>
          </div>
        </div>
      ) : (
        <div className="edit-container-region" onMouseEnter={handleMouseEnterRegion} onMouseLeave={handleMouseLeaveRegion}>
          <p id="userRegion" className="region_paragraph">Регион: {currentRegion ? currentRegion : regionNameForUserInfo}</p>
          {isHoveredRegion && (
            <button className="edit-icon"><img className="edit-icon-image" src={editIcon} alt="иконка" onClick={handleEditClickRegion} /></button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileRegion;