import "./LanguageDropdown.css";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const changeLanguage = () => {
    const languageToChange = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(languageToChange);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const currentLanguage = i18n.language === 'ru' ? 'RU' : 'EN';
  const dropdownLanguage = i18n.language === 'ru' ? 'EN' : 'RU';

  useEffect(() => {
    const closeDropdown = (e) => {
      if (isDropdownVisible && !e.target.closest('.my-dropdown')) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isDropdownVisible]);

  return (
    <div className="langbox">
      <div className='my-dropdown'>
        <div className='dropdown-wrapper'>
          <button className='dropdown-button' onClick={toggleDropdown}>{currentLanguage}</button>
          <ul className={`dropdown-list ${isDropdownVisible ? 'dropdown-list-visible' : ''}`}>
            <li className="dropdown-list-item" onClick={() => changeLanguage()}>{dropdownLanguage}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LanguageDropdown;