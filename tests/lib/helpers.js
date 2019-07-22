import Vue from 'vue'
import { createLocalVue, shallowMount as sm } from '@vue/test-utils'
import sinon from 'sinon'

Vue.config.ignoredElements = [
  'font-awesome-icon',
  // Ignore all bootstrap elements
  /^b-/,
]

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

export const shallowMount = (component, { mocks = {}, stubs = [], $auth = stdAuth(), ...options } = {}) => {
  let localVue = createLocalVue()

  return sm(component, {
    localVue,
    stubs: ['router-view', 'router-link', 'confirmation-toggle', 'user-roles', 'permissions-button', ...stubs],
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

export default shallowMount
