/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Editor from 'corteza-webapp-admin/src/views/System/Application/Editor'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Application/Editor.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, propsData, $router, $store, stdReject
  beforeEach(() => {
    $SystemAPI = {
      applicationRead: sinon.stub().resolves({}),
      applicationDelete: sinon.stub().resolves({}),
      applicationUndelete: sinon.stub().resolves({}),
      applicationUpdate: sinon.stub().resolves({}),
      applicationCreate: sinon.stub().resolves({}),
    }
    propsData = {
      applicationID: 'applicationID',
    }
    $router = { push: sinon.spy() }
    $store = {
      dispatch: sinon.fake(),
    }
    sinon.stub(Editor, 'watch').get(() => ({}))
    stdReject = sinon.stub()
  })

  const mountEditor = (opt) => shallowMount(Editor, {
    mocks: { $SystemAPI, $router, $store },
    methods: { stdReject },
    propsData,
    ...opt,
  })

  describe('fetch application', () => {
    it('on success - set application', async () => {
      $SystemAPI.applicationRead = sinon.stub().resolves({ applicationID: 'applicationID' })
      const wrap = mountEditor()
      wrap.vm.fetchApplication()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationRead)
      expect(wrap.vm.application).to.not.deep.eq({})
    })

    it('on error - set error flag', async () => {
      $SystemAPI.applicationRead = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.fetchApplication()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationRead)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('delete application', () => {
    it('on success - redirect', async () => {
      const wrap = mountEditor()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationDelete)
    })

    it('on error - set error flag', async () => {
      $SystemAPI.applicationDelete = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationDelete)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('undelete application', () => {
    it('on success - redirect', async () => {
      const wrap = mountEditor()
      const application = { deletedAt: 'TIME' }
      wrap.setData({ application })
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationUndelete)
      sinon.assert.calledOnce($SystemAPI.applicationRead)
    })

    it('on error - set error flag', async () => {
      $SystemAPI.applicationUndelete = sinon.stub().rejects()
      const wrap = mountEditor()
      const application = { deletedAt: 'TIME' }
      wrap.setData({ application })
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationUndelete)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('update application', () => {
    it('on success - set application', async () => {
      $SystemAPI.applicationUpdate = sinon.stub().resolves({ applicationID: 'applicationID' })
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit({ applicationID: 'applicationID' })

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationUpdate)
      expect(wrap.vm.application).to.not.deep.eq({})
      expect(wrap.vm.info.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.applicationUpdate = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit({ applicationID: 'applicationID' })

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationUpdate)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('create application', () => {
    it('on success - redirect', async () => {
      propsData.applicationID = undefined
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationCreate)
      sinon.assert.calledOnce($router.push)
      expect(wrap.vm.info.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      propsData.applicationID = undefined
      $SystemAPI.applicationCreate = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationCreate)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.info.processing).to.be.false
    })
  })

  describe('update unify', () => {
    it('on success - redirect', async () => {
      propsData.applicationID = 'applicationID'
      const wrap = mountEditor()
      wrap.vm.onUnifySubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationUpdate)
      expect(wrap.vm.unify.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      propsData.applicationID = 'applicationID'
      $SystemAPI.applicationUpdate = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onUnifySubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationUpdate)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.info.processing).to.be.false
    })
  })
})
