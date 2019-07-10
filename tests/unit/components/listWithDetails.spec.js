import { createLocalVue } from '@vue/test-utils'
import ListWithDetails from 'corteza-webapp-admin/src/components/ListWithDetails'
import { mount, stdStubs } from 'corteza-webapp-common/src/lib/testHelpers'

let localVue = createLocalVue()

describe('components/ListWithDetails.vue', () => {
  it('mounts', () => {
    mount(ListWithDetails, { localVue, stubs: [ ...stdStubs ], mocks: { $t: (e) => e, $route: {} } })
  })
})
