import React from "react";
import { useEffect } from "react";
import './Preprofile.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const Preprofile = ({getInfo}) => {
const currentUser = React.useContext(CurrentUserContext);
//console.log("currentUser", currentUser);

//console.log('preprofile', currentUser);
const { t } = useTranslation();


//let tg = window.Telegram.WebApp; // создаем объект телеграмма
//console.log(tg.initDataUnsafe.user.id);
// tg.BackButton.show();
// tg.onEvent('backButtonClicked', function () {
// window.location.href = '/';
// tg.BackButton.hide();
// });
useEffect(() => {
    getInfo();
  }, []);


return (
    <div className="popup popup_opened popup_type_edit-avatar" id="popup">
        <div className="popup__container">
            <h2 className="popup__header">{t("MyData")}</h2>
            <div
                id="formEditProfile"
                name="form-edit-profile"
                className="popup__form popup__form_edit-profile"
            >
                <div className="popup__fieldset">
                    <p id="userID" className="id_paragraph">{t("YourID")}{currentUser.clientId}</p>
                    <p id="userName" className="name_paragraph">{t("YourName")}{currentUser.clientName}</p>
                    <p id="userGender" className="gender_paragraph">{t("YourGender")}{currentUser.clientGender}</p>
                    <p id="userPhone" className="phone_paragraph">
                    {t("YourNumber")}{currentUser.clientPhone}
                    </p>
                    <p id="userEmail" className="email_paragraph">
                    {t("YourEmail")}{currentUser.clientEmail}
                    </p>
                </div>
                <Link

                    to="/profile"
                    className="profile__edit-button"
                >{t("EditProfile")}</Link>
            </div>
        </div>
    </div>
    );
}
 
export default Preprofile;