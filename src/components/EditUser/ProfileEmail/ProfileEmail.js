import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './ProfileEmail.css';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import editIcon from '../../../images/editIcon.svg';

const ProfileEmail = ({ onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();
  const [editingEmail, setEditingEmail] = useState(false);
  const [emailData, setEmailData] = useState('');
  const [inputValueEmail, setInputValueEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); //validation state

  const handleEditClickEmail = () => {
    setEditingEmail(true);
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


  // validation-----------------------------------------------
  const validateEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setInputValueEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  return (
    <div>
      {editingEmail ? (
        <div className="container-input-email">
          <input placeholder="Введите ваш email" name="email" className={`${!isValidEmail ? 'editing-input-email invalid-email' : 'editing-input-email'}`} type="email" value={inputValueEmail} onChange={handleEmailChange} />
          {(!isValidEmail && inputValueEmail.trim() !== '') && < p className="error-message">Некорректный email адрес</p>}
          <div className="profile__block-buttons">
            <button onClick={handleSaveClickEmail} disabled={!isValidEmail || inputValueEmail.trim() === ''}>Сохранить</button>
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
      )
      }
    </div >
  );
}

export default ProfileEmail;