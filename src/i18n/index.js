import Vue from 'vue'
import i18next from 'i18next'
import lngDetector from 'i18next-browser-languagedetector'
import VueI18Next from '@panter/vue-i18next'

import en from './en'

// Initializes i18n options, registers
// plugin on a given Vue instance and returns the options (to be used in new Vue({ i18n: ... })
export default (lng = 'en', fallbackLng = lng) => {
  const options = {
    lng,
    fallbackLng,
    defaultNS: 'admin',
    ns: ['admin'],
    debug: process.env.NODE_ENV !== 'production',
    detection: {
      // to overwrite, to use user defined, to guess user's lang
      order: ['querystring', 'localStorage', 'cookie', 'navigator'],
      caches: [/* 'localStorage', 'cookie' */],
    },
    resources: {
      en,
    },
  }

  i18next.use(lngDetector).init(options)

  Vue.use(VueI18Next)

  return new VueI18Next(i18next)
}
