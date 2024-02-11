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

  const handleEditClickPhone = () => {
    setEditingPhone(true);
    setInputValuePhone(phoneData);
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

  const [isHoveredPhone, setIsHoveredPhone] = useState(false);

  const handleMouseEnterPhone = () => {
    setIsHoveredPhone(true);
  };

  const handleMouseLeavePhone = () => {
    setIsHoveredPhone(false);
  };

  return (
    <div>
      {editingPhone ? (
        <div className="container-input">
          <input name="phone" className="whileediting-input" type="text" value={inputValuePhone} onChange={(e) => setInputValuePhone(e.target.value)} />
          <button onClick={handleSaveClickPhone}>Сохранить</button>
        </div>
      ) : (
        <div className="edit-container" onMouseEnter={handleMouseEnterPhone} onMouseLeave={handleMouseLeavePhone}>
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