import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './faIcons'
import CContentHeader from './CContentHeader'
import CResourceList from './CResourceList'
import CResourceListStatusFilter from './CResourceListStatusFilter'

Vue.component('permissions-button', () => import('corteza-webapp-common/src/components/Permissions/Button'))
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('c-content-header', CContentHeader)
Vue.component('c-resource-list', CResourceList)
Vue.component('c-resource-list-status-filter', CResourceListStatusFilter)
