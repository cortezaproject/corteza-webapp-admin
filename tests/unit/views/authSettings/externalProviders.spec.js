import { expect, assert } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import ExternalProviders from '@/views/AuthSettings/ExternalProviders'
import { mount, stdStubs } from 'corteza-webapp-common/src/lib/testHelpers'

const localVue = createLocalVue()

describe('views/AuthSettings/ExternalProviders.vue', () => {
  const prefix = 'auth.external'
  const stdPrefix = `${prefix}.providers.`
  const oidcPrefix = `${prefix}.providers.openid-connect.`
  const mocks = { $t: (e) => e }
  const common = { localVue, stubs: [ ...stdStubs, 'b-form-checkbox' ], mocks }
  let wrapper

  describe('computed', () => {
    it('dirty', () => {
      let local = { changes: [] }
      expect(ExternalProviders.computed.dirty.call(local)).to.eq(false)

      local.changes.push({})
      expect(ExternalProviders.computed.dirty.call(local)).to.eq(true)
    })

    it('submittable', () => {
      let local = { dirty: false, processing: false }
      expect(ExternalProviders.computed.submittable.call(local)).to.eq(false)

      local.processing = true
      expect(ExternalProviders.computed.submittable.call(local)).to.eq(false)

      local.dirty = true
      expect(ExternalProviders.computed.submittable.call(local)).to.eq(false)

      local.processing = false
      expect(ExternalProviders.computed.submittable.call(local)).to.eq(true)
    })

    it('oidcProviders', () => {
      let tests = [
        // [settings], [oidcProviders]
        [ [], [] ],
        [ [{ name: 'not.valid.name' }], [] ],
        [ [{ name: `${oidcPrefix}valid` }], [`valid`] ],
        [ [{ name: `${oidcPrefix}valid` }, { name: `${oidcPrefix}valid` }], [`valid`] ],
        [ [{ name: `${oidcPrefix}valid` }, { name: 'not.valid.name' }, { name: `${oidcPrefix}valid` }], [`valid`] ],
        [ [{ name: `${oidcPrefix}valid.trimmed` }], [ 'valid' ] ],
      ]

      for (const [ settings, expected ] of tests) {
        expect(ExternalProviders.computed.oidcProviders.call({ settings })).to.deep.eq(expected)
      }
    })

    describe('changes', () => {
      it('standard.change.yes', () => {
        let local = {
          oidc: [],
          standard: { std1: { key: 'nk1', secret: 'ns1', enabled: true } },
          settings: [ { name: `${stdPrefix}std1.key`, value: 'ok1' }, { name: `${stdPrefix}std1.secret`, value: 'os1' }, { name: `${stdPrefix}std1.enabled`, value: true }, { name: 'auth.external.enabled', value: true } ],
          checkForChange: ExternalProviders.methods.checkForChange,
          enabled: true,
        }

        let changes = ExternalProviders.computed.changes.call(local)
        expect(changes).to.have.length(2) // key, secret
        expect(changes).to.deep.eq([{ name: `${stdPrefix}std1.key`, value: 'nk1' }, { name: `${stdPrefix}std1.secret`, value: 'ns1' }])
      })

      it('standard.change.no', () => {
        let local = {
          oidc: [],
          standard: { std1: { key: 'ok1', secret: 'os1', enabled: true } },
          settings: [ { name: `${stdPrefix}std1.key`, value: 'ok1' }, { name: `${stdPrefix}std1.secret`, value: 'os1' }, { name: `${stdPrefix}std1.enabled`, value: true }, { name: 'auth.external.enabled', value: true } ],
          checkForChange: ExternalProviders.methods.checkForChange,
          enabled: true,
        }

        let changes = ExternalProviders.computed.changes.call(local)
        expect(changes).to.have.length(0)
      })

      it('oidc.change.yes', () => {
        let local = {
          standard: {},
          oidc: [ { handle: 'h1', key: 'nk1', secret: 'os1', enabled: false } ],
          settings: [ { name: `${oidcPrefix}h1.key`, value: 'ok1' }, { name: `${oidcPrefix}h1.secret`, value: 'os1' }, { name: `${oidcPrefix}h1.issuer`, value: 'oi1' }, { name: 'auth.external.enabled', value: true } ],
          checkForChange: ExternalProviders.methods.checkForChange,
          enabled: true,
        }

        let changes = ExternalProviders.computed.changes.call(local)
        expect(changes).to.have.length(3) // key, enabled, issuer
        expect(changes).to.deep.eq([{ name: `${oidcPrefix}h1.key`, value: 'nk1' }, { name: `${oidcPrefix}h1.enabled`, value: false }, { name: `${oidcPrefix}h1.issuer`, value: undefined }])
      })

      it('oidc.change.no', () => {
        let local = {
          standard: {},
          oidc: [ { handle: 'h1', key: 'ok1', secret: 'os1', enabled: false } ],
          settings: [ { name: `${oidcPrefix}h1.key`, value: 'ok1' }, { name: `${oidcPrefix}h1.secret`, value: 'os1' }, { name: `${oidcPrefix}h1.enabled`, value: false }, { name: 'auth.external.enabled', value: true } ],
          checkForChange: ExternalProviders.methods.checkForChange,
          enabled: true,
        }

        let changes = ExternalProviders.computed.changes.call(local)
        expect(changes).to.have.length(0)
      })

      it('enabled.change.yes', () => {
        let local = {
          standard: {},
          oidc: [],
          settings: [ { name: 'auth.external.enabled', value: false } ],
          checkForChange: ExternalProviders.methods.checkForChange,
          enabled: true,
        }

        let changes = ExternalProviders.computed.changes.call(local)
        expect(changes).to.have.length(1)
        expect(changes).to.deep.eq([{ name: 'auth.external.enabled', value: true }])

        local.enabled = false
        local.settings[0].value = true
        changes = ExternalProviders.computed.changes.call(local)
        expect(changes).to.have.length(1)
        expect(changes).to.deep.eq([{ name: 'auth.external.enabled', value: false }])
      })

      it('enabled.change.no', () => {
        let local = {
          standard: {},
          oidc: [],
          settings: [ { name: 'auth.external.enabled', value: false } ],
          checkForChange: ExternalProviders.methods.checkForChange,
          enabled: false,
        }

        let changes = ExternalProviders.computed.changes.call(local)
        expect(changes).to.have.length(0)

        local.enabled = true
        local.settings[0].value = true
        changes = ExternalProviders.computed.changes.call(local)
        expect(changes).to.have.length(0)
      })
    })
  })

  describe('created', () => {
    it('settings.fetch', () => {
      const fetchSettings = sinon.fake()
      wrapper = mount(ExternalProviders, { ...common, methods: { fetchSettings } })
      assert(fetchSettings.calledOnce)
    })
  })

  describe('methods', () => {
    const c = { ...common, methods: { fetchSettings: () => {} } }
    describe('checkForChange', () => {
      it('false.values.invalid', () => {
        wrapper = mount(ExternalProviders, c)
        expect(wrapper.vm.checkForChange()).to.eq(undefined)

        expect(wrapper.vm.checkForChange(undefined, undefined)).to.eq(undefined)
        expect(wrapper.vm.checkForChange('name', undefined)).to.eq(undefined)
      })

      it('false.values.unChanged', () => {
        wrapper = mount(ExternalProviders, c)
        expect(wrapper.vm.checkForChange('name', 'oldValue', [ { name: 'name', value: 'oldValue' } ])).to.eq(undefined)
      })

      it('true.values.changed', () => {
        wrapper = mount(ExternalProviders, c)
        expect(wrapper.vm.checkForChange('name', 'newValue', [ { name: 'name', value: 'oldValue' } ])).to.deep.eq({ name: 'name', value: 'newValue' })
      })
    })

    describe('onSubmit', (done) => {
      let systemResolve, systemReject
      let resolve = { message: 'message' }
      it('resolve', (done) => {
        systemResolve = sinon.stub().resolves(resolve)
        wrapper = mount(ExternalProviders, { ...c, mocks: { ...mocks, $SystemAPI: { settingsUpdate: systemResolve } } })

        wrapper.vm.onSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.error).to.eq(null)
          assert(systemResolve.calledOnce)
          done()
        })
      })

      it('reject', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(ExternalProviders, { ...c, mocks: { ...mocks, $SystemAPI: { settingsUpdate: systemReject } } })

        wrapper.vm.onSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.error).to.eq('reject')
          assert(systemReject.calledOnce)
          done()
        })
      })
    })

    describe('fetchSettings', () => {
      let systemResolve, systemReject
      it('resolve', (done) => {
        const resolve = []
        systemResolve = sinon.stub().resolves(resolve)
        wrapper = mount(ExternalProviders, { ...c, methods: {}, mocks: { ...mocks, $SystemAPI: { settingsList: systemResolve } } })

        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          assert(systemResolve.calledOnceWith({ prefix }))
          done()
        })
      })

      it('resolve.standard')
      it('resolve.oidc')
      it('resolve.enabled')

      it('reject', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(ExternalProviders, { ...c, methods: {}, mocks: { ...mocks, $SystemAPI: { settingsList: systemReject } } })

        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.error).to.eq('reject')
          assert(systemReject.calledOnceWith({ prefix }))
          done()
        })
      })
    })

    it('extractKeys', () => {
      const provider = 'provider'
      let settings = []
      let base = { k1: 'v1', k2: 'v2', k3: true, k4: true }
      wrapper = mount(ExternalProviders, c)

      let expected = {}
      expect(wrapper.vm.extractKeys()).to.deep.eq(expected)

      expected = { k1: 'v1', k2: 'v2', k3: true, k4: true }
      expect(wrapper.vm.extractKeys(provider, settings, base)).to.deep.eq(expected)

      settings = [{ name: `${stdPrefix}provider.k1`, value: 'nv1' }, { name: `${stdPrefix}provider.k4`, value: false }]
      expected = { k1: 'nv1', k2: 'v2', k3: true, k4: false }
      expect(wrapper.vm.extractKeys(provider, settings, base)).to.deep.eq(expected)
    })
  })
})
