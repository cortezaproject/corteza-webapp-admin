import { createLocalVue } from '@vue/test-utils'
import ExternalStd from 'corteza-webapp-admin/src/components/settings/auth/ExternalStd'
import { mount, stdStubs } from 'corteza-webapp-common/src/lib/testHelpers'

let localVue = createLocalVue()

describe('components/settings/auth/ExternalStd.vue', () => {
  it('mounts', () => {
    mount(ExternalStd, { localVue, propsData: { title: 'title', value: {} }, stubs: [ ...stdStubs, 'b-input-group', 'b-form-checkbox' ], mocks: { $t: (e) => e } })
  })
})
