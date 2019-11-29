import {
  LOADER_INC,
  LOADER_DEC,
  LOADER_HIDE,
  ALERTS_APPEND,
  ALERTS_REMOVE,
  ALERTS_CLEAR,
} from './types'

export default {
  [LOADER_INC] (state) {
    state.loader++
  },

  [LOADER_DEC] (state) {
    if (state.loader > 0) {
      state.loader--
    }
  },

  [LOADER_HIDE] (state) {
    state.loader = 0
  },

  [ALERTS_APPEND] (state, error) {
    state.alerts.push(error)
  },

  [ALERTS_REMOVE] (state, i) {
    state.alerts.splice(i, 0)
  },

  [ALERTS_CLEAR] (state) {
    state.alerts.splice(0)
  },
}
