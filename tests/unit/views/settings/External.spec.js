/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import ExternalProviders from 'corteza-webapp-admin/src/views/Settings/External'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Settings/External.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  const prefix = 'auth.external'
  const stdPrefix = `${prefix}.providers.`
  const oidcPrefix = `${prefix}.providers.openid-connect.`

  let $SystemAPI
  beforeEach(() => {
    $SystemAPI = {
      settingsUpdate: sinon.stub().resolves(),
      settingsList: sinon.stub().resolves(),
    }

    sinon.stub(ExternalProviders, 'created')
  })

  const mountEP = (opt) => shallowMount(ExternalProviders, {
    mocks: { $SystemAPI },
    ...opt,
  })

  describe('update auth settings', () => {
    describe('check if submittable', () => {
      it('no changes - not submittable', () => {
        const wrap = mountEP({ computed: { changes: sinon.stub().returns([]) } })
        wrap.setData({ processing: false })
        expect(wrap.vm.submittable).to.be.false
      })

      it('processing - not submittable', () => {
        const wrap = mountEP()
        wrap.setData({ processing: true })
        expect(wrap.vm.submittable).to.be.false
      })

      it('changes & not processing - submittable', () => {
        const wrap = mountEP({ computed: { changes: sinon.stub().returns([{}]) } })
        wrap.setData({ processing: false })
        expect(wrap.vm.submittable).to.be.true
      })
    })

    it('on success', async () => {
      const wrap = mountEP()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.settingsUpdate)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.settingsUpdate = stdReject()
      const wrap = mountEP()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.settingsUpdate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('fetch settings', () => {
    it('filter for oidc providers', () => {
      let tests = [
        // [settings], [expected]
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

    it('extract keys helper', () => {
      const fnc = ExternalProviders.methods.extractKeys
      const provider = 'provider'
      let settings = []
      let base = { k1: 'v1', k2: 'v2', k3: true, k4: true }

      let expected = {}
      expect(fnc()).to.deep.eq(expected)

      expected = { k1: 'v1', k2: 'v2', k3: true, k4: true }
      expect(fnc(provider, settings, base)).to.deep.eq(expected)

      settings = [{ name: `${stdPrefix}provider.k1`, value: 'nv1' }, { name: `${stdPrefix}provider.k4`, value: false }]
      expected = { k1: 'nv1', k2: 'v2', k3: true, k4: false }
      expect(fnc(provider, settings, base)).to.deep.eq(expected)
    })

    it('on success - set external auth configuration', async () => {
      const oidcProviders = sinon.stub().returns(['oidc1'])
      const settings = [
        { name: `${prefix}.enabled`, value: true },

        { name: `${stdPrefix}facebook.key`, value: 'fbKey' },
        { name: `${stdPrefix}facebook.secret`, value: 'fbSecret' },
        { name: `${stdPrefix}facebook.enabled`, value: true },

        { name: `${oidcPrefix}oidc1.enabled`, value: true },
        { name: `${oidcPrefix}oidc1.issuer`, value: 'oidc1Issuer' },
        { name: `${oidcPrefix}oidc1.key`, value: 'oidc1Key' },
        { name: `${oidcPrefix}oidc1.secret`, value: 'oidc1Secret' },
      ]
      $SystemAPI.settingsList = sinon.stub().resolves(settings)
      const wrap = mountEP({ computed: { oidcProviders } })
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.oidc).to.have.length(1)
      expect(wrap.vm.oidc[0]).to.deep.eq({ handle: 'oidc1', enabled: true, issuer: 'oidc1Issuer', key: 'oidc1Key', secret: 'oidc1Secret' })

      expect(wrap.vm.standard.facebook).to.deep.eq({ enabled: true, key: 'fbKey', secret: 'fbSecret' })

      expect(wrap.vm.enabled).to.be.true

      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.settingsList = stdReject()
      const wrap = mountEP()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('check for changes', () => {
    describe('check for change helper', () => {
      const fnc = ExternalProviders.methods.checkForChange

      it('invalid params', () => {
        expect(fnc()).to.eq(undefined)
        expect(fnc(undefined, undefined)).to.eq(undefined)
        expect(fnc('name', undefined)).to.eq(undefined)
      })

      it('unchanged values', () => {
        let test = [
          ['oldValue', 'oldValue'],
          [true, true],
          [false, false],
        ]
        for (const [newV, oldV] of test) {
          expect(fnc('name', newV, [ { name: 'name', value: oldV } ])).to.eq(undefined)
        }
      })

      it('changed values', () => {
        let test = [
          ['newValue', 'oldValue', 'newValue'],
          [true, false, true],
          [false, true, false],
        ]

        for (const [newV, oldV, expected] of test) {
          expect(fnc('name', newV, [ { name: 'name', value: oldV } ])).to.deep.eq({ name: 'name', value: expected })
        }
      })
    })

    it('over standard', () => {
      let local = {
        oidc: [],
        standard: { std1: { key: 'nk1', secret: 'ns1', enabled: true } },
        settings: [ { name: `${stdPrefix}std1.key`, value: 'ok1' }, { name: `${stdPrefix}std1.secret`, value: 'os1' }, { name: `${stdPrefix}std1.enabled`, value: true }, { name: `${prefix}.enabled`, value: true } ],
        checkForChange: ExternalProviders.methods.checkForChange,
        enabled: true,
      }

      let changes = ExternalProviders.computed.changes.call(local)
      expect(changes).to.have.length(2)
      expect(changes).to.deep.eq([{ name: `${stdPrefix}std1.key`, value: 'nk1' }, { name: `${stdPrefix}std1.secret`, value: 'ns1' }])
    })

    it('over oidc', () => {
      let local = {
        standard: {},
        oidc: [ { handle: 'h1', key: 'nk1', secret: 'os1', enabled: false } ],
        settings: [ { name: `${oidcPrefix}h1.key`, value: 'ok1' }, { name: `${oidcPrefix}h1.secret`, value: 'os1' }, { name: `${oidcPrefix}h1.issuer`, value: 'oi1' }, { name: 'auth.external.enabled', value: true } ],
        checkForChange: ExternalProviders.methods.checkForChange,
        enabled: true,
      }

      let changes = ExternalProviders.computed.changes.call(local)
      expect(changes).to.have.length(3)
      expect(changes).to.deep.eq([{ name: `${oidcPrefix}h1.key`, value: 'nk1' }, { name: `${oidcPrefix}h1.enabled`, value: false }, { name: `${oidcPrefix}h1.issuer`, value: undefined }])
    })

    it('over enabled flag - changed', () => {
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
    })

    it('over enabled flag - unchanged', () => {
      let local = {
        standard: {},
        oidc: [],
        settings: [ { name: 'auth.external.enabled', value: true } ],
        checkForChange: ExternalProviders.methods.checkForChange,
        enabled: true,
      }

      let changes = ExternalProviders.computed.changes.call(local)
      expect(changes).to.have.length(0)
    })

    it('tell if submittable', () => {
      let test = [
        [ false, false, false ],
        [ false, true, false ],
        [ true, false, true ],
        [ true, true, false ],
      ]
      for (const [dirty, processing, expected] of test) {
        expect(ExternalProviders.computed.submittable.call({ dirty, processing })).to.eq(expected)
      }
    })
  })
})
