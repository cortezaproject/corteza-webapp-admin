import { createLocalVue } from '@vue/test-utils'
import ExternalStd from '@/components/settings/auth/ExternalStd'
import { mount, stdStubs } from 'crust-common.vue/src/lib/testHelpers'

let localVue = createLocalVue()

describe('components/settings/auth/ExternalStd.vue', () => {
  it('mounts', () => {
    mount(ExternalStd, { localVue, propsData: { title: 'title', value: {} }, stubs: [ ...stdStubs, 'b-input-group', 'b-form-checkbox' ], mocks: { $t: (e) => e } })
  })
})
