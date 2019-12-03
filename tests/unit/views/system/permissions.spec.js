/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Permissions from 'corteza-webapp-admin/src/views/System/Permissions/Index'
import CPermissionList from 'corteza-webapp-admin/src/components/Permissions/CPermissionList'
import { fullMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/System/Permissions/Index.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, propsData, $router, $store, stdReject, localStorage

  beforeEach(() => {
    localStorage = {
      getItem: () => {},
      setItem: () => {},
    }
    global.localStorage = localStorage
    $SystemAPI = {
      permissionsList: sinon.stub().resolves([]),
      permissionsRead: sinon.stub().resolves([]),
      permissionsEffective: sinon.stub().resolves([]),
      permissionsUpdate: sinon.stub().resolves({}),
    }
    $router = { push: sinon.spy() }
    $store = {
      dispatch: sinon.fake(),
    }
    stdReject = sinon.stub()
  })

  const mountPermissions = (opt) => fullMount(Permissions, {
    mocks: { $SystemAPI, $router, $store },
    methods: { stdReject },
    propsData,
    ...opt,
  })

  describe('fetch roles and permissions', () => {
    it('fetch on load', async () => {
      $SystemAPI.permissionsList = sinon.stub().resolves([
        { resource: 'system', operation: 'access' },
      ])

      $SystemAPI.roleList = sinon.stub().resolves({
        set: [
          { handle: 'everyone', roleID: '1' },
        ],
      })

      $SystemAPI.permissionsRead = sinon.stub().resolves([
        { roleID: '1', resource: 'system', operation: 'access', access: 'allow' },
      ])

      const wrap = mountPermissions()

      await fp()

      sinon.assert.calledOnce($SystemAPI.permissionsList)
      sinon.assert.calledOnce($SystemAPI.roleList)
      sinon.assert.calledOnce($SystemAPI.permissionsRead)

      const pl = wrap.find(CPermissionList)
      const props = pl.props()
      expect(props.roles).to.have.length(1)
      expect(props.permissions).to.have.keys('system/')
      expect(props.rolePermissions).to.have.length(1)
    })

    it('include system defined roles', async () => {
      $SystemAPI.permissionsList = sinon.stub().resolves([])
      $SystemAPI.roleList = sinon.stub().resolves({
        set: [
          { handle: 'everyone', roleID: '1' },
          { handle: 'admin', roleID: '2' },
          { handle: 'new', roleID: '3' },
        ],
      })

      $SystemAPI.permissionsRead = sinon.stub().resolves([])

      const wrap = mountPermissions()
      await fp()

      const pl = wrap.find(CPermissionList)
      const props = pl.props()
      expect(props.roles).to.have.length(2)
      expect(props.roles[0].roleID).to.eq('1')
      expect(props.roles[1].roleID).to.eq('2')
    })

    it('include user-selected roles', async () => {
      $SystemAPI.permissionsList = sinon.stub().resolves([])
      $SystemAPI.roleList = sinon.stub().resolves({
        set: [
          { handle: 'everyone', roleID: '1' },
          { handle: 'admin', roleID: '2' },
          { handle: 'new', roleID: '3' },
        ],
      })
      $SystemAPI.permissionsRead = sinon.stub().resolves([])
      localStorage.getItem = sinon.stub().returns('["3"]')

      const wrap = mountPermissions()
      await fp()

      const pl = wrap.find(CPermissionList)
      const props = pl.props()
      expect(props.roles).to.have.length(3)
    })
  })

  describe('add role to table', () => {
    it('store to localStorage', async () => {
      $SystemAPI.permissionsList = sinon.stub().resolves([])
      $SystemAPI.roleList = sinon.stub().resolves({
        set: [
          { handle: 'everyone', roleID: '1' },
          { handle: 'admin', roleID: '2' },
          { handle: 'new', roleID: '3' },
        ],
      })
      $SystemAPI.permissionsRead = sinon.stub().resolves([])
      localStorage.setItem = sinon.stub().returns()

      const wrap = mountPermissions()
      await fp()

      const pl = wrap.find(CPermissionList)
      pl.vm.$emit('add', { roleID: '3' })

      sinon.assert.calledOnce(localStorage.setItem)
      const roles = localStorage.setItem.args.pop().pop()
      expect(roles).to.eq('["3"]')
    })
  })
})
