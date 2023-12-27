import React, {useEffect} from "react";
import './Profile.css';
import { useFormWithValidation } from '../../utils/useForm';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Profile = ({onEditProfile}) => {
  const { t } = useTranslation();
  const currentUser = React.useContext(CurrentUserContext);
  const navigate = useNavigate();


  const { handleChange, formValue, isValid, resetForm } =
    useFormWithValidation();

    // const isDataChanged =
    // formValue.name !== currentUser.clientName ||
    // formValue.email !== currentUser.clientEmail || 
    // formValue.gender !== currentUser.clientGender ||
    // formValue.phone !== currentUser.clientPhone

    const handleInputChange = (e) => {
      handleChange(e);
    };

    useEffect(() => {
      resetForm({
        clientName: currentUser.clientName,
        clientGender: currentUser.clientGender,
        clientPhone: currentUser.clientPhone,
        clientEmail: currentUser.clientEmail,
        clientId: currentUser.clientId,
      });
  
    }, [resetForm, currentUser]);

    useEffect(() => {
      onEditProfile(); // Вызываем getInfoAboutUser при монтировании компонента
    }, []);

    function handleSubmit(e) {
      e.preventDefault();
      const formData = {
        clientName: formValue.name,
        clientGender: formValue.gender,
        clientPhone: formValue.phone,
        clientEmail: formValue.email,
      };

      formData.clientId = currentUser.clientId;
      console.log('formData', formData);
      onEditProfile(formData);
      navigate("/preprofile");
    }

    return ( 
        <div className="popup popup_opened popup_type_edit-avatar" id="popup">
        <div className="profile__container">
          <h2 className="profile__header">{t("MyData")}:</h2>
          <form
            onSubmit={handleSubmit}
            id="formEditProfile"
            name="form-edit-profile"
            className="profile__form popup__form_edit-profile"
            noValidate
          >
            <fieldset className="profile__fieldset">
              <p id="userID" className="profile__id">{t("YourID")}{currentUser.clientId}</p>
              <p className="name_paragraph">{t("InputYourName")}</p>
              <input
                id="name-input"
                className="profile_name popup__input popup__input_type_edit-name"
                name="name"
                required
                placeholder="Имя"
                value={formValue.name}
                onChange={handleInputChange}
                type="text"
              />
              {/* {formValid || !name ? null : ( */}
              {/* <div
                className="form__inputs_error name__input-error"
                id="name-input-error"
              >
                Введите ваше имя
              </div> */}
              {/* )} */}
              <p className="gender_paragraph">{t("ChooseYourGender")}</p>
              <div className="radio_inputs">
              <input
                type="radio"
                required
                className="profile_gender"
                id="m_gender"
                name="gender"
                value="male" // Установите значение для мужского пола
                checked={formValue.gender === 'male'} 
                onChange={handleInputChange}

              />
              <label className="radio_label" htmlFor="m_gender">{t("MaleGender")}</label><br />
              <input
                type="radio"
                className="profile_gender"
                id="f_gender"
                name="gender"
                required
                value="female" // Установите значение для женского пола
                checked={formValue.gender === 'female'} //
                onChange={handleInputChange}

              />
              <label className="radio_label" htmlFor="f_gender">{t("FemaleGender")}</label><br />
              {/* {formValid || gender ? null : ( */}
              {/* <div
                className="form__inputs_error gender__input-error"
                id="gender-error"
              >
                Нужно указать ваш пол
              </div> */}
              {/* )} */}
              </div>
  
              <div className="inputs__container">
                <p className="phone_paragraph">{t("InputYourNumber")}</p>
                <input
                  required
                  className="profile_number popup__input"
                  id="phoneNumber"
                  value={formValue.phone}
                  onChange={handleInputChange}
                  type="tel"
                  name="phone"
                  placeholder="+7(921)000-00-00"
                />
                 {/* {formValid || !phone || validatePhone(phone) ? null : ( */}
                {/* <div
                  className="form__inputs_error phone__input-error"
                  id="phoneNumber-error"
                >
                  Введите ваш номер телефона
                </div> */}
                 {/* )} */}
                <p className="email_paragraph">{t("InputYourMail")}</p>
                <input
                  id="email-input"
                  className="profile_email popup__input"
                  type="email"
                  name="email"
                  value={formValue.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                />
              {/* {formValid || !email || validateEmail(email) ? null : ( */}
                {/* <div
                  className="form__inputs_error email__input-error"
                  id="email-input-error"
                >
                  Некорректный адрес почты
                </div> */}
                 {/* )} */}
              </div>
              <button
                type="submit"
                id="submitButton"
                className="profile__submit popup__submitAddCard"
                disabled={!isValid}
              >
                {t("Submit")}
              </button>
            </fieldset>
          </form>
        </div>
        </div>
     );
}
 
export default Profile;