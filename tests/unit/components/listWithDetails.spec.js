import { createLocalVue } from '@vue/test-utils'
import ListWithDetails from '@/components/ListWithDetails'
import { mount, stdStubs } from 'crust-common.vue/src/lib/testHelpers'

let localVue = createLocalVue()

describe('components/ListWithDetails.vue', () => {
  it('mounts', () => {
    mount(ListWithDetails, { localVue, stubs: [ ...stdStubs ], mocks: { $t: (e) => e, $route: {} } })
  })
})
