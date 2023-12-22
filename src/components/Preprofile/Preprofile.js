import React from "react";
import { useEffect } from "react";
import './Preprofile.css';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const Preprofile = (props) => {
const {data} = props;
const currentUser = React.useContext(CurrentUserContext);
console.log('preprofile data', data);
console.log('preprofile', currentUser);
const { t } = useTranslation();
    //получение инфо о пользователе
    function setUserInfo() {
        const userId = document.getElementById('userID');
        const userName = document.getElementById('userName');
        const userPhone = document.getElementById('userPhone');
        const userEmail = document.getElementById('userEmail');
        const userGender = document.getElementById('userGender');
        userId.textContent = t("YourID") + ': ' + currentUser.clientId;
        userName.textContent = t("YourName") + ': ' + currentUser.clientName;
        userPhone.textContent = t("YourNumber") + ': ' + currentUser.clientPhone;
        userEmail.textContent = t("YourEmail") + ': ' + currentUser.clientEmail;
        userGender.textContent = t("YourGender") + ': ' + currentUser.clientGender;
    }

    useEffect(()=>{
        setUserInfo() 
    })

    let tg = window.Telegram.WebApp; // создаем объект телеграмма
    tg.BackButton.show();
    tg.onEvent('backButtonClicked', function () {
    window.location.href = '/';
    tg.BackButton.hide();
    });


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
                        <p id="userID" className="id_paragraph">{t("YourID")}</p>
                        <p id="userName" className="name_paragraph">{t("YourName")}</p>
                        <p id="userGender" className="gender_paragraph">{t("YourGender")}</p>
                        <p id="userPhone" className="phone_paragraph">
                        {t("YourNumber")}
                        </p>
                        <p id="userEmail" className="email_paragraph">
                        {t("YourEmail")}
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