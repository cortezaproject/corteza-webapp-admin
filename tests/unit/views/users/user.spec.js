/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import User from 'corteza-webapp-admin/src/views/Users/User'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Users/User.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $auth, $SystemAPI, propsData, $router
  beforeEach(() => {
    $auth = { is: sinon.stub().returns(true), check: sinon.stub().resolves() }
    $SystemAPI = {
      userRead: sinon.stub().resolves({ userID: 'userID' }),
      roleList: sinon.stub().resolves(),
      userMembershipList: sinon.stub().resolves(),
      userDelete: sinon.stub().resolves(),
      userUpdate: sinon.stub().resolves({ userID: 'userID' }),
      userCreate: sinon.stub().resolves({ userID: 'userID' }),
      userMembershipAdd: sinon.stub().resolves(),
      userMembershipRemove: sinon.stub().resolves(),
      userUnsuspend: sinon.stub().resolves(),
      userSuspend: sinon.stub().resolves(),
      userSetPassword: sinon.stub().resolves(),
    }
    propsData = {
      userID: 'userID',
    }
    $router = { push: sinon.spy() }

    sinon.stub(User, 'watch').get(() => ({}))
  })

  const mountUser = (opt) => shallowMount(User, {
    mocks: { $auth, $SystemAPI, $router },
    propsData,
    ...opt,
  })

  describe('fetch user', () => {
    it('on success - set user', async () => {
      const wrap = mountUser()
      wrap.vm.fetchUser()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userRead)
      expect(wrap.vm.user).to.not.deep.eq({})
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.userRead = stdReject()
      const wrap = mountUser()
      wrap.vm.fetchUser()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userRead)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('fetch user roles', () => {
    it('on success - set roles', async () => {
      const roleList = { set: [{ roleID: '2' }, { roleID: '3' }] }
      const userMembershipList = ['2']
      const expected = [ { roleID: '2', current: true, dirty: true }, { roleID: '3', current: false, dirty: false } ]
      $SystemAPI.roleList = sinon.stub().resolves(roleList)
      $SystemAPI.userMembershipList = sinon.stub().resolves(userMembershipList)
      const wrap = mountUser()
      wrap.vm.fetchUserRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      sinon.assert.calledOnce($SystemAPI.userMembershipList)
      expect(wrap.vm.userRoles).to.deep.eq(expected)
      expect(wrap.vm.processing).to.be.false
    })

    it('on success - ignore roleID 1', async () => {
      const roleList = { set:[{ roleID: '1' }]}
      const userMembershipList = ['1']
      const expected = []
      $SystemAPI.roleList = sinon.stub().resolves(roleList)
      $SystemAPI.userMembershipList = sinon.stub().resolves(userMembershipList)
      const wrap = mountUser()
      wrap.vm.fetchUserRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      sinon.assert.calledOnce($SystemAPI.userMembershipList)
      expect(wrap.vm.userRoles).to.deep.eq(expected)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - role list - set error flag', async () => {
      $SystemAPI.roleList = stdReject()
      const wrap = mountUser()
      wrap.vm.fetchUserRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      sinon.assert.notCalled($SystemAPI.userMembershipList)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - user membership - set error flag', async () => {
      $SystemAPI.roleList = sinon.stub().resolves({})
      $SystemAPI.userMembershipList = stdReject()
      const wrap = mountUser()
      wrap.vm.fetchUserRoles()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleList)
      sinon.assert.calledOnce($SystemAPI.userMembershipList)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('delete user', () => {
    it('on success - redirect', async () => {
      const wrap = mountUser()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userDelete)
      sinon.assert.calledOnce($router.push)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.userDelete = stdReject()
      const wrap = mountUser()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userDelete)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('update user', () => {
    it('on success - set user', async () => {
      const wrap = mountUser()
      wrap.vm.onUserSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUpdate)
      expect(wrap.vm.user).to.not.deep.eq({})
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.userUpdate = stdReject()
      const wrap = mountUser()
      wrap.vm.onUserSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUpdate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('create user', () => {
    it('on success - redirect', async () => {
      propsData.userID = undefined
      const wrap = mountUser()
      wrap.vm.onUserSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userCreate)
      sinon.assert.calledOnce($router.push)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      propsData.userID = undefined
      $SystemAPI.userCreate = stdReject()
      const wrap = mountUser()
      wrap.vm.onUserSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userCreate)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('update roles', () => {
    it('on success - re-fetch roles', async () => {
      const userRoles = [
        { roleID: '2', current: false, dirty: false },
        { roleID: '3', current: true, dirty: false },
        { roleID: '4', current: false, dirty: true },
        { roleID: '6', current: true, dirty: true },
      ]
      const fetchUserRoles = sinon.stub()
      const wrap = mountUser({ methods: { fetchUserRoles } })
      wrap.setData({ userRoles })
      wrap.vm.onRoleSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userMembershipAdd)
      sinon.assert.calledWith($SystemAPI.userMembershipAdd, { roleID: '4', userID: 'userID' })
      sinon.assert.calledOnce($SystemAPI.userMembershipRemove)
      sinon.assert.calledWith($SystemAPI.userMembershipRemove, { roleID: '3', userID: 'userID' })

      sinon.assert.calledOnce(fetchUserRoles)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - add - set error flag', async () => {
      $SystemAPI.userMembershipAdd = stdReject()
      const userRoles = [
        { roleID: '4', current: false, dirty: true },
      ]
      const wrap = mountUser()
      wrap.setData({ userRoles })
      wrap.vm.onRoleSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userMembershipAdd)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - remove - set error flag', async () => {
      $SystemAPI.userMembershipRemove = stdReject()
      const userRoles = [
        { roleID: '3', current: true, dirty: false },
      ]
      const wrap = mountUser()
      wrap.setData({ userRoles })
      wrap.vm.onRoleSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userMembershipRemove)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe.skip('status change', () => {
    it('on success - unsuspend - re-fetch user', async () => {
      const fetchUser = sinon.stub()
      const wrap = mountUser({ methods: { fetchUser } })
      const user = { suspendedAt: undefined }
      wrap.setData({ user })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUnsuspend)
      sinon.assert.calledOnce(fetchUser)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - unsuspend - set error flag', async () => {
      $SystemAPI.userUnsuspend = stdReject()
      const wrap = mountUser()
      const user = { suspendedAt: undefined }
      wrap.setData({ user })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userUnsuspend)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })

    it('on success - suspend - re-fetch user', async () => {
      const fetchUser = sinon.stub()
      const wrap = mountUser({ methods: { fetchUser } })
      const user = { suspendedAt: 'suspendedAt' }
      wrap.setData({ user })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userSuspend)
      sinon.assert.calledOnce(fetchUser)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - suspend - set error flag', async () => {
      $SystemAPI.userSuspend = stdReject()
      const wrap = mountUser()
      const user = { suspendedAt: 'suspendedAt' }
      wrap.setData({ user })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userSuspend)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })

  describe('password change', () => {
    it('on success', async () => {
      const wrap = mountUser()
      wrap.vm.onPasswordSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userSetPassword)
      expect(wrap.vm.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.userSetPassword = stdReject()
      const wrap = mountUser()
      wrap.vm.onPasswordSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userSetPassword)
      expect(wrap.vm.error).to.not.be.null
      expect(wrap.vm.processing).to.be.false
    })
  })
})
