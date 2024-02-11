import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './ProfileGender.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import editIcon from '../../images/editIcon.svg';

const ProfileGender = ({ onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();

  const [editingGender, setEditingGender] = useState(false);
  const [genderData, setGenderData] = useState('');
  const [inputValueGender, setInputValueGender] = useState('');

  const handleEditClickGender = () => {
    setEditingGender(true);
    setInputValueGender(genderData);
  };

  const handleSaveClickGender = () => {
    setEditingGender(false);
    const inputData = {
      clientId: currentUser.clientId,
      clientGender: inputValueGender,
    };
    onEditProfile(inputData);
    setGenderData(inputValueGender);
  };

  const [isHoveredGender, setIsHoveredGender] = useState(false);

  const handleMouseEnterGender = () => {
    setIsHoveredGender(true);
  };

  const handleMouseLeaveGender = () => {
    setIsHoveredGender(false);
  };

  return (
    <div>
      {editingGender ? (
        <div className="container-input">
          <input type="radio" required className="profile_gender" id="m_gender" name="gender" value="Мужской" checked={inputValueGender === "Мужской"}
            onChange={(e) => setInputValueGender(e.target.value)} />
          <label className="radio_label" htmlFor="m_gender">{t("MaleGender")}</label><br />

          <input type="radio" className="profile_gender" id="f_gender" name="gender" required value="Женский" checked={inputValueGender === "Женский"}
            onChange={(e) => setInputValueGender(e.target.value)} />
          <label className="radio_label" htmlFor="f_gender">{t("FemaleGender")}</label><br />

          <input type="radio" className="profile_gender" id="o_gender" name="gender" required value="Другое" checked={inputValueGender === "Другое"}
            onChange={(e) => setInputValueGender(e.target.value)} />
          <label className="radio_label" htmlFor="o_gender">{t("OtherGender")}</label><br />

          <button onClick={handleSaveClickGender}>Сохранить</button>
        </div>
      ) : (
        <div className="edit-container-gender" onMouseEnter={handleMouseEnterGender} onMouseLeave={handleMouseLeaveGender}>
          <p id="userGender" className="gender_paragraph">{t("YourGender")}{currentUser.clientGender}</p>
          {isHoveredGender && (
            <button className="edit-icon"><img className="edit-icon-image" src={editIcon} alt="иконка" onClick={handleEditClickGender} /></button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileGender;