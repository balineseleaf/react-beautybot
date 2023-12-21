import React from "react";
import { useEffect } from "react";
import './Preprofile.css';
import Api from '../../utils/Api';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Preprofile = () => {
const apiPreProfile = new Api({
    url: 'http://localhost:5000',
    headers: {
        //authorization: '79aff481-506e-4c4c-8308-be7829df1002',
        'Content-Type': 'application/json',
    },
    });
    
    //получение инфо о пользователе
    function getInfoAboutUser() {
    const userId = document.getElementById('userID');
    const userName = document.getElementById('userName');
    const userPhone = document.getElementById('userPhone');
    const userEmail = document.getElementById('userEmail');
    const userGender = document.getElementById('userGender');
    apiPreProfile
        .getUserInfo()
        .then((clientData) => {
            userId.textContent = t("YourID") + ': ' + clientData.clientId;
            userName.textContent = t("YourName") + ': ' + clientData.clientName;
            userPhone.textContent = t("YourNumber") + ': ' + clientData.clientPhone;
            userEmail.textContent = t("YourEmail") + ': ' + clientData.clientEmail;
            userGender.textContent = t("YourGender") + ': ' + clientData.clientGender;
        })
        .catch((error) => console.log(error));
    }

    useEffect(()=>{
        getInfoAboutUser() 
    })

    // let tg = window.Telegram.WebApp; // создаем объект телеграмма
    // tg.BackButton.show();
    // tg.onEvent('backButtonClicked', function () {
    // window.location.href = '/';
    // tg.BackButton.hide();
    // });

    const { t } = useTranslation();

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