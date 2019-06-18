import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { PermissionsButton } from 'corteza-webapp-common/components'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.component('permissions-button', PermissionsButton)
