import './Categories.css';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Api from '../../../utils/Api';
import { useNavigate } from 'react-router-dom';
import LeftArrowButton from '../../elements/LeftArrowButton/LeftArrowButton';
import RightArrowButton from '../../elements/RightArrowButton/RightArrowButton';
import leftArrow from "../../../images/leftArrow.svg";
import rightArrow from "../../../images/rightArrow.svg";


const Categories = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [procedureData, setProcedureData] = useState([]);
  const categoryIdForCheckbox = window.location.pathname.split('/').pop();// взяли из url

  //-----------------api-------------------------------------------------------------


  const api = new Api({
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
  });


  //-----------------requests-------------------------------------------------------------


  useEffect(() => {
    async function getAllCategories() {
      try {
        const categories = await api.getAllCategoriesOfProcedures();// реснички ногти и бровки
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getAllCategories();
  }, [t]);


  const getAllProcedureNames = async (categoryId) => {
    try {
      const arrayWithProceduresData = await api.getAllProcedureNamesFromCategory(categoryId);
      setProcedureData(arrayWithProceduresData);
    } catch (error) {
      console.error("Error fetching procedure info:", error);
    }
  };

  useEffect(() => {
    getAllProcedureNames(categoryIdForCheckbox);// взяли из url
  }, [])

  const proceduresForCheckBox = procedureData.map(procedure => procedure.procedureName);// массив с названиями процедур


  //------------------------------------checkbox-----------------------------------------------

  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);


  const [checkboxes, setCheckboxes] = useState({});

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked
    }));
    setIsAnyCheckboxSelected(Object.values({
      ...checkboxes, // Добавляем текущее состояние checkboxes
      [name]: checked // Обновляем значение текущего чекбокса
    }).some(checkbox => checkbox)); // Проверяем, есть ли выбранные чекбоксы
  };


  //---------------------------------collect data from checkboxes-------------------------

  const mapFromCategoryIdToCategoryName = new Map();// Карта где сопоставляем id -> name
  const selectedProcedureNames = Object.keys(checkboxes).filter(key => checkboxes[key]); // Получение массива выбранных процедур из состояния checkboxes. 
  //Мы используем Object.keys(checkboxes) 
  // для получения ключей (имен процедур) и фильтруем только те, у которых значение true.

  procedureData.forEach(category => {
    mapFromCategoryIdToCategoryName.set(category.procedureName, category.procedureId);
  });

  let matchesBetweenMapAndCheckBox;
  const findMatchesBetweenCheckBoxAndMap = () => {// ищем совпадения между выбранными услгугами в чекбоксе и нашей картой с категориями
    matchesBetweenMapAndCheckBox = selectedProcedureNames.reduce((acc, procedure) => { //acc пустой массив для заполнения idшниками 
      const procedureId = mapFromCategoryIdToCategoryName.get(procedure); //Для каждой выбранной процедуры, мы пытаемся получить соответствующий идентификатор из 
      // карты mapFromCategoryIdToCategoryName с помощью метода get. Если соответствие найдено, мы добавляем идентификатор в аккумулятор acc.
      if (procedureId) {
        acc.push(procedureId);
      }
      return acc;
    }, []);
  };

  findMatchesBetweenCheckBoxAndMap();

  const handleSaveCategoriesClick = async () => {
    await findMatchesBetweenCheckBoxAndMap();
    navigate('/salonsafterfilter', { state: { matches: matchesBetweenMapAndCheckBox } });
  }

  return (
    <div className='categories'>
      <div className="categories__block">
        <div className='categories__header-container'>
          <h3 className="categories__header">Выберите одну или несколько желаемых услуг:</h3>
        </div>
        <div className='categories__checkbox'>
          {proceduresForCheckBox.map((procedure, index) => (
            <label className='categories__label' key={index}>
              <input type="checkbox" name={procedure} checked={checkboxes[`procedure${index + 1}`]} onChange={handleCheckboxChange} value={procedure}
                className='categories__input' /> {t(procedure)} </label>
          ))}
        </div>
      </div>
      <div className='categories__buttons-block'>
        <LeftArrowButton alt="стрелка влево" type="button" src={leftArrow} to={-1} />
        <RightArrowButton src={rightArrow} alt="стрелка вправо" onClick={handleSaveCategoriesClick} disabled={!isAnyCheckboxSelected} type="submit" />
      </div>
    </div>
  );
}

export default Categories;