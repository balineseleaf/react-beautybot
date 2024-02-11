import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './ProfileEmail.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import editIcon from '../../images/editIcon.svg';

const ProfileEmail = ({ onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailData, setEmailData] = useState('');
  const [inputValueEmail, setInputValueEmail] = useState('');

  const handleEditClickEmail = () => {
    setEditingEmail(true);
    setInputValueEmail(emailData);
  };

  const handleSaveClickEmail = () => {
    setEditingEmail(false);
    const inputData = {
      clientId: currentUser.clientId,
      clientEmail: inputValueEmail,
    };
    onEditProfile(inputData);
    setEmailData(inputValueEmail);
  };
  const handleCancelClickEmail = () => {
    setEditingEmail(false);
  };

  const [isHoveredEmail, setIsHoveredEmail] = useState(false);
  const handleMouseEnterEmail = () => {
    setIsHoveredEmail(true);
  };

  const handleMouseLeaveEmail = () => {
    setIsHoveredEmail(false);
  };

  return (
    <div>
      {editingEmail ? (
        <div className="container-input-email">
          <input name="email" className="editing-input-email" type="email" value={inputValueEmail} onChange={(e) => setInputValueEmail(e.target.value)} />
          <div className="profile__block-buttons">
            <button onClick={handleSaveClickEmail}>Сохранить</button>
            <button className="profile__button-cancel-region" onClick={handleCancelClickEmail}>Отмена</button>
          </div>
        </div>
      ) : (
        <div className="edit-container-email" onMouseEnter={handleMouseEnterEmail} onMouseLeave={handleMouseLeaveEmail}>
          <p id="userEmail" className="email_paragraph">{t("YourEmail")}{currentUser.clientEmail}</p>
          {isHoveredEmail && (
            <button className="edit-icon"><img className="edit-icon-image" src={editIcon} alt="иконка" onClick={handleEditClickEmail} /></button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileEmail;