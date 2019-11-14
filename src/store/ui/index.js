import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,

  state: {
    loader: 0,
    alerts: [],
  },

  getters: {
    isLoading (state) {
      return state.loader > 0
    },

    alerts (state) {
      return state.alerts
    },
  },

  actions,
  mutations,
}
