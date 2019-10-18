/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Email from 'corteza-webapp-admin/src/views/Settings/Email'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Settings/Email.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI
  beforeEach(() => {
    $SystemAPI = {
      settingsUpdate: sinon.stub().resolves(),
      settingsList: sinon.stub().resolves(),
    }

    sinon.stub(Email, 'created')
  })

  const mountEmail = (opt) => shallowMount(Email, {
    mocks: { $SystemAPI },
    ...opt,
  })

  describe('update email settings', () => {
    it('on success', async () => {
      const wrap = mountEmail()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.settingsUpdate)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.settingsUpdate = stdReject()
      const wrap = mountEmail()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.settingsUpdate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('fetch email settings', () => {
    it('on success - set internal email settings', async () => {
      const settings = [
        { name: 'mail.header.en', value: 'defaultHeader' },
        { name: 'mail.footer.en', value: 'defaultFooter' },
      ]

      const internalSettings = {
        'mail.header.en': 'defaultHeader',
        'mail.footer.en': 'defaultFooter',
      }
      $SystemAPI.settingsList = sinon.stub().resolves(settings)
      const wrap = mountEmail()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.settings).to.deep.eq(internalSettings)
      sinon.assert.calledOnce($SystemAPI.settingsList)

      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.settingsList = stdReject()
      const wrap = mountEmail()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })
})
