/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Settings from 'corteza-webapp-admin/src/views/System/Settings/Index'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/System/Settings/Index.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, propsData, $router, $store, stdReject

  beforeEach(() => {
    $SystemAPI = {
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
    mocks: { $SystemAPI, $router, $store },
    methods: { stdReject },
    propsData,
    ...opt,
  })

  describe('fetch settings', () => {
    it('on success', async () => {
      const settings = [
        { name: 'auth.external.enabled', value: false },
      ]

      $SystemAPI.settingsList = sinon.stub().resolves(settings)
      const wrap = mountSettings()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.settings).to.deep.eq(settings)
      sinon.assert.calledOnce($SystemAPI.settingsList)
    })

    it('on error - set error flag', async () => {
      $SystemAPI.settingsList = sinon.stub().rejects()
      const wrap = mountSettings()
      wrap.vm.fetchSettings()

      await fp()
      sinon.assert.calledOnce($SystemAPI.settingsList)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('update auth settings', () => {
    it('on success', async () => {
      const wrap = mountSettings()
      wrap.vm.onAuthSubmit({ setting: 'name' })

      await fp()
      sinon.assert.calledOnce($SystemAPI.settingsUpdate)
      expect(wrap.vm.auth.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.settingsUpdate = sinon.stub().rejects()
      const wrap = mountSettings()
      wrap.vm.onAuthSubmit({ setting: 'name' })

      await fp()
      sinon.assert.calledOnce($SystemAPI.settingsUpdate)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.auth.processing).to.be.false
    })
  })
})
