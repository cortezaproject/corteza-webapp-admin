/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Settings from 'corteza-webapp-admin/src/views/Compose/Settings/Index'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Compose/Settings/Index.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $ComposeAPI, propsData, $router, $store, stdReject

  beforeEach(() => {
    $ComposeAPI = {
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
    mocks: { $ComposeAPI, $router, $store },
    methods: { stdReject },
    propsData,
    ...opt,
  })

  describe('fetch settings', () => {
    it('on success', async () => {
      const settings = [
        { name: 'compose.settings.enabled', value: true },
      ]

      $ComposeAPI.settingsList = sinon.stub().resolves(settings)
      const wrap = mountSettings()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.settings).to.deep.eq({ 'compose.settings.enabled': true })
      sinon.assert.calledOnce($ComposeAPI.settingsList)
    })

    it('on error - set error flag', async () => {
      $ComposeAPI.settingsList = sinon.stub().rejects()
      const wrap = mountSettings()
      wrap.vm.fetchSettings()

      await fp()
      sinon.assert.calledOnce($ComposeAPI.settingsList)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('update basic settings', () => {
    it('on success', async () => {
      const wrap = mountSettings()
      wrap.vm.onBasicSubmit({ 'compose.settings.enabled': true })

      await fp()
      sinon.assert.calledOnce($ComposeAPI.settingsUpdate)
      expect(wrap.vm.basic.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $ComposeAPI.settingsUpdate = sinon.stub().rejects()
      const wrap = mountSettings()
      wrap.vm.onBasicSubmit({ 'compose.settings.enabled': true })

      await fp()
      sinon.assert.calledOnce($ComposeAPI.settingsUpdate)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.basic.processing).to.be.false
    })
  })
})
