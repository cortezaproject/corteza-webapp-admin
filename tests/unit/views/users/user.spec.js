import { expect, assert } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import User from 'corteza-webapp-admin/src/views/Users/User'
import { mount, stdStubs } from 'corteza-webapp-common/src/lib/testHelpers'

const localVue = createLocalVue()

describe('views/Users/User.vue', () => {
  const mocks = { $t: (e) => e }
  const common = { localVue, stubs: stdStubs, mocks }
  let wrapper

  describe('methods', () => {
    let systemResolve, systemReject, systemResolveUser, systemResolveRoles, systemResolveMembership
    const userID = 'userID'
    const user = { name: 'name', userID }
    const userMembershipList = ['1', '2', 'userID']
    const roleList = [{ roleID: '1' }, { roleID: '2' }]

    describe('fetchUsers', () => {
      let stdReject = sinon.stub().returns(undefined)
      let c = { ...common, propsData: { userID }, methods: { stdReject } }

      beforeEach(() => {
        stdReject.resetHistory()
      })

      it('resolve', (done) => {
        systemResolveUser = sinon.stub().resolves(user)
        systemResolveRoles = sinon.stub().resolves(roleList)
        systemResolveMembership = sinon.stub().resolves(userMembershipList)
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userRead: systemResolveUser, roleList: systemResolveRoles, userMembershipList: systemResolveMembership } } })

        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.user).to.deep.eq({})
        setTimeout(() => {
          assert(systemResolveUser.calledOnceWith({ userID }))
          assert(systemResolveRoles.calledOnceWith())
          assert(systemResolveMembership.calledOnceWith({ userID }))
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.user).to.deep.eq(user)
          assert(stdReject.notCalled)
          done()
        })
      })

      it('reject', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userRead: systemReject, roleList: systemReject, userMembershipList: systemReject } } })

        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.user).to.deep.eq({})
        setTimeout(() => {
          expect(systemReject.callCount).to.eq(2)
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.user).to.deep.eq({})
          assert(stdReject.calledTwice)
          done()
        })
      })
    })

    describe('fetchUserRoles', () => {
      let stdReject = sinon.stub().returns(undefined)
      let c = { ...common, propsData: { userID }, methods: { stdReject } }
      let userRoles = [{ roleID: '2', current: true, dirty: true }]

      beforeEach(() => {
        stdReject.resetHistory()
      })

      it('resolve', (done) => {
        systemResolveUser = sinon.stub().resolves(user)
        systemResolveRoles = sinon.stub().resolves(roleList)
        systemResolveMembership = sinon.stub().resolves(userMembershipList)
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userRead: systemResolveUser, roleList: systemResolveRoles, userMembershipList: systemResolveMembership } } })

        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.userRoles).to.deep.eq([])
        setTimeout(() => {
          assert(systemResolveRoles.calledOnceWith())
          assert(systemResolveMembership.calledOnceWith({ userID }))
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.userRoles).to.deep.eq(userRoles)
          assert(stdReject.notCalled)
          done()
        })
      })

      it('reject', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userRead: systemReject, roleList: systemReject, userMembershipList: systemReject } } })

        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.user).to.deep.eq({})
        setTimeout(() => {
          expect(systemReject.callCount).to.eq(2)
          expect(wrapper.vm.userRoles).to.deep.eq([])
          assert(stdReject.calledTwice)
          expect(wrapper.vm.processing).to.eq(false)
          done()
        })
      })
    })

    describe('onDelete', () => {
      let handler = sinon.stub().returns(true)
      let push = sinon.fake()
      let stdReject = sinon.stub().returns(undefined)
      let m = { ...mocks, $router: { push } }
      let c = { ...common, methods: { handler, stdReject }, mocks: { ...m, $SystemAPI: { userDelete: systemResolve } } }

      beforeEach(() => {
        handler.resetHistory()
        push.resetHistory()
        stdReject.resetHistory()
      })

      it('resolves', (done) => {
        systemResolve = sinon.stub().resolves(user)
        wrapper = mount(User, { ...c, mocks: { ...m, $SystemAPI: { userDelete: systemResolve } } })

        wrapper.vm.onDelete()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          assert(handler.calledOnceWith(user))
          assert(push.calledOnceWith({ name: 'users' }))
          assert(stdReject.notCalled)
          done()
        })
      })

      it('rejects', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(User, { ...c, mocks: { ...m, $SystemAPI: { userDelete: systemReject } } })

        wrapper.vm.onDelete()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          assert(handler.notCalled)
          assert(push.notCalled)
          assert(stdReject.calledOnce)
          done()
        })
      })
    })

    describe('onUserSubmit', () => {
      let systemResolveUpdate, systemRejectUpdate, systemResolveCreate, systemRejectCreate
      let handler = sinon.stub().returns(user)
      let stdReject = sinon.stub().returns(undefined)
      let push = sinon.fake()
      let c = { ...common, propsData: { userID }, data: () => ({ user }), methods: { fetchUsers: () => {}, fetchUserRoles: () => {}, handler, stdReject } }

      beforeEach(() => {
        push.resetHistory()
        handler.resetHistory()
        stdReject.resetHistory()
      })

      it('resolve.update', (done) => {
        systemResolveUpdate = sinon.stub().resolves(user)
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userUpdate: systemResolveUpdate, userRead: systemResolveUpdate } } })

        wrapper.vm.onUserSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          expect(systemResolveUpdate.callCount).to.eq(2)
          assert(handler.calledOnceWith(user))
          assert(stdReject.notCalled)
          expect(wrapper.vm.processing).to.eq(false)
          done()
        })
      })

      it('reject.update', (done) => {
        systemRejectUpdate = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userUpdate: systemRejectUpdate, userRead: systemRejectUpdate } } })

        wrapper.vm.onUserSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          expect(systemResolveUpdate.callCount).to.eq(2)
          assert(stdReject.calledTwice)
          assert(handler.notCalled)
          expect(wrapper.vm.processing).to.eq(false)
          done()
        })
      })

      it('resolve.create', (done) => {
        systemResolveCreate = sinon.stub().resolves(user)
        wrapper = mount(User, { ...c, propsData: {}, mocks: { ...mocks, $SystemAPI: { userCreate: systemResolveCreate }, $router: { push } } })

        wrapper.vm.onUserSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          assert(systemResolveCreate.calledOnceWith(user))
          assert(handler.calledOnceWith(user))
          assert(stdReject.notCalled)
          assert(push.calledOnceWith({ name: 'users.user', params: { userID } }))
          expect(wrapper.vm.processing).to.eq(false)
          done()
        })
      })
      it('reject.create', (done) => {
        systemRejectCreate = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(User, { ...c, propsData: {}, mocks: { ...mocks, $SystemAPI: { userCreate: systemRejectCreate } } })

        wrapper.vm.onUserSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          assert(systemRejectCreate.calledOnceWith(user))
          assert(handler.notCalled)
          assert(stdReject.calledOnce)
          expect(wrapper.vm.processing).to.eq(false)
          done()
        })
      })
    })

    it('stdReject', () => {
      wrapper = mount(User, common)
      expect(wrapper.vm.error).to.eq(null)

      wrapper.vm.stdReject()
      expect(wrapper.vm.error).to.eq(null)

      wrapper.vm.stdReject({ message: 'message' })
      expect(wrapper.vm.error).to.eq('message')
    })

    it('handler', (done) => {
      wrapper = mount(User, common)
      const user = 'user'

      wrapper.setData({ processing: true })

      wrapper.vm.handler(user).then((u) => {
        expect(u).to.eq(user)
        let evt = wrapper.emitted().update.pop()
        expect(evt).to.not.eq(undefined)
        expect(wrapper.vm.user).to.eq(user)
        expect(wrapper.vm.processing).to.eq(false)
        done()
      })
    })
  })
})
