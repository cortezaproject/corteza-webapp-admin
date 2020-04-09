import Vue from 'vue'

import './config-check'
import './console-splash'

import './plugins'
import './mixins'
import './components'
import './filters'

import i18n from './i18n'
import store from './store'
import router from './router'

import { system } from '@cortezaproject/corteza-js'
import { mixins, corredor } from '@cortezaproject/corteza-vue'

const notProduction = (process.env.NODE_ENV !== 'production')

export default (options = {}) => {
  options = {
    el: '#app',
    name: 'admin',
    template: '<router-view v-if="loaded"/>',

    mixins: [
      mixins.corredor,
    ],

    data: () => ({ loaded: false }),
    created () {
      if (this.$auth.is()) {
        // ref to vue is needed inside compose helper
        // load and register bundle and list of client/server scripts

        const bundleLoaderOpt = {
          // Name of the bundle to load
          bundle: 'admin',

          // Debug logging
          verbose: notProduction,

          // Context for exec function (client scripts only!)
          //
          // Extended with additional helpers
          ctx: new corredor.WebappCtx({
            $invoker: this.$auth.user,
            authToken: this.$auth.JWT,
          }),
        }

        this.loadBundle(bundleLoaderOpt)
          .then(() => this.$SystemAPI.automationList())
          .then(this.makeAutomationScriptsRegistrator(
            // compose specific handler that routes  onManual events for server-scripts
            // to the proper endpoint on the API
            system.TriggerSystemServerScriptOnManual(this.$SystemAPI),
          ))
          .then(() => {
            this.loaded = true
          })
      } else {
        this.loaded = true
      }
    },
    router,
    store,
    i18n: i18n(),

    // Any additional options we want to merge
    ...options,
  }

  return new Vue(options)
}
