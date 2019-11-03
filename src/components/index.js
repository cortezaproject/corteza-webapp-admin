import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './faIcons'
import CError from './CError'
import CHeader from './CHeader'
import CResourceList from './CResourceList'

Vue.component('permissions-button', () => import('corteza-webapp-common/src/components/Permissions/Button'))
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('c-error', CError)
Vue.component('c-header', CHeader)
Vue.component('c-resource-list', CResourceList)
