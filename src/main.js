import Vue from 'vue'

import './global'
import './plugins'
import './main.scss'

import router from './router'
import i18n from './i18next'
import store from './store'

/* eslint-disable no-undef */
console.log(
  `%cCrust Admin, version: ${VERSION}, build time: ${BUILD_TIME}`,
  'background-color: #1397CB; color: white; padding: 3px 10px; border: 1px solid black; font: Courier',
)

if (window.SystemAPI === undefined || window.ComposeAPI === undefined || window.MessagingAPI === undefined) {
  alert('Missing or invalid System/Compose/Messaging API configuration. Make sure there is a public/config.js configuration file.')
} else {
  new Vue({
    router,
    i18n,
    store,
    template: '<div id="admin" class="crust"><router-view/></div>',
  }).$mount('#app')
}
