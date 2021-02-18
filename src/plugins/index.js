import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import VueProgressBar from 'vue-progressbar'
import vars from '../themes/corteza-base/variables.scss'

import { plugins } from '@cortezaproject/corteza-vue'

import pairs from './eventbus-pairs'

Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(Vuex)
Vue.use(VueProgressBar, {
  color: vars.primary,
  failedColor: vars.danger,
  thickness: '7px',
})

Vue.use(plugins.CortezaAPI('compose'))
Vue.use(plugins.CortezaAPI('system'))
Vue.use(plugins.CortezaAPI('messaging'))
Vue.use(plugins.CortezaAPI('federation'))

const notProduction = (process.env.NODE_ENV !== 'production')

Vue.use(plugins.EventBus(), {
  strict: notProduction,
  verbose: notProduction,
  pairs,
})

Vue.use(plugins.UIHooks(), {
  app: 'compose',
  verbose: notProduction,
})

Vue.use(plugins.Auth(), {
  baseURL: window.authURL,
  redirectURI: `${window.location.origin}/admin/auth`,
})
