/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Index from 'corteza-webapp-admin/src/views/Applications/Index'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Applications/Index.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, $router
  beforeEach(() => {
    $SystemAPI = {
      applicationList: sinon.stub().resolves(),
    }
    $router = {
      push: sinon.fake(),
    }
  })

  const mountIndex = (opt) => shallowMount(Index, {
    mocks: { $SystemAPI, $router },
    ...opt,
  })

  describe('fetch applications', () => {
    it('on success - set applications', async () => {
      sinon.stub(Index, 'created')
      let set = [{}, {}]
      $SystemAPI.applicationList = sinon.stub().resolves({ set })
      const wrap = mountIndex()
      wrap.vm.fetchApplications()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationList)
      expect(wrap.find('.application').exists()).to.be.true
      expect(wrap.findAll('.application')).have.length(2)
    })

    it('on error - set error flag', async () => {
      sinon.stub(Index, 'created')
      $SystemAPI.applicationList = stdReject()
      const wrap = mountIndex()
      wrap.vm.fetchApplications()

      await fp()
      sinon.assert.calledOnce($SystemAPI.applicationList)
      expect(wrap.find('.application').exists()).to.be.false
      expect(wrap.vm.error).to.not.be.null
    })

    it('on init', () => {
      const fetchApplications = sinon.fake()
      mountIndex({ methods: { fetchApplications } })

      sinon.assert.calledOnce(fetchApplications)
    })

    it('on update', () => {
      sinon.stub(Index, 'created')
      const fetchApplications = sinon.fake()
      const wrap = mountIndex({ methods: { fetchApplications } })

      wrap.vm.onUpdate()
      sinon.assert.calledOnce(fetchApplications)
    })
  })

  it('on create role - redirect', () => {
    sinon.stub(Index, 'created')
    const wrap = mountIndex()

    wrap.vm.onCreate()
    sinon.assert.calledOnce($router.push)
  })
})
