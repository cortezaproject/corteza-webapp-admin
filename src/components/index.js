import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './faIcons'
import CContentHeader from './CContentHeader'
import CResourceList from './CResourceList'
import CResourceListStatusFilter from './CResourceListStatusFilter'
import { components } from '@cortezaproject/corteza-vue'

Vue.component('permissions-button', components.PermissionsButton)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('c-content-header', CContentHeader)
Vue.component('c-resource-list', CResourceList)
Vue.component('c-resource-list-status-filter', CResourceListStatusFilter)
Vue.component('c-corredor-manual-buttons', components.CorredorManualButtons)
