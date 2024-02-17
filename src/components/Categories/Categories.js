import './Categories.css';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Api from '../../utils/Api';

const Categories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [procedureNames, setProcedureNames] = useState([]);
  const categoryIdForCheckbox = window.location.pathname.split('/').pop();


  //-----------------api-------------------------------------------------------------

  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  //-----------------requests-------------------------------------------------------------
  useEffect(() => {
    async function getAllProceduresInfo() {
      try {
        const categories = await api.getAllCategoriesOfProcedures();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getAllProceduresInfo();
  }, [t]);


  const getAllProcedureNames = async (categoryId) => {
    try {
      const procedureNames = await api.getAllProcedureNamesFromCategory(categoryId);
      setProcedureNames(procedureNames);
    } catch (error) {
      console.error("Error fetching procedure info:", error);
    }
  };
  useEffect(() => {
    getAllProcedureNames(categoryIdForCheckbox);
  }, [])


  const proceduresForCheckBox = procedureNames.map(procedure => procedure.procedureName);

  //------------------------------------checkbox-----------------------------------------------
  const [checkboxes, setCheckboxes] = useState({ option1: false, option2: false, option3: false });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  return (
    <div className='categories'>
      <div className="categories__block">
        <div className="categories__header">Выберите одну или несколько желаемых услуг:</div>
        <div className="categories__container">
          {proceduresForCheckBox.map((procedure, index) => (
            <label className='categories__label' key={procedure}>
              <input
                type="checkbox"
                name={`option${index + 1}`}
                checked={checkboxes[`option${index + 1}`]}
                onChange={handleCheckboxChange}
                value={procedure}
                className='categories__input'
              />
              {t(procedure)}
            </label>
          ))}
        </div>
        <Link to="" className="categories__submit-button">Продолжить</Link>
        <Link to={-1} className="categories__back-button">Назад</Link>
      </div>

    </div>
  );
}

export default Categories;