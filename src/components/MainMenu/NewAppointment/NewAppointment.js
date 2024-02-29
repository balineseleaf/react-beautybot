import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import './NewAppointment.css';
import { Link } from "react-router-dom";
import Api from '../../../utils/Api';

const NewAppointment = () => {
  const { t } = useTranslation();

  const [categories, setCategories] = useState([]);
  const [categoriesForSelector, setCategoriesForSelector] = useState([]);
  // const [procedureNames, setProcedureNames] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState('');

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

  const handleCategoryClick = async (categoryId) => {
    console.log("Category clicked:", categoryId);
  };

  return (
    <div className="newappointment">
      <div className="newappointment__block">
        <div>
          <div className="newappointment__header-container">
            <h1 className="newappointment__header">Выберите категорию:</h1>
          </div>
          {/* <Select placeholder="Выберите категорию" className="newappointment__selector" value={getValue()} onChange={onChange} options={categoriesForSelector} />
           */}
          <ul className="newappointment__category-list">
            {categories.map(category => (
              <li className="newappointment__category-item" key={category.categoryId}>
                <Link onClick={() => handleCategoryClick(category.categoryId)} to={`/appointment/${category.categoryId}`} className="newappointment__category-link">
                  {t(category.categoryName)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <RightArrowButton alt="стрелка вправо" src={rightArrow} type="button" to={`/appointment/${selectedCategoryId}`} /> */}
    </div>
  );
}

export default NewAppointment;