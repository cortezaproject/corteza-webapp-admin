import Vue from 'vue'
import Vuex from 'vuex'

import ui from './ui'
import { store as cvStore } from '@cortezaproject/corteza-vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ui,
    wfPrompts: {
      namespaced: true,
      ...cvStore.wfPrompts({
        api: Vue.prototype.$AutomationAPI,
      }),
    },
  },
})

export default store
