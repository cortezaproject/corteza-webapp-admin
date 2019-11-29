import {
  LOADER_INC,
  LOADER_DEC,
  LOADER_HIDE,
  ALERTS_APPEND,
  ALERTS_REMOVE,
  ALERTS_CLEAR,
} from './types'

export default {
  incLoader ({ commit }) {
    commit(LOADER_INC)
  },

  decLoader ({ commit }) {
    commit(LOADER_DEC)
  },

  hideLoader ({ commit }) {
    commit(LOADER_HIDE)
  },

  appendAlert ({ commit }, { message }) {
    commit(ALERTS_APPEND, { message })
  },

  removeAlert ({ commit }, index) {
    commit(ALERTS_REMOVE, index)
  },

  clearAlerts ({ commit }) {
    commit(ALERTS_CLEAR)
  },
}
