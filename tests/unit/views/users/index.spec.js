/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Index from 'corteza-webapp-admin/src/views/Users/Index'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Users/Index.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, $router
  beforeEach(() => {
    $SystemAPI = {
      userList: sinon.stub().resolves({ set: [{ userID: 'ID1' }, { userID: 'ID2' }] }),
    }
    $router = {
      push: sinon.fake(),
    }
  })

  const mountIndex = (opt) => shallowMount(Index, {
    mocks: { $SystemAPI, $router },
    ...opt,
  })

  describe('fetch users', () => {
    it('on success - set users', async () => {
      sinon.stub(Index, 'created')
      const wrap = mountIndex()
      wrap.vm.fetchUsers()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userList)
      expect(wrap.findAll('.user')).to.have.length(2)
    })

    it('on error - set error flag', async () => {
      sinon.stub(Index, 'created')
      $SystemAPI.userList = stdReject()
      const wrap = mountIndex()
      wrap.vm.fetchUsers()

      await fp()
      sinon.assert.calledOnce($SystemAPI.userList)
      expect(wrap.vm.error).to.not.be.null
    })

    it('on init', () => {
      const fetchUsers = sinon.fake()
      mountIndex({ methods: { fetchUsers } })

      sinon.assert.calledOnce(fetchUsers)
    })

    it('on update', () => {
      sinon.stub(Index, 'created')
      const fetchUsers = sinon.fake()
      const wrap = mountIndex({ methods: { fetchUsers } })

      wrap.vm.onUpdate()
      sinon.assert.calledOnce(fetchUsers)
    })
  })

  it('on create user - redirect', () => {
    sinon.stub(Index, 'created')
    const wrap = mountIndex()

    wrap.vm.onCreate()
    sinon.assert.calledOnce($router.push)
  })
})
