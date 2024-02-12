import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './ProfilePhone.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import editIcon from '../../images/editIcon.svg';

const ProfilePhone = ({ onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();
  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneData, setPhoneData] = useState('');
  const [inputValuePhone, setInputValuePhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);// validation

  const handleEditClickPhone = () => {
    setEditingPhone(true);
  };

  const handleSaveClickPhone = () => {
    setEditingPhone(false);
    const inputData = {
      clientId: currentUser.clientId,
      clientPhone: inputValuePhone,
    };
    onEditProfile(inputData);
    setPhoneData(inputValuePhone);
  };
  const handleCancelClickPhone = () => {
    setEditingPhone(false);
  };

  const [isHoveredPhone, setIsHoveredPhone] = useState(false);

  const handleMouseEnterPhone = () => {
    setIsHoveredPhone(true);
  };

  const handleMouseLeavePhone = () => {
    setIsHoveredPhone(false);
  };


  //validation--------------------------------------------------
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setInputValuePhone(value);
    setIsValidPhone(validatePhoneNumber(value));
  };

  return (
    <div>
      {editingPhone ? (
        <div className="container-input-phone">
          <input name="phone" className={`${!isValidPhone ? 'editing-input-phone invalid-phone' : 'editing-input-phone'}`} type="text" value={inputValuePhone} onChange={handlePhoneChange} />
          {!isValidPhone && <p className="error-message">Некорректный номер телефона</p>}
          <div className="profile__block-buttons">
            <button onClick={handleSaveClickPhone} disabled={!isValidPhone}>Сохранить</button>
            <button className="profile__button-cancel-region" onClick={handleCancelClickPhone}>Отмена</button>
          </div>
        </div>
      ) : (
        <div className="edit-container-phone" onMouseEnter={handleMouseEnterPhone} onMouseLeave={handleMouseLeavePhone}>
          <p id="userPhone" className="phone_paragraph">{t("YourNumber")}{currentUser.clientPhone}</p>
          {isHoveredPhone && (
            <button className="edit-icon"><img className="edit-icon-image" src={editIcon} alt="иконка" onClick={handleEditClickPhone} /></button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePhone;