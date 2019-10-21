/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Auth from 'corteza-webapp-admin/src/views/Settings/Auth'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Settings/Auth.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI
  beforeEach(() => {
    $SystemAPI = {
      settingsUpdate: sinon.stub().resolves(),
      settingsList: sinon.stub().resolves(),
    }

    sinon.stub(Auth, 'created')
  })

  const mountAuth = (opt) => shallowMount(Auth, {
    mocks: { $SystemAPI },
    ...opt,
  })

  describe('update auth settings', () => {
    it('on success', async () => {
      const wrap = mountAuth()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.settingsUpdate)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.settingsUpdate = stdReject()
      const wrap = mountAuth()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.settingsUpdate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('fetch auth settings', () => {
    it('on success - set internal auth settings', async () => {
      const settings = [
        { name: 'auth.external.enabled', value: false },
        { name: 'auth.external.providers.facebook.enabled', value: false },
        { name: 'auth.external.providers.facebook.key', value: '' },
        { name: 'auth.external.providers.facebook.secret', value: '' },
        { name: 'auth.external.providers.github.enabled', value: false },
        { name: 'auth.external.providers.github.key', value: '' },
        { name: 'auth.external.providers.github.secret', value: '' },
        { name: 'auth.external.providers.gplus.enabled', value: false },
        { name: 'auth.external.providers.gplus.key', value: '' },
        { name: 'auth.external.providers.gplus.secret', value: '' },
        { name: 'auth.external.providers.linkedin.enabled', value: false },
        { name: 'auth.external.providers.linkedin.key', value: '' },
        { name: 'auth.external.providers.linkedin.secret', value: '' },
        { name: 'auth.external.redirect-url', value: '' },
        { name: 'auth.external.session-store-secret', value: '' },
        { name: 'auth.external.session-store-secure', value: true },
        { name: 'auth.frontend.url.base', value: 'https://api.local.cortezaproject.org/' },
        { name: 'auth.frontend.url.email-confirmation', value: 'https://api.local.cortezaproject.org/auth/confirm-email?token=' },
        { name: 'auth.frontend.url.password-reset', value: 'https://api.local.cortezaproject.org/auth/reset-password?token=' },
        { name: 'auth.frontend.url.redirect', value: 'https://api.local.cortezaproject.org/auth' },
        { name: 'auth.internal.enabled', value: true },
        { name: 'auth.internal.password-reset.enabled', value: true },
        { name: 'auth.internal.signup-email-confirmation-required', value: false },
        { name: 'auth.internal.signup.enabled', value: true },
        { name: 'auth.mail.from-address', value: 'change-me@example.tld' },
        { name: 'auth.mail.from-name', value: 'Corteza Team' },
        { name: 'auth.password-reset.enabled', value: false },
        { name: 'auth.signup-email-confirmation-required', value: false },
      ]

      const internalSettings = {
        'auth.frontend.url.base': 'https://api.local.cortezaproject.org/',
        'auth.frontend.url.email-confirmation': 'https://api.local.cortezaproject.org/auth/confirm-email?token=',
        'auth.frontend.url.password-reset': 'https://api.local.cortezaproject.org/auth/reset-password?token=',
        'auth.frontend.url.redirect': 'https://api.local.cortezaproject.org/auth',
        'auth.internal.enabled': true,
        'auth.internal.password-reset.enabled': true,
        'auth.internal.signup-email-confirmation-required': false,
        'auth.internal.signup.enabled': true,
        'auth.mail.from-address': 'change-me@example.tld',
        'auth.mail.from-name': 'Corteza Team',
        'auth.password-reset.enabled': false,
        'auth.signup-email-confirmation-required': false,
      }
      $SystemAPI.settingsList = sinon.stub().resolves(settings)
      const wrap = mountAuth()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.settings).to.deep.eq(internalSettings)
      sinon.assert.calledOnce($SystemAPI.settingsList)

      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.settingsList = stdReject()
      const wrap = mountAuth()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })
})
