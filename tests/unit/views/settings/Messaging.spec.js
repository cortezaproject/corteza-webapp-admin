/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Messaging from 'corteza-webapp-admin/src/views/Settings/Messaging'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Settings/Messaging.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $MessagingAPI
  beforeEach(() => {
    $MessagingAPI = {
      settingsUpdate: sinon.stub().resolves(),
      settingsList: sinon.stub().resolves(),
    }

    sinon.stub(Messaging, 'created')
  })

  const mountMessaging = (opt) => shallowMount(Messaging, {
    mocks: { $MessagingAPI },
    ...opt,
  })

  describe('update messaging settings', () => {
    it('on success', async () => {
      const wrap = mountMessaging()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($MessagingAPI.settingsUpdate)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $MessagingAPI.settingsUpdate = stdReject()
      const wrap = mountMessaging()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($MessagingAPI.settingsUpdate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('fetch messaging settings', () => {
    it('on success - set internal messaging settings', async () => {
      const settings = [
        { name: 'emoji.enabled', value: true },
        { name: 'message.attachment.enabled', value: true },
        { name: 'message.attachment.source.gallery.enabled', value: true },
        { name: 'message.attachment.source.camera.enabled', value: true },
        { name: 'message.attachment.max-size', value: 10 },
        { name: 'message.attachment.type.whitelist', value: [] },
        { name: 'notification.enabled', value: true },
        // eslint-disable-next-line
        { name: 'notification.header.template', value: '${user} in ${channel} | Corteza' },
        { name: 'notification.message.max-length', value: 200 },
      ]

      const internalSettings = {
        'emoji.enabled': true,
        'message.attachment.enabled': true,
        'message.attachment.source.gallery.enabled': true,
        'message.attachment.source.camera.enabled': true,
        'message.attachment.max-size': 10,
        'message.attachment.type.whitelist': [],
        'notification.enabled': true,
        // eslint-disable-next-line
        'notification.header.template': '${user} in ${channel} | Corteza',
        'notification.message.max-length': 200,
      }
      $MessagingAPI.settingsList = sinon.stub().resolves(settings)
      const wrap = mountMessaging()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.settings).to.deep.eq(internalSettings)
      sinon.assert.calledOnce($MessagingAPI.settingsList)

      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $MessagingAPI.settingsList = stdReject()
      const wrap = mountMessaging()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('convert whitelist', () => {
    it('to external form', async () => {
      const wrap = mountMessaging()
      const cases = [
        { input: 'text/plain,text/csv', result: ['text/plain', 'text/csv'] },
        { input: 'text/plain,text,csv', result: ['text/plain'] },
        { input: 'text/plain,,text/csv,text', result: ['text/plain', 'text/csv'] },
        { input: false, result: [] },
        { input: null, result: [] },
        { input: undefined, result: [] },
      ]
      cases.map(({ input, result }) => {
        wrap.setData({ attachmentWhitelist: input })
        expect(wrap.vm.settings['message.attachment.type.whitelist']).to.deep.eq(result)
      })
    })

    it('to internal form', async () => {
      const wrap = mountMessaging()
      const cases = [
        { input: ['text/plain', 'text/csv'], result: 'text/plain, text/csv' },
        { input: [], result: '' },
        { input: '', result: '' },
        { input: false, result: '' },
        { input: null, result: '' },
        { input: undefined, result: '' },
      ]
      wrap.setData({
        settings: {
          'message.attachment.type.whitelist': [],
        },
      })
      cases.map(({ input, result }) => {
        wrap.setData({
          settings: {
            'message.attachment.type.whitelist': input,
          },
        })
        expect(wrap.vm.attachmentWhitelist).to.eq(result)
      })
    })
  })
})
