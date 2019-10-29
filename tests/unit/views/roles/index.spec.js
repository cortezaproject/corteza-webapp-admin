/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Index from 'corteza-webapp-admin/src/views/Roles/Index'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Roles/Index.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, $router
  beforeEach(() => {
    $SystemAPI = {
      roleList: sinon.stub().resolves(),
    }
    $router = {
      push: sinon.fake(),
    }
  })

  const mountIndex = (opt) => shallowMount(Index, {
    mocks: { $SystemAPI, $router },
    ...opt,
  })

  it('generate list\'s title', () => {
    expect(Index.computed.title.call({ roles: [] })).to.include('(0)')
    expect(Index.computed.title.call({ roles: [{}] })).to.include('(1)')
  })

  describe('fetch roles', () => {
    it('on success - filter and set roles', async () => {
      sinon.stub(Index, 'created')
      let set = [
        { roleID: '1' }, // removed
        { roleID: '2' },
        { roleID: '3' },
      ]
      $SystemAPI.roleList = sinon.stub().resolves({ set })
      const wrap = mountIndex()
      wrap.vm.fetchRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      expect(wrap.find('.role').exists()).to.be.true
      expect(wrap.findAll('.role')).have.length(2)
    })

    it('on error - set error flag', async () => {
      sinon.stub(Index, 'created')
      $SystemAPI.roleList = stdReject()
      const wrap = mountIndex()
      wrap.vm.fetchRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      expect(wrap.find('.role').exists()).to.be.false
      expect(wrap.vm.error).to.not.be.null
    })

    it('on init', () => {
      const fetchRoles = sinon.fake()
      mountIndex({ methods: { fetchRoles } })

      sinon.assert.calledOnce(fetchRoles)
    })

    it('on update', () => {
      sinon.stub(Index, 'created')
      const fetchRoles = sinon.fake()
      const wrap = mountIndex({ methods: { fetchRoles } })

      wrap.vm.onUpdate()
      sinon.assert.calledOnce(fetchRoles)
    })
  })

  it('on create role - redirect', () => {
    sinon.stub(Index, 'created')
    const wrap = mountIndex()

    wrap.vm.onCreate()
    sinon.assert.calledOnce($router.push)
  })
})
