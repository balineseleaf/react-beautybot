import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './ProfileName.css';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import editIcon from '../../../images/editIcon.svg';
import CancelButton from "../../elements/CancelButton/CancelButton";
import SaveButton from "../../elements/SaveButton/SaveButton";
import EditButton from "../../elements/EditButton/EditButton";

const ProfileName = ({ onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();
  const [editingName, setEditingName] = useState(false);
  const [nameData, setNameData] = useState('');
  const [inputValueName, setInputValueName] = useState('');
  const [isValidName, setIsValidName] = useState(true);// validation

  const handleEditClickName = () => {
    setEditingName(true);
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


  //validation--------------------------------------------------
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Zа-яА-Я ,.'-]+$/;
    return nameRegex.test(name);
  };
  const handleNameChange = (e) => {
    const { value } = e.target;
    setInputValueName(value);
    setIsValidName(validateName(value));
  };

  return (
    <div>
      {editingName ? (
        <div className="container-input-name">
          <input placeholder="Введите ваше имя" name="name" className={`${!isValidName ? 'editing-input-name invalid-name' : 'editing-input-name'}`} type="text" value={inputValueName} onChange={handleNameChange} />
          {!isValidName && <p className="error-message">Некорректное имя</p>}
          <div className="profile__block-buttons">
            {/* <button onClick={handleSaveClickName} disabled={!isValidName || inputValueName.trim() === ''}>Сохранить</button> */}
            <SaveButton onClick={handleSaveClickName} disabled={!isValidName || inputValueName.trim() === ''} />
            <CancelButton onClick={handleCancelClickRegion} />
          </div>
        </div>
      ) : (
        <div className="edit-container-name" onMouseEnter={handleMouseEnterName} onMouseLeave={handleMouseLeaveName}>
          <p id="userName" className="name_paragraph">{t("YourName")}{currentUser.clientName}</p>
          {isHoveredName && (
            <EditButton onClick={handleEditClickName} />
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileName;