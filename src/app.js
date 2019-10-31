import Vue from 'vue'

import './config-check'
import './console-splash'

import './plugins'
import './mixins'
import './components'

import i18n from './i18n'
import store from './store'
import router from './router'
import Layout from './views/Layout'

export default (options = {}) => {
  options = {
    el: '#app',
    name: 'admin',
    // template: '<div id="admin" class="crust"><router-view/></div>',
    render: h => h(Layout),
    router,
    store,
    i18n: i18n(),

    // Any additional options we want to merge
    ...options,
  }

  return new Vue(options)
}
