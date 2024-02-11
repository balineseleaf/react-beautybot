import React from "react";
import './UserProfile.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import ProfileName from "../ProfileName/ProfileName";
import ProfileEmail from "../ProfileEmail/ProfileEmail";
import ProfilePhone from "../ProfilePhone/ProfilePhone";
import ProfileGender from "../ProfileGender/ProfileGender";
import ProfileRegion from "../ProfileRegion/ProfileRegion";

const UserProfile = ({ onEditProfile, allRegions }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();

  return (
    <div className="userprofile userprofile_opened popup_type_edit-avatar" id="popup">
      <div className="userprofile__container">
        <h2 className="userprofile__header">{t("MyData")}</h2>
        <div id="formEditProfile" name="form-edit-profile" className="userprofile__form userprofile__form_edit-profile">
          <div className="preprofile__fieldset">
            <p id="userID" className="id_paragraph">{t("YourID")}{currentUser.clientId}</p>
            <ProfileName onEditProfile={onEditProfile} />
            <ProfilePhone onEditProfile={onEditProfile} />
            <ProfileGender onEditProfile={onEditProfile} />
            <ProfileEmail onEditProfile={onEditProfile} />
            <ProfileRegion onEditProfile={onEditProfile} allRegions={allRegions} />
          </div>
          <Link to="/" className="profile__back-button">{t("Back")}</Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;