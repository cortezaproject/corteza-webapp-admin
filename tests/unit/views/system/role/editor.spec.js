/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Editor from 'corteza-webapp-admin/src/views/System/Role/Editor'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Role/Editor.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, propsData, $router, $store, stdReject
  beforeEach(() => {
    $SystemAPI = {
      roleRead: sinon.stub().resolves({}),
      roleMemberList: sinon.stub().resolves(),
      roleDelete: sinon.stub().resolves({}),
      roleUndelete: sinon.stub().resolves({}),
      roleUpdate: sinon.stub().resolves({}),
      roleCreate: sinon.stub().resolves({}),
      roleArchive: sinon.stub().resolves({}),
      roleUnarchive: sinon.stub().resolves({}),
    }
    propsData = {
      roleID: 'roleID',
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

  describe('fetch role', () => {
    it('on success - set role and members', async () => {
      const role = { roleID: 'roleID' }
      const roleMembers = [ { roleID: 'roleID1' }, { roleID: 'roleID2' } ]
      $SystemAPI.roleRead = sinon.stub().resolves(role)
      $SystemAPI.roleMemberList = sinon.stub().resolves(roleMembers)
      const wrap = mountEditor()
      wrap.vm.fetchRole()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleRead)
      sinon.assert.calledOnce($SystemAPI.roleMemberList)
      expect(wrap.vm.role).to.not.deep.eq({})
      expect(wrap.vm.roleMembers).to.not.eq(null)
    })

    it('on error - role - set error flag', async () => {
      $SystemAPI.roleRead = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.fetchRole()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleRead)
      sinon.assert.notCalled($SystemAPI.roleMemberList)
      sinon.assert.calledOnce(stdReject)
    })

    it('on error - members - set error flag', async () => {
      $SystemAPI.roleMemberList = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.fetchRole()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleRead)
      sinon.assert.calledOnce($SystemAPI.roleMemberList)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('delete role', () => {
    it('on success - redirect', async () => {
      const wrap = mountEditor()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleDelete)
      sinon.assert.calledOnce($SystemAPI.roleRead)
    })

    it('on error - set error flag', async () => {
      $SystemAPI.roleDelete = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleDelete)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('undelete role', () => {
    it('on success - redirect', async () => {
      const wrap = mountEditor()
      const role = { deletedAt: 'TIME' }
      wrap.setData({ role })
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUndelete)
      sinon.assert.calledOnce($SystemAPI.roleRead)
    })

    it('on error - set error flag', async () => {
      $SystemAPI.roleUndelete = sinon.stub().rejects()
      const wrap = mountEditor()
      const role = { deletedAt: 'TIME' }
      wrap.setData({ role })
      wrap.vm.onDelete()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUndelete)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('update role info', () => {
    it('on success', async () => {
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUpdate)
      expect(wrap.vm.info.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      $SystemAPI.roleUpdate = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUpdate)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.info.processing).to.be.false
    })
  })

  describe('create role', () => {
    it('on success - redirect', async () => {
      propsData.roleID = undefined
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleCreate)
      sinon.assert.calledOnce($router.push)
      expect(wrap.vm.info.processing).to.be.false
    })

    it('on error - set error flag', async () => {
      propsData.roleID = undefined
      $SystemAPI.roleCreate = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onInfoSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleCreate)
      sinon.assert.calledOnce(stdReject)
      expect(wrap.vm.info.processing).to.be.false
    })
  })

  describe('status change', () => {
    it('on success - unarchive - re-fetch role', async () => {
      const wrap = mountEditor()
      const role = { archivedAt: 'TIME' }
      wrap.setData({ role })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUnarchive)
      sinon.assert.calledOnce($SystemAPI.roleRead)
    })

    it('on error - unarchive - set error flag', async () => {
      $SystemAPI.roleUnarchive = sinon.stub().rejects()
      const wrap = mountEditor()
      const role = { archivedAt: 'TIME' }
      wrap.setData({ role })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUnarchive)
      sinon.assert.calledOnce(stdReject)
    })

    it('on success - archive - re-fetch role', async () => {
      const wrap = mountEditor()
      const role = { archivedAt: undefined }
      wrap.setData({ role })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleArchive)
      sinon.assert.calledOnce($SystemAPI.roleRead)
    })

    it('on error - archive - set error flag', async () => {
      $SystemAPI.roleArchive = sinon.stub().rejects()
      const wrap = mountEditor()
      const role = { archivedAt: undefined }
      wrap.setData({ role })
      wrap.vm.onStatusChange()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleArchive)
      sinon.assert.calledOnce(stdReject)
    })
  })

  describe('members update', () => {
    it('on success - re-fetch role', async () => {
      const wrap = mountEditor()
      wrap.vm.onMembersSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUpdate)
    })

    it('on error - set error flag', async () => {
      $SystemAPI.roleUpdate = sinon.stub().rejects()
      const wrap = mountEditor()
      wrap.vm.onMembersSubmit()

      await fp()
      sinon.assert.calledOnce($SystemAPI.roleUpdate)
      sinon.assert.calledOnce(stdReject)
    })
  })
})
