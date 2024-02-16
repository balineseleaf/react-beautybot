import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import './NewAppointment.css';
import Select from 'react-select';
import Api from '../../utils/Api';
import { Link } from 'react-router-dom';

const NewAppointment = () => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState('nails');

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {

    async function getAllProceduresInfo() {
      try {
        const categories = await api.getAllCategoriesOfProcedures();
        setCategories(categories.map(category => ({
          value: category.categoryId,
          label: t(category.categoryName)
        })));
      } catch (error) {
        return console.log(error);
      }
    }
    getAllProceduresInfo();
  }, [t]);

  console.log('1', categories);


  // для Selector компонента
  const [currentCategory, setCurrentCategory] = useState('');

  const getValue = () => {
    return currentCategory ? categories.find(c => c.value === currentCategory) : ''
  }
  const onChange = (newValue) => {
    setCurrentCategory(newValue.value)
  }

  return (
    <div className="newappointment">
      <div className="newappointment__block">
        <h1 className="newappointment__header">Выберите категорию:</h1>
        <Select placeholder="Выберите категорию" className="newappointment__selector" value={getValue()} onChange={onChange} options={categories} />
        <Link to="" className="newappointment__submit-button">Продолжить</Link>
        <Link to={-1} className="newappointment__back-button">Назад</Link>
      </div>
    </div>);
}

export default NewAppointment;