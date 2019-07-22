/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Application from 'corteza-webapp-admin/src/views/Applications/Application'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Applications/Application.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, propsData, $router
  beforeEach(() => {
    $SystemAPI = {
      applicationRead: sinon.stub().resolves({}),
      applicationDelete: sinon.stub().resolves({}),
      applicationUpdate: sinon.stub().resolves({}),
      applicationCreate: sinon.stub().resolves({}),
    }
    propsData = {
      applicationID: 'applicationID',
    }
    $router = { push: sinon.spy() }
    sinon.stub(Application, 'watch').get(() => ({}))
  })

  const mountApplication = (opt) => shallowMount(Application, {
    mocks: { $SystemAPI, $router },
    propsData,
    ...opt,
  })

  describe('fetch application', () => {
    it('on success - update application', async () => {
      $SystemAPI.applicationRead = sinon.stub().resolves({ applicationID: 'applicationID' })
      const wrap = mountApplication()
      wrap.vm.fetchApplication()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationRead)
      expect(wrap.vm.application).to.not.deep.eq({})
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.applicationRead = stdReject()
      const wrap = mountApplication()
      wrap.vm.fetchApplication()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationRead)
      expect(wrap.vm.error).to.not.eq(null)
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('delete application', () => {
    it('on success - redirect', async () => {
      const wrap = mountApplication()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationDelete)
      sinon.assert.calledOnce($router.push)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.applicationDelete = stdReject()
      const wrap = mountApplication()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationDelete)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('check if submittable', () => {
    it('check all cases', () => {
      let test = [
        [false, false, true],
        [false, true, false],
        [true, false, true],
        [true, true, true],
      ]

      for (const [ processing, validConfig, expected ] of test) {
        expect(Application.computed.disableSubmit.call({ processing, validConfig })).to.eq(expected)
      }
    })
  })

  describe('update application', () => {
    it('on success - update application', async () => {
      $SystemAPI.applicationUpdate = sinon.stub().resolves({ applicationID: 'applicationID' })
      const wrap = mountApplication()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationUpdate)
      expect(wrap.vm.application).to.not.deep.eq({})
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.applicationUpdate = stdReject()
      const wrap = mountApplication()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationUpdate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('create application', () => {
    it('on success - redirect', async () => {
      propsData.applicationID = undefined
      const wrap = mountApplication()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationCreate)
      sinon.assert.calledOnce($router.push)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      propsData.applicationID = undefined
      $SystemAPI.applicationCreate = stdReject()
      const wrap = mountApplication()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationCreate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('determine if config is valid', () => {
    let local
    it('no unify - valid', () => {
      local = { application: {} }
      expect(Application.computed.validConfig.call(local)).to.eq(true)
    })

    it('unify & no config - valid', () => {
      local = { application: { unify: {} } }
      expect(Application.computed.validConfig.call(local)).to.eq(true)
    })

    it('unify & config malformed - invalid', () => {
      local = { application: { unify: { config: '{malformed]' } } }
      expect(Application.computed.validConfig.call(local)).to.eq(false)
    })

    it('unify & config - valid', () => {
      local = { application: { unify: { config: '{"valid": true}' } } }
      expect(Application.computed.validConfig.call(local)).to.eq(true)
    })
  })

  describe('determine config\'s state', () => {
    it('config not valid', () => {
      let local = { application: {} }
      expect(Application.computed.configState.call(local)).to.be.null
    })

    it('config valid', () => {
      let local = { application: { unify: { config: '{"valid": true}' } } }
      expect(Application.computed.configState.call(local)).to.not.be.null
    })
  })
})
