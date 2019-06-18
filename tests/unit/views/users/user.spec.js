import { expect, assert } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import User from '@/views/Users/User'
import { mount, stdStubs } from 'corteza-webapp-common/src/lib/testHelpers'

const localVue = createLocalVue()

describe('views/Users/User.vue', () => {
  const mocks = { $t: (e) => e }
  const common = { localVue, stubs: stdStubs, mocks }
  let wrapper

  describe('methods', () => {
    let systemResolve, systemReject
    const userID = 'userID'
    const user = { name: 'name', userID }

    describe('fetchUsers', () => {
      let stdReject = sinon.stub().returns(undefined)
      let c = { ...common, propsData: { userID }, methods: { stdReject } }

      beforeEach(() => {
        stdReject.resetHistory()
      })

      it('resolve', (done) => {
        systemResolve = sinon.stub().resolves(user)
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userRead: systemResolve } } })

        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.user).to.deep.eq({})
        setTimeout(() => {
          assert(systemResolve.calledOnceWith({ userID }))
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.user).to.deep.eq(user)
          assert(stdReject.notCalled)
          done()
        })
      })

      it('reject', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userRead: systemReject } } })

        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.user).to.deep.eq({})
        setTimeout(() => {
          assert(systemReject.calledOnceWith({ userID }))
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.user).to.deep.eq({})
          assert(stdReject.calledOnce)
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
          expect(wrapper.vm.processing).to.eq(false)
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
          expect(wrapper.vm.processing).to.eq(false)
          done()
        })
      })
    })

    describe('onSubmit', () => {
      let systemResolveUpdate, systemRejectUpdate, systemResolveCreate, systemRejectCreate
      let handler = sinon.stub().returns(user)
      let stdReject = sinon.stub().returns(undefined)
      let push = sinon.fake()
      let c = { ...common, propsData: { userID }, data: () => ({ user }), methods: { fetchUsers: () => {}, handler, stdReject } }

      beforeEach(() => {
        push.resetHistory()
        handler.resetHistory()
        stdReject.resetHistory()
      })

      it('resolve.update', (done) => {
        systemResolveUpdate = sinon.stub().resolves(user)
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userUpdate: systemResolveUpdate } } })

        wrapper.vm.onSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          assert(systemResolveUpdate.calledOnceWith(user))
          assert(handler.calledOnceWith(user))
          assert(stdReject.notCalled)
          expect(wrapper.vm.processing).to.eq(false)
          done()
        })
      })

      it('reject.update', (done) => {
        systemRejectUpdate = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(User, { ...c, mocks: { ...mocks, $SystemAPI: { userUpdate: systemRejectUpdate } } })

        wrapper.vm.onSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          assert(systemRejectUpdate.calledOnceWith(user))
          assert(stdReject.calledOnce)
          assert(handler.notCalled)
          expect(wrapper.vm.processing).to.eq(false)
          done()
        })
      })

      it('resolve.create', (done) => {
        systemResolveCreate = sinon.stub().resolves(user)
        wrapper = mount(User, { ...c, propsData: {}, mocks: { ...mocks, $SystemAPI: { userCreate: systemResolveCreate }, $router: { push } } })

        wrapper.vm.onSubmit()
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

        wrapper.vm.onSubmit()
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
