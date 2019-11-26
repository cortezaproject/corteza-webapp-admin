/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Settings from 'corteza-webapp-admin/src/views/Messaging/Settings/Index'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Messaging/Settings/Index.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $MessagingAPI, propsData, $router, $store, stdReject

  beforeEach(() => {
    $MessagingAPI = {
      settingsUpdate: sinon.stub().resolves(),
      settingsList: sinon.stub().resolves(),
    }
    $router = { push: sinon.spy() }
    $store = {
      dispatch: sinon.fake(),
    }
    sinon.stub(Settings, 'created')
    stdReject = sinon.stub()
  })

  const mountSettings = (opt) => shallowMount(Settings, {
    mocks: { $MessagingAPI, $router, $store },
    methods: { stdReject },
    propsData,
    ...opt,
  })

  describe('fetch settings', () => {
    it('on success', async () => {
      const settings = [
        { name: 'messaging.settings.enabled', value: true },
      ]

      $MessagingAPI.settingsList = sinon.stub().resolves(settings)
      const wrap = mountSettings()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.settings).to.deep.eq({ 'messaging.settings.enabled': true })
      sinon.assert.calledOnce($MessagingAPI.settingsList)
    })

    it('on error - set error flag', async () => {
      $MessagingAPI.settingsList = sinon.stub().rejects()
      const wrap = mountSettings()
      wrap.vm.fetchSettings()

      await fp()
      sinon.assert.calledOnce($MessagingAPI.settingsList)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('update basic settings', () => {
    it('on success', async () => {
      const wrap = mountSettings()
      wrap.vm.onBasicSubmit({ 'messaging.settings.enabled': true })

      await fp()
      sinon.assert.calledOnce($MessagingAPI.settingsUpdate)
      expect(wrap.vm.basic.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $MessagingAPI.settingsUpdate = sinon.stub().rejects()
      const wrap = mountSettings()
      wrap.vm.onBasicSubmit({ 'messaging.settings.enabled': true })

      await fp()
      sinon.assert.calledOnce($MessagingAPI.settingsUpdate)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.basic.processing).to.be.false
    })
  })
})
