import { expect } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import Application from '@/views/Applications/Application'
import { mount, stdStubs } from 'corteza-webapp-common/src/lib/testHelpers'

const localVue = createLocalVue()

describe('views/Applications/Application.vue', () => {
  const mocks = { $t: (e) => e }
  const common = { localVue, stubs: [ ...stdStubs, 'permissions-button', 'b-form-checkbox', 'b-form-textarea' ], mocks }
  let wrapper

  describe('computed', () => {
    it('disableSubmit', () => {
      let local = { processing: false, validConfig: false }
      expect(Application.computed.disableSubmit.call(local)).to.eq(true)

      local = { processing: true, validConfig: false }
      expect(Application.computed.disableSubmit.call(local)).to.eq(true)

      local = { processing: true, validConfig: true }
      expect(Application.computed.disableSubmit.call(local)).to.eq(true)

      local = { processing: false, validConfig: true }
      expect(Application.computed.disableSubmit.call(local)).to.eq(false)
    })

    describe('validConfig', () => {
      let local
      it('unify.missing', () => {
        local = { application: {} }
        expect(Application.computed.validConfig.call(local)).to.eq(true)
      })

      it('unify.config.missing', () => {
        local = { application: { unify: {} } }
        expect(Application.computed.validConfig.call(local)).to.eq(true)
      })

      it('unify.config.malformed', () => {
        local = { application: { unify: { config: '{malformed]' } } }
        expect(Application.computed.validConfig.call(local)).to.eq(false)
      })

      it('unify.config.valid', () => {
        local = { application: { unify: { config: '{"valid": true}' } } }
        expect(Application.computed.validConfig.call(local)).to.eq(true)
      })
    })

    it('configState', () => {
      let local = { application: {} }
      expect(Application.computed.configState.call(local)).to.eq(null)

      local = { application: { unify: {} } }
      expect(Application.computed.configState.call(local)).to.eq(null)

      local = { application: { unify: { config: '' } } }
      expect(Application.computed.configState.call(local)).to.eq(null)

      // undefined, because validConfig is stubbed away
      local = { application: { unify: { config: '{"valid": true}' } } }
      expect(Application.computed.configState.call(local)).to.eq(undefined)
    })
  })

  describe('methods', () => {
    describe('fetchApplications', () => {
      it('resolve')
      it('reject')
    })

    describe('onDelete', () => {
      it('resolve')
      it('reject')
    })

    describe('onSubmit', () => {
      it('resolve.update')
      it('reject.update')
      it('resolve.create')
      it('reject.create')
    })

    it('handler')

    it('prepare', () => {
      wrapper = mount(Application, { ...common, watch: { applicationID: {} } })

      const dftUnify = { listed: true, name: undefined, config: '', icon: '', logo: '', url: '' }

      wrapper.vm.prepare()
      expect(wrapper.vm.application).to.deep.eq({ unify: dftUnify })

      wrapper.vm.prepare({})
      expect(wrapper.vm.application).to.deep.eq({ unify: dftUnify })

      wrapper.vm.prepare({ unify: {} })
      expect(wrapper.vm.application).to.deep.eq({ unify: {} })
    })
  })
})
