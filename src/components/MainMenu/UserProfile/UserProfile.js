import React from "react";
import './UserProfile.css';
import { useTranslation } from 'react-i18next';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import ProfileName from "../../EditUser/ProfileName/ProfileName";
import ProfileEmail from "../../EditUser/ProfileEmail/ProfileEmail";
import ProfilePhone from "../../EditUser/ProfilePhone/ProfilePhone";
import ProfileGender from "../../EditUser/ProfileGender/ProfileGender";
import ProfileRegion from "../../EditUser/ProfileRegion/ProfileRegion";
import leftArrow from "../../../images/leftArrow.svg";
import LeftArrowButton from "../../elements/LeftArrowButton/LeftArrowButton";

const UserProfile = ({ onEditProfile, allRegions }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();


  return (
    <div className="userprofile">
      <div className="userprofile__block">
        <div className="userprofile__header-container">
          <h3 className="userprofile__header">{t("MyData")}</h3>
        </div>
        <form autoComplete="off" name="form-edit-profile" className="userprofile__form">
          <div className="userprofile__fieldset">
            <p className="paragraph-id">{t("YourID")}{currentUser.clientId}</p>
            <ProfileName onEditProfile={onEditProfile} />
            <ProfilePhone onEditProfile={onEditProfile} />
            <ProfileGender onEditProfile={onEditProfile} />
            <ProfileEmail onEditProfile={onEditProfile} />
            <ProfileRegion onEditProfile={onEditProfile} allRegions={allRegions} />
          </div>
        </form>
        <LeftArrowButton alt="стрелка влево" type="button" src={leftArrow} to="/" />
      </div>
    </div>
  );
}

export default UserProfile;