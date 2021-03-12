import Vue from 'vue'
import Vuex from 'vuex'

import ui from './ui'
import cortezaVue from '@cortezaproject/corteza-vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ui,
    WFPrompt: cortezaVue.store.WFPrompt({
      api: Vue.prototype.$AutomationAPI,
      setInterval,
      clearInterval,
    }),
  },
})

export default store
