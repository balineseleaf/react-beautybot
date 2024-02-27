import "./AppointmentConfirmation.css";
import { useTranslation } from 'react-i18next';

const AppointmentConfirmation = () => {
  return (
    <div className="appointmentconfirmation">
      <div className="appointmentconfirmation__block">
        <h3 className="appointmentconfirmation__header">Пожалуйста, подтвердите вашу запись после проверки всех данных:</h3>
        <p className="appointmentconfirmation__info">
          Салон:
          Адрес:
          Дата:
          Время:
          Процедура(ы): Наращивание(Классика), Наращивание ресниц 2D
        </p>
        <p className="appointmentconfirmation__info">
          Салон:
          Приблизительная длительность: 5 (ч).
          Стоимость 2800
        </p>
        <div>
          <button>Подтвердить</button>
          <div>
            <button>Назад</button>
            <button>Карта</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentConfirmation;