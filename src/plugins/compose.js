import Compose from '@/api/compose'

export default {
  install (Vue) {
    Vue.prototype.$compose = Compose
  },
}
