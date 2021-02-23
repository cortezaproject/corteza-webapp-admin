import Vue from 'vue'
import { createLocalVue, shallowMount as sm, mount as rm } from '@vue/test-utils'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import CContentHeader from 'corteza-webapp-admin/src/components/CContentHeader'
import CResourceList from 'corteza-webapp-admin/src/components/CResourceList'
import CResourceListStatusFilter from 'corteza-webapp-admin/src/components/CResourceListStatusFilter'
import { components } from '@cortezaproject/corteza-vue'
const { CCorredorManualButtons, CPermissionsButton } = components

Vue.config.ignoredElements = [
  'font-awesome-icon',
]

Vue.use(BootstrapVue)

Vue.component('c-corredor-manual-buttons', CCorredorManualButtons)
Vue.component('c-permissions-button', CPermissionsButton)
Vue.component('c-content-header', CContentHeader)
Vue.component('c-resource-list', CResourceList)
Vue.component('c-resource-list-status-filter', CResourceListStatusFilter)

export const writeableWindowLocation = ({ path: value = '/' } = {}) => Object.defineProperty(window, 'location', { writable: true, value })

export const mount = (component, params = {}) => shallowMount(component, { ...params })

export const stdReject = () => sinon.stub().rejects({ message: 'err' })
export const stdResolve = (rtr) => sinon.stub().resolves(rtr)
export const networkReject = () => sinon.stub().rejects({ message: 'Network Error' })

export const stdAuth = (mocks = {}) => ({
  is: sinon.stub().returns(true),
  check: stdResolve(),
  goto: (u) => u,
  open: (u) => u,
  ...mocks,
})

const mounter = (component, { localVue = createLocalVue(), $auth = {}, mocks = {}, stubs = [], ...options } = {}, mount) => {
  return mount(component, {
    localVue,
    stubs: [
      'router-view',
      'router-link',
      'confirmation-toggle',
      'user-roles',
      'c-permissions-button',
      ...stubs,
    ],
    mocks: {
      $t: (e) => e,
      $SystemAPI: {},
      $route: { query: { fullPath: '', token: undefined } },
      $auth,
      ...mocks,
    },
    ...options,
  })
}

export const shallowMount = (...e) => {
  return mounter(...e, sm)
}

export const fullMount = (...e) => {
  return mounter(...e, rm)
}

export default shallowMount
