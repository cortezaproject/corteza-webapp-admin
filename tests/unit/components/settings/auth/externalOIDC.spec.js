import { expect } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import ExternalOIDC from '@/components/settings/auth/ExternalOIDC'
import { mount, stdStubs } from 'crust-common.vue/src/lib/testHelpers'

let localVue = createLocalVue()

describe('components/settings/auth/ExternalOIDC.vue', () => {
  let stubs = [ ...stdStubs, 'b-form-checkbox', 'b-input-group' ]
  it('mounts', () => {
    mount(ExternalOIDC, { localVue, propsData: { title: 'title', value: {} }, stubs, mocks: { $t: (e) => e } })
  })

  describe('methods', () => {
    it('alphanum', () => {
      let wrapper = mount(ExternalOIDC, { localVue, propsData: { title: 'title', value: {} }, stubs, mocks: { $t: (e) => e } })

      let dirty = 'aA0-_ /.:;+?\''
      let clean = 'aA0-_'
      expect(wrapper.vm.alphanum(dirty)).to.eq(clean)
    })
  })
})
