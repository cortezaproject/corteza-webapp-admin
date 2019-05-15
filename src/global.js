import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { PermissionsButton } from 'crust-common.vue/components'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.component('permissions-button', PermissionsButton)
