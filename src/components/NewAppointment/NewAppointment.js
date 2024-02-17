import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import './NewAppointment.css';
import Select from 'react-select';
import Api from '../../utils/Api';
import { Link } from 'react-router-dom';

const NewAppointment = () => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [categoriesForSelector, setCategoriesForSelector] = useState([]);
  const [procedureNames, setProcedureNames] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  //-----------------api-------------------------------------------------------------

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    async function getAllCategories() {
      try {
        const categories = await api.getAllCategoriesOfProcedures();
        setCategories(categories);
        setCategoriesForSelector(categories.map(category => ({
          value: category.categoryId,
          label: t(category.categoryName)
        })));
      } catch (error) {
        return console.log(error);
      }
    }
    getAllCategories();
  }, [t]);


  const getAllProcedureNames = async (categoryId) => {
    try {
      const procedureNames = await api.getAllProcedureNamesFromCategory(categoryId);
      setProcedureNames(procedureNames);
    } catch (error) {
      console.error("Error fetching salon info:", error);
    }
  };


  // -----------------------для Selector компонента------------------
  const [currentCategory, setCurrentCategory] = useState('');
  const getValue = () => {
    return currentCategory ? categoriesForSelector.find(c => c.value === currentCategory) : ''
  }

  const onChange = async (newValue) => {
    const categoryId = newValue.value;
    setCurrentCategory(categoryId);
    setSelectedCategoryId(categoryId);
    await getAllProcedureNames(categoryId);
  }

  return (
    <div className="newappointment">
      <div className="newappointment__block">
        <h1 className="newappointment__header">Выберите категорию:</h1>
        <Select placeholder="Выберите категорию" className="newappointment__selector" value={getValue()} onChange={onChange} options={categoriesForSelector} />
        <Link to={`/appointment/${selectedCategoryId}`} className="newappointment__submit-button">Продолжить</Link>
        <Link to={-1} className="newappointment__back-button">Назад</Link>
      </div>
    </div>);
}

export default NewAppointment;