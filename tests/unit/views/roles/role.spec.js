/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Role from 'corteza-webapp-admin/src/views/Roles/Role'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Roles/Role.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, propsData, $router
  beforeEach(() => {
    $SystemAPI = {
      roleRead: sinon.stub().resolves({}),
      roleMemberList: sinon.stub().resolves(),
      roleDelete: sinon.stub().resolves({}),
      roleUpdate: sinon.stub().resolves({}),
      roleCreate: sinon.stub().resolves({}),
    }
    propsData = {
      roleID: 'roleID',
    }
    $router = { push: sinon.spy() }

    sinon.stub(Role, 'watch').get(() => ({}))
  })

  const mountRole = (opt) => shallowMount(Role, {
    mocks: { $SystemAPI, $router },
    propsData,
    ...opt,
  })

  describe('fetch role', () => {
    it('on success - set role and members', async () => {
      const role = { roleID: 'roleID' }
      const members = [ { userID: 'userID1' }, { userID: 'userID2' } ]
      $SystemAPI.roleRead = sinon.stub().resolves(role)
      $SystemAPI.roleMemberList = sinon.stub().resolves(members)
      const wrap = mountRole()
      wrap.vm.fetchRole()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleRead)
      sinon.assert.calledOnce($SystemAPI.roleMemberList)
      expect(wrap.vm.role).to.not.deep.eq({})
      expect(wrap.vm.members).to.not.deep.eq([])
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - role - set error flag', async () => {
      $SystemAPI.roleRead = stdReject()
      const wrap = mountRole()
      wrap.vm.fetchRole()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleRead)
      sinon.assert.notCalled($SystemAPI.roleMemberList)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - members - set error flag', async () => {
      $SystemAPI.roleMemberList = stdReject()
      const wrap = mountRole()
      wrap.vm.fetchRole()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleRead)
      sinon.assert.calledOnce($SystemAPI.roleMemberList)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('delete role', () => {
    it('on success - redirect', async () => {
      const wrap = mountRole()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleDelete)
      sinon.assert.calledOnce($router.push)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.roleDelete = stdReject()
      const wrap = mountRole()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleDelete)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('update role', () => {
    it('on success', async () => {
      const wrap = mountRole()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUpdate)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.roleUpdate = stdReject()
      const wrap = mountRole()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUpdate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('create role', () => {
    it('on success - redirect', async () => {
      propsData.roleID = undefined
      const wrap = mountRole()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleCreate)
      sinon.assert.calledOnce($router.push)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      propsData.roleID = undefined
      $SystemAPI.roleCreate = stdReject()
      const wrap = mountRole()
      wrap.vm.onSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleCreate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })
})
