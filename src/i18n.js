import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'ru',
  debug: true,
  detection: {
    order: ['queryString', 'cookie'],
    cache: ['cookie']
  },
  interpolation: {
    escapeValue: false
  }
})

const savedLanguage = localStorage.getItem('i18nextLng');
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage);
} else {
  i18n.changeLanguage('ru'); // Если язык не сохранен, используйте язык по умолчанию
}

export default i18n;