import {useState, useCallback} from "react";

export function useFormWithValidation() {
  const [formValue, setFormValue] = useState({
    name: '',
    gender: '',
    phone: '',
    email: '',
  });

  const[isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;// здесь мой текущий инпут(dom), куда я ввожу
    const value = input.type === 'radio' ? input.value : input.value; // Учитываем тип радиокнопок
    //const value = input.value;// то, что я ввел в инпут 
    const name = input.name;// атрибут name у input-a

    setFormValue({
      ...formValue,
      [name]: value
    }); // обновляем formValue ,собирая данные с инпута

    setIsValid(input.closest("form").checkValidity());
  }

  //console.log("hook out", formValue);

  const resetForm = useCallback(
  (
    newValue = {},
    newIsValid = false
    ) => {
      setFormValue(newValue);

      setIsValid(newIsValid);
    },
    [setFormValue, setIsValid]
  )

  return { formValue, handleChange, resetForm, isValid, setFormValue };
}