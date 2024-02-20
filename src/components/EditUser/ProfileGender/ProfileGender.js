import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import './ProfileGender.css';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import editIcon from '../../../images/editIcon.svg';
import CancelButton from "../../elements/CancelButton/CancelButton";
import SaveButton from "../../elements/SaveButton/SaveButton";
import EditButton from "../../elements/EditButton/EditButton";

const ProfileGender = ({ onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();

  const [editingGender, setEditingGender] = useState(false);
  const [genderData, setGenderData] = useState('');
  const [inputValueGender, setInputValueGender] = useState('');
  const [isAnyOptionSelected, setIsAnyOptionSelected] = useState(false);

  useEffect(() => {
    setIsAnyOptionSelected(inputValueGender !== '');
  }, [inputValueGender]);

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
  const handleCancelClickGender = () => {
    setEditingGender(false);
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
        <>
          <div className="container-input-gender">
            <input type="radio" required className="profile_gender" id="m_gender" name="gender" value="Мужской" checked={inputValueGender === "Мужской"}
              onChange={(e) => setInputValueGender(e.target.value)} />
            <label className="radio_label" htmlFor="m_gender">{t("MaleGender")}</label><br />

            <input type="radio" className="profile_gender" id="f_gender" name="gender" required value="Женский" checked={inputValueGender === "Женский"}
              onChange={(e) => setInputValueGender(e.target.value)} />
            <label className="radio_label" htmlFor="f_gender">{t("FemaleGender")}</label><br />

            <input type="radio" className="profile_gender" id="o_gender" name="gender" required value="Другое" checked={inputValueGender === "Другое"}
              onChange={(e) => setInputValueGender(e.target.value)} />
            <label className="radio_label" htmlFor="o_gender">{t("OtherGender")}</label><br />

          </div>
          <div className="profile__block-buttons">
            {/* <button onClick={handleSaveClickGender} disabled={!isAnyOptionSelected}>Сохранить</button> */}
            <SaveButton onClick={handleSaveClickGender} disabled={!isAnyOptionSelected} />
            <CancelButton onClick={handleCancelClickGender} />
          </div>
        </>
      ) : (
        <div className="edit-container-gender" onMouseEnter={handleMouseEnterGender} onMouseLeave={handleMouseLeaveGender}>
          <p id="userGender" className="gender_paragraph">{t("YourGender")}{currentUser.clientGender}</p>
          {isHoveredGender && (
            <EditButton onClick={handleEditClickGender} />
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileGender;