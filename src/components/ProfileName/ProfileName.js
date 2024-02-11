import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './ProfileName.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import editIcon from '../../images/editIcon.svg';

const ProfileName = ({ onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();
  const [editingName, setEditingName] = useState(false);
  const [nameData, setNameData] = useState('');
  const [inputValueName, setInputValueName] = useState('');

  const handleEditClickName = () => {
    setEditingName(true);
    setInputValueName(nameData);
  };

  const handleSaveClickName = () => {
    setNameData(inputValueName);
    const inputData = {
      clientId: currentUser.clientId,
      clientName: inputValueName,
    };
    onEditProfile(inputData);
    setEditingName(false);
  };

  const handleCancelClickRegion = () => {
    setEditingName(false);
  };

  const [isHoveredName, setIsHoveredName] = useState(false);

  const handleMouseEnterName = () => {
    setIsHoveredName(true);
  };
  const handleMouseLeaveName = () => {
    setIsHoveredName(false);
  };

  return (
    <div>
      {editingName ? (
        <div className="container-input-name">
          <input name="name" className="editing-input-name" type="text" value={inputValueName} onChange={(e) => setInputValueName(e.target.value)} />
          <div className="profile__block-buttons">
            <button onClick={handleSaveClickName}>Сохранить</button>
            <button className="profile__button-cancel-region" onClick={handleCancelClickRegion}>Отмена</button>
          </div>
        </div>
      ) : (
        <div className="edit-container-name" onMouseEnter={handleMouseEnterName} onMouseLeave={handleMouseLeaveName}>
          <p id="userName" className="name_paragraph">{t("YourName")}{currentUser.clientName}</p>
          {isHoveredName && (
            <button className="edit-icon"><img className="edit-icon-image" src={editIcon} alt="иконка" onClick={handleEditClickName} /></button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileName;