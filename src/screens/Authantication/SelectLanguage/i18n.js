
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {en,ara,Spa,Fr} from '../../../../src';


i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  resources: {
    en: en,
    ara:ara,
    Fr:Fr,
    Spa:Spa,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;