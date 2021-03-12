import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import VueProgressBar from 'vue-progressbar'
import vars from '../themes/corteza-base/variables.scss'

import { plugins } from '@cortezaproject/corteza-vue'

import pairs from './eventbus-pairs'

const notProduction = (process.env.NODE_ENV !== 'production')
const verboseUIHooks = window.location.search.includes('verboseUIHooks')
const verboseEventbus = window.location.search.includes('verboseEventbus')

Vue.use(plugins.Auth(), { app: 'admin' })

Vue.use(BootstrapVue, {
  BToast: {
    // see https://bootstrap-vue.org/docs/components/toast#comp-ref-b-toast-props
    autoHideDelay: 7000,
    toaster: 'b-toaster-bottom-right',
  },
})
Vue.use(Router)
Vue.use(Vuex)
Vue.use(VueProgressBar, {
  color: vars.primary,
  failedColor: vars.danger,
  thickness: '7px',
})

Vue.use(plugins.CortezaAPI('compose'))
Vue.use(plugins.CortezaAPI('system'))
Vue.use(plugins.CortezaAPI('federation'))
Vue.use(plugins.CortezaAPI('automation'))

Vue.use(plugins.EventBus(), {
  strict: notProduction,
  verbose: verboseEventbus,
  pairs,
})

Vue.use(plugins.UIHooks(), {
  app: 'admin',
  verbose: verboseUIHooks,
})
