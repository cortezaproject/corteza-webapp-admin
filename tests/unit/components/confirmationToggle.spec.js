import { expect } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import { mount, stdStubs } from 'corteza-webapp-common/src/lib/testHelpers'

let localVue = createLocalVue()

describe('components/ConfirmationToggle.vue', () => {
  const common = { localVue, stubs: stdStubs, mocks: { $t: (e) => e } }
  let wrapper

  describe('computed', () => {
    it('btnClass', () => {
      let local = { disabled: false, ctaClass: 'dft-class' }
      let expected = 'dft-class'
      expect(ConfirmationToggle.computed.btnClass.call(local)).to.eq(expected)

      local = { disabled: true, ctaClass: 'dft-class' }
      expected = 'btn-disabled'
      expect(ConfirmationToggle.computed.btnClass.call(local)).to.eq(expected)
    })
  })

  describe('methods', () => {
    it('onPrompt', () => {
      wrapper = mount(ConfirmationToggle, common)

      let evt = wrapper.emitted().confirmed
      expect(evt).to.eq(undefined)
      expect(wrapper.vm.inConfirmation).to.eq(false)

      wrapper.vm.onPrompt()
      evt = wrapper.emitted().confirmed
      expect(evt).to.eq(undefined)
      expect(wrapper.vm.inConfirmation).to.eq(true)

      wrapper.setProps({ noPrompt: true })
      wrapper.setData({ inConfirmation: false })
      wrapper.vm.onPrompt()
      evt = wrapper.emitted().confirmed.pop()
      expect(evt).to.not.eq(undefined)
      expect(wrapper.vm.inConfirmation).to.eq(false)
    })

    it('onConfirmation', () => {
      wrapper = mount(ConfirmationToggle, common)

      let evt = wrapper.emitted().confirmed
      expect(evt).to.eq(undefined)
      expect(wrapper.vm.inConfirmation).to.eq(false)

      wrapper.vm.onConfirmation()
      evt = wrapper.emitted().confirmed.pop()
      expect(evt).to.not.eq(undefined)
      expect(wrapper.vm.inConfirmation).to.eq(false)

      wrapper.setData({ inConfirmation: true })
      wrapper.vm.onConfirmation()
      evt = wrapper.emitted().confirmed.pop()
      expect(evt).to.not.eq(undefined)
      expect(wrapper.vm.inConfirmation).to.eq(false)
    })
  })
})
