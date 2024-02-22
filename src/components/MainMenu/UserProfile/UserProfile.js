import React from "react";
import './UserProfile.css';
import { useTranslation } from 'react-i18next';
import { CurrentUserContext } from '../../../context/CurrentUserContext';
import ProfileName from "../../EditUser/ProfileName/ProfileName";
import ProfileEmail from "../../EditUser/ProfileEmail/ProfileEmail";
import ProfilePhone from "../../EditUser/ProfilePhone/ProfilePhone";
import ProfileGender from "../../EditUser/ProfileGender/ProfileGender";
import ProfileRegion from "../../EditUser/ProfileRegion/ProfileRegion";
import Button from '../../elements/Button/Button';

const UserProfile = ({ onEditProfile, allRegions }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { t } = useTranslation();


  return (
    <div className="userprofile">
      <div className="userprofile__block">
        <form autoComplete="off" name="form-edit-profile" className="userprofile__form">
          <h2 className="userprofile__header">{t("MyData")}</h2>
          <div className="userprofile__fieldset">
            <p className="id_paragraph">{t("YourID")}{currentUser.clientId}</p>
            <ProfileName onEditProfile={onEditProfile} />
            <ProfilePhone onEditProfile={onEditProfile} />
            <ProfileGender onEditProfile={onEditProfile} />
            <ProfileEmail onEditProfile={onEditProfile} />
            <ProfileRegion onEditProfile={onEditProfile} allRegions={allRegions} />
          </div>
        </form>
        <Button type="button" buttonText={t("Back2")} to="/" />
      </div>
    </div>
  );
}

export default UserProfile;