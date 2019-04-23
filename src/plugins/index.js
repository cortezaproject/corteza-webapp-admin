import Vue from 'vue'

import system from '@/plugins/system'
import logger from '@/plugins/logger'
import auth from 'crust-common.vue/src/plugins/auth'

Vue.use(logger)
Vue.use(system)
Vue.use(auth)
