import {useState, useCallback} from "react";

export function useFormWithValidation() {
  const [formValue, setFormValue] = useState({
    name: '',
    gender: '',
    phoneNumber: '',
    email: '',
  })

  const[isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    setFormValue({
      ...formValue,
      [name]: value
    });

    setIsValid(input.closest("form").checkValidity());
  }

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