/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Compose from 'corteza-webapp-admin/src/views/Settings/Compose'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Settings/Compose.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $ComposeAPI
  beforeEach(() => {
    $ComposeAPI = {
      settingsUpdate: sinon.stub().resolves(),
      settingsList: sinon.stub().resolves(),
    }

    sinon.stub(Compose, 'created')
  })

  const mountCompose = (opt) => shallowMount(Compose, {
    mocks: { $ComposeAPI },
    ...opt,
  })

  describe('update compose settings', () => {
    it('on success', async () => {
      const wrap = mountCompose()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($ComposeAPI.settingsUpdate)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $ComposeAPI.settingsUpdate = stdReject()
      const wrap = mountCompose()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($ComposeAPI.settingsUpdate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('fetch compose settings', () => {
    it('on success - set internal compose settings', async () => {
      const settings = [
        { name: 'panel.namespace-switcher', value: false },
        { name: 'file.max-size', value: 100 },
        { name: 'file.type.whitelist', value: [] },
      ]

      const internalSettings = {
        'panel.namespace-switcher': false,
        'file.max-size': 100,
        'file.type.whitelist': [],
      }
      $ComposeAPI.settingsList = sinon.stub().resolves(settings)
      const wrap = mountCompose()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.settings).to.deep.eq(internalSettings)
      sinon.assert.calledOnce($ComposeAPI.settingsList)

      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $ComposeAPI.settingsList = stdReject()
      const wrap = mountCompose()
      wrap.vm.fetchSettings()

      await fp()
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('convert whitelist', () => {
    it('to external form', async () => {
      const wrap = mountCompose()
      const cases = [
        { input: 'text/plain,text/csv', result: ['text/plain', 'text/csv'] },
        { input: 'text/plain,text,csv', result: ['text/plain'] },
        { input: 'text/plain,,text/csv,text', result: ['text/plain', 'text/csv'] },
        { input: false, result: [] },
        { input: null, result: [] },
        { input: undefined, result: [] },
      ]
      cases.map(({ input, result }) => {
        wrap.setData({ fileWhitelist: input })
        expect(wrap.vm.settings['file.type.whitelist']).to.deep.eq(result)
      })
    })

    it('to internal form', async () => {
      const wrap = mountCompose()
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
          'file.type.whitelist': [],
        },
      })
      cases.map(({ input, result }) => {
        wrap.setData({
          settings: {
            'file.type.whitelist': input,
          },
        })
        expect(wrap.vm.fileWhitelist).to.eq(result)
      })
    })
  })
})
