import React from "react";
import { useEffect, useState } from "react";
import './Preprofile.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import editIcon from '../../images/editIcon.svg';
import Select from 'react-select';
import { countries, regions } from "../../utils/constants";


const Preprofile = ({ getInfo, onEditProfile }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();


  //let tg = window.Telegram.WebApp; // создаем объект телеграмма
  //console.log(tg.initDataUnsafe.user.id);
  // tg.BackButton.show();
  // tg.onEvent('backButtonClicked', function () {
  // window.location.href = '/';
  // tg.BackButton.hide();
  // });

  const [editingRegion, setEditingRegion] = useState(false);
  //const [regionData, setRegionData] = useState('saint-petersburg');
  const [currentRegion, setCurrentRegion] = useState('saint-petersburg');
  const [currentCountry, setCurrentCountry] = useState('russia');
  //const [inputValueRegion, setInputValueRegion] = useState('');
  //const [inputValueCountry, setInputValueCountry] = useState('');

  const getValueRegion = () => {
    return currentRegion ? regions.find(c => c.value === currentRegion) : ''
  }
  const getValueCountry = () => {
    return currentCountry ? countries.find(c => c.value === currentCountry) : ''
  }

  const handleEditClickRegion = () => {
    setEditingRegion(true);
    setCurrentRegion(currentRegion);
    setCurrentCountry(currentCountry);
  };

  const handleSaveClickRegion = () => {
    setEditingRegion(false);
    setCurrentRegion(currentRegion);
    setCurrentCountry(currentCountry);
  };

  const onChangeRegion = (newValue) => {
    setCurrentRegion(newValue.value)
  }

  const onChangeCountry = (newValue) => {
    setCurrentCountry(newValue.value)
  }

  const [editingName, setEditingName] = useState(false);
  const [nameData, setNameData] = useState('');
  const [inputValueName, setInputValueName] = useState('');

  const handleEditClickName = () => {
    setEditingName(true);
    setInputValueName(nameData);
  };

  const handleSaveClickName = () => {
    setNameData(inputValueName);
    const formData = {
      clientName: inputValueName,
    };
    onEditProfile(formData);
    setEditingName(false);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneData, setPhoneData] = useState('');
  const [inputValuePhone, setInputValuePhone] = useState('');

  const handleEditClickPhone = () => {
    setEditingPhone(true);
    setInputValuePhone(phoneData);
  };

  const handleSaveClickPhone = () => {
    setEditingPhone(false);
    setPhoneData(inputValuePhone);
  };

  const [editingEmail, setEditingEmail] = useState(false);
  const [emailData, setEmailData] = useState('');
  const [inputValueEmail, setInputValueEmail] = useState('');

  const handleEditClickEmail = () => {
    setEditingEmail(true);
    setInputValueEmail(emailData);
  };

  const handleSaveClickEmail = () => {
    setEditingEmail(false);
    setEmailData(inputValueEmail);
  };

  const [editingGender, setEditingGender] = useState(false);
  const [genderData, setGenderData] = useState('');
  const [inputValueGender, setInputValueGender] = useState('');

  const handleEditClickGender = () => {
    setEditingGender(true);
    setInputValueGender(genderData);
  };

  const handleSaveClickGender = () => {
    setEditingGender(false);
    setGenderData(inputValueGender);
  };

  const [isHoveredName, setIsHoveredName] = useState(false);
  const [isHoveredEmail, setIsHoveredEmail] = useState(false);
  const [isHoveredGender, setIsHoveredGender] = useState(false);
  const [isHoveredPhone, setIsHoveredPhone] = useState(false);
  const [isHoveredRegion, setIsHoveredRegion] = useState(false);

  const handleMouseEnterName = () => {
    setIsHoveredName(true);
  };
  const handleMouseEnterEmail = () => {
    setIsHoveredEmail(true);
  };
  const handleMouseEnterPhone = () => {
    setIsHoveredPhone(true);
  };
  const handleMouseEnterGender = () => {
    setIsHoveredGender(true);
  };
  const handleMouseEnterRegion = () => {
    setIsHoveredRegion(true);
  };

  const handleMouseLeaveName = () => {
    setIsHoveredName(false);
  };
  const handleMouseLeaveEmail = () => {
    setIsHoveredEmail(false);
  };
  const handleMouseLeavePhone = () => {
    setIsHoveredPhone(false);
  };
  const handleMouseLeaveGender = () => {
    setIsHoveredGender(false);
  };
  const handleMouseLeaveRegion = () => {
    setIsHoveredRegion(false);
  };

  return (
    <div className="popup popup_opened popup_type_edit-avatar" id="popup">
      <div className="popup__container">
        <h2 className="popup__header">{t("MyData")}</h2>
        <div
          id="formEditProfile"
          name="form-edit-profile"
          className="popup__form popup__form_edit-profile"
        >
          <div className="preprofile__fieldset">
            <p id="userID" className="id_paragraph">{t("YourID")}{currentUser.clientId}</p>
            <div>
              {editingName ? (
                <div className="container-input">
                  <input
                    name="name"
                    className="whileediting-input"
                    type="text"
                    value={inputValueName}
                    onChange={(e) => setInputValueName(e.target.value)}
                  />
                  <button onClick={handleSaveClickName}>Сохранить</button>
                </div>
              ) : (
                <div className="edit-container" onMouseEnter={handleMouseEnterName} onMouseLeave={handleMouseLeaveName}>
                  <p id="userName" className="name_paragraph">{t("YourName")}{currentUser.clientName}</p>
                  {isHoveredName && (
                    <button className="edit-icon"><img className="edit-icon-image" src={editIcon} alt="иконка" onClick={handleEditClickName} /></button>
                  )}
                </div>
              )}
            </div>

            <div>
              {editingGender ? (
                <div className="container-input">
                  {/* <input
                                name="name"
                                className="whileediting-input"
                                type="text"
                                value={inputValueName}
                                onChange={(e) => setInputValueName(e.target.value)}
                            /> */}
                  <input
                    type="radio"
                    required
                    className="profile_gender"
                    id="m_gender"
                    name="gender"
                    value="male"
                    checked={inputValueGender === "male"}
                    onChange={(e) => setInputValueGender(e.target.value)}
                  />
                  <label className="radio_label" htmlFor="m_gender">{t("MaleGender")}</label><br />
                  <input
                    type="radio"
                    className="profile_gender"
                    id="f_gender"
                    name="gender"
                    required
                    value="female"
                    checked={inputValueGender === "female"}
                    onChange={(e) => setInputValueGender(e.target.value)}
                  />
                  <label className="radio_label" htmlFor="f_gender">{t("FemaleGender")}</label><br />
                  <input
                    type="radio"
                    className="profile_gender"
                    id="o_gender"
                    name="gender"
                    required
                    value="other"
                    checked={inputValueGender === "other"}
                    onChange={(e) => setInputValueGender(e.target.value)}
                  />
                  <label className="radio_label" htmlFor="o_gender">{t("OtherGender")}</label><br />
                  <button onClick={handleSaveClickGender}>Сохранить</button>
                </div>
              ) : (
                <div className="edit-container" onMouseEnter={handleMouseEnterGender} onMouseLeave={handleMouseLeaveGender}>
                  <p id="userGender" className="gender_paragraph">{t("YourGender")}{currentUser.clientGender}</p>
                  {isHoveredGender && (
                    <button className="edit-icon"><img className="edit-icon-image" src={editIcon} alt="иконка" onClick={handleEditClickGender} /></button>
                  )}
                </div>
              )}
            </div>

            <div>
              {editingPhone ? (
                <div className="container-input">
                  <input
                    name="phone"
                    className="whileediting-input"
                    type="text"
                    value={inputValuePhone}
                    onChange={(e) => setInputValuePhone(e.target.value)}
                  />
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

            <div>
              {editingEmail ? (
                <div className="container-input">
                  <input
                    name="email"
                    className="whileediting-input"
                    type="email"
                    value={inputValuePhone}
                    onChange={(e) => setInputValueEmail(e.target.value)}
                  />
                  <button onClick={handleSaveClickEmail}>Сохранить</button>
                </div>
              ) : (
                <div className="edit-container" onMouseEnter={handleMouseEnterEmail} onMouseLeave={handleMouseLeaveEmail}>
                  <p id="userEmail" className="email_paragraph">{t("YourEmail")}{currentUser.clientEmail}</p>
                  {isHoveredEmail && (
                    <button className="edit-icon"><img className="edit-icon-image" src={editIcon} alt="иконка" onClick={handleEditClickEmail} /></button>
                  )}
                </div>
              )}
            </div>

            <div>
              {editingRegion ? (
                <div className="container-input">
                  <Select className="profile__region" options={countries} value={getValueCountry()} onChange={onChangeCountry} />
                  <Select className="profile__region" options={regions} value={getValueRegion()} onChange={onChangeRegion} />
                  <button className="profile__button-save-region" onClick={handleSaveClickRegion}>Сохранить</button>
                </div>
              ) : (
                <div className="edit-container" onMouseEnter={handleMouseEnterRegion} onMouseLeave={handleMouseLeaveRegion}>
                  <p id="userRegion" className="region_paragraph">Регион: {currentUser.regionId}</p>
                  {isHoveredRegion && (
                    <button className="edit-icon"><img className="edit-icon-image" src={editIcon} alt="иконка" onClick={handleEditClickRegion} /></button>
                  )}
                </div>
              )}
            </div>

          </div>
          <Link
            to="/"
            className="profile__edit-button">{t("Back")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Preprofile;