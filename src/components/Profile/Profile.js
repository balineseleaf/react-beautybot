import React, {useEffect} from "react";
import './Profile.css';
import { useFormWithValidation } from '../../utils/useForm';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const Profile = ({onEditProfile}) => {
  const currentUser = React.useContext(CurrentUserContext);

  const { handleChange, formValue, isValid, resetForm } =
    useFormWithValidation();

    const isDataChanged =
    formValue.name !== currentUser.name ||
    formValue.email !== currentUser.email || 
    formValue.gender !== currentUser.gender ||
    formValue.phoneNumber !== currentUser.phoneNumber

    // function sendDataForm() {
    //   const formData = {
    //     clientName: name,
    //     clientGender: gender,
    //     clientPhone: phone,
    //     clientEmail: email,
    //     clientId: clientId,
    //   };
    //   updateUser(formData);
    // }

    const handleInputChange = (e) => {
      handleChange(e);
    };

    useEffect(() => {
      resetForm({
        clientName: currentUser.name,
        clientGender: currentUser.gender,
        clientPhone: currentUser.phone,
        clientEmail: currentUser.email,
        clientId: currentUser.clientId,
      });
  
    }, [resetForm, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile({
      name: formValue.name,
      gender: formValue.gender,
      phoneNumber: formValue.phoneNumber,
      email: formValue.email,
    });
    window.location.href = '/preprofile';
  }
    return ( 
        <div className="popup popup_opened popup_type_edit-avatar" id="popup">
        <div className="profile__container">
          <h2 className="profile__header">Мои Данные:</h2>
          <form
            onSubmit={handleSubmit}
            id="formEditProfile"
            name="form-edit-profile"
            className="profile__form popup__form_edit-profile"
            noValidate
          >
            <fieldset className="profile__fieldset">
              <p id="userID" className="profile__id">Ваш ID: </p>
              <p className="name_paragraph">Введите ваше имя:</p>
              <input
                id="name-input"
                className="profile_name popup__input popup__input_type_edit-name"
                name="name"
                required
                placeholder="Имя"
                value={formValue.name}
                onChange={handleInputChange}
                //onChange={(e) => setName(e.target.value)}
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
              <p className="gender_paragraph">Выберите ваш пол:</p>
              <div className="radio_inputs">
              <input
                type="radio"
                className="profile_gender popup__input"
                id="m_gender"
                name="gender"
                value={formValue.gender}
                //checked={gender === 'М'}
                onChange={handleInputChange}
                //onChange={(e) => setGender(e.target.value)}
              />
              <label className="radio_label" for="m_gender">М</label><br />
              <input
                type="radio"
                className="profile_gender popup__input"
                id="f_gender"
                name="gender"
                value={formValue.gender}
                //checked={gender === 'Ж'} // Проверка состояния пола
                onChange={handleInputChange}
                //onChange={(e) => setGender(e.target.value)}
              />
              <label className="radio_label" for="f_gender">Ж</label><br />
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
                <p className="phone_paragraph">Введите ваш номер телефона:</p>
                <input
                  className="profile_number popup__input"
                  id="phoneNumber"
                  value={formValue.phoneNumber}
                  onChange={handleInputChange}
                  //onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  name="phoneNumber"
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
                <p className="email_paragraph">Введите вашу почту:</p>
                <input
                  id="email-input"
                  className="profile_email popup__input"
                  type="email"
                  name="email"
                  value={formValue.email}
                  onChange={handleInputChange}
                  //onChange={(e) => setEmail(e.target.value)}
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
                // disabled={!formValid}
                className="profile__submit popup__submitAddCard"
                disabled={!isValid || !isDataChanged}
              >
                Сохранить
              </button>
            </fieldset>
          </form>
        </div>
        </div>
     );
}
 
export default Profile;