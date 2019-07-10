import { expect, assert } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Role from 'corteza-webapp-admin/src/views/Roles/Role'
import { mount, stdStubs } from 'corteza-webapp-common/src/lib/testHelpers'

const localVue = createLocalVue()

describe('views/Roles/Role.vue', () => {
  const roleID = 'roleID'
  const role = { role: 'role' }
  const mocks = { $t: (e) => e }
  const common = { localVue, stubs: [ ...stdStubs, 'permissions-button' ], mocks, propsData: { roleID } }
  let wrapper

  describe('methods', () => {
    let systemResolve, systemReject

    describe('fetchRole', () => {
      const mm = [{}, {}]
      let systemResolveRole, systemRejectRole
      const systemResolveMembers = sinon.stub().resolves(mm)
      const systemRejectMembers = sinon.stub().rejects(new Error('reject'))
      const stdReject = sinon.fake()
      const c = { ...common, mocks: { ...mocks }, methods: { stdReject } }

      beforeEach(() => {
        systemResolveMembers.resetHistory()
        systemRejectMembers.resetHistory()
        stdReject.resetHistory()
      })

      it('resolve', (done) => {
        systemResolveRole = sinon.stub().resolves(role)
        wrapper = mount(Role, { ...c, mocks: { ...mocks, $SystemAPI: { roleRead: systemResolveRole, roleMemberList: systemResolveMembers } } })

        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.role).to.deep.eq(role)
          expect(wrapper.vm.members).to.deep.eq(mm)
          assert(systemResolveRole.calledOnceWith({ roleID }))
          assert(systemResolveMembers.calledOnceWith(role))
          assert(stdReject.notCalled)
          done()
        })
      })

      it('reject.roleRead', (done) => {
        systemRejectRole = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(Role, { ...c, mocks: { ...mocks, $SystemAPI: { roleRead: systemRejectRole, roleMemberList: systemResolveMembers } } })

        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.role).to.deep.eq({})
          expect(wrapper.vm.members).to.deep.eq([])
          assert(systemRejectRole.calledOnceWith({ roleID }))
          assert(systemResolveMembers.notCalled)
          assert(stdReject.calledOnce)
          done()
        })
      })

      it('reject.roleMemberList', (done) => {
        systemResolveRole = sinon.stub().resolves(role)
        wrapper = mount(Role, { ...c, mocks: { ...mocks, $SystemAPI: { roleRead: systemResolveRole, roleMemberList: systemRejectMembers } } })

        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          expect(wrapper.vm.role).to.deep.eq(role)
          expect(wrapper.vm.members).to.deep.eq([])
          assert(systemResolveRole.calledOnceWith({ roleID }))
          assert(systemRejectMembers.calledOnce)
          assert(stdReject.calledOnce)
          done()
        })
      })
    })

    describe('onDelete', () => {
      let handler = sinon.fake()
      let stdReject = sinon.fake()
      let push = sinon.fake()

      const c = { ...common, methods: { handler, stdReject, fetchRole: () => {} } }

      beforeEach(() => {
        handler.resetHistory()
        stdReject.resetHistory()
        push.resetHistory()
      })

      it('resolve', (done) => {
        let resolve = { message: 'message' }
        systemResolve = sinon.stub().resolves(resolve)
        wrapper = mount(Role, { ...c, mocks: { ...mocks, $SystemAPI: { roleDelete: systemResolve }, $router: { push } } })

        wrapper.vm.onDelete()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          assert(systemResolve.calledOnceWith({ roleID }))
          assert(handler.calledOnceWith(resolve))
          assert(push.calledOnceWith({ name: 'roles' }))
          assert(stdReject.notCalled)
          done()
        })
      })

      it('reject', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(Role, { ...c, mocks: { ...mocks, $SystemAPI: { roleDelete: systemReject } } })

        wrapper.vm.onDelete()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          assert(systemReject.calledOnceWith({ roleID }))
          assert(handler.notCalled)
          assert(stdReject.calledOnce)
          done()
        })
      })
    })

    describe('onSubmit', () => {
      let handler = sinon.stub().returns({ roleID })
      let stdReject = sinon.fake()
      let push = sinon.fake()
      const members = [ { member: 'member1' }, { member: 'member2' } ]
      const role = { role: 'r1' }
      const payload = { ...role, members }

      const c = { ...common, data: () => ({ members, role }), methods: { handler, stdReject, fetchRole: () => {} } }

      beforeEach(() => {
        handler.resetHistory()
        stdReject.resetHistory()
        push.resetHistory()
      })

      it('resolve.update', (done) => {
        systemResolve = sinon.stub().resolves(role)
        wrapper = mount(Role, { ...c, mocks: { ...mocks, $SystemAPI: { roleUpdate: systemResolve } } })

        wrapper.vm.onSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          assert(systemResolve.calledOnceWith(payload))
          assert(handler.calledOnceWith(role))
          assert(stdReject.notCalled)
          done()
        })
      })

      it('reject.update', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(Role, { ...c, mocks: { ...mocks, $SystemAPI: { roleUpdate: systemReject } } })

        wrapper.vm.onSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          assert(systemReject.calledOnceWith(payload))
          assert(handler.notCalled)
          assert(stdReject.calledOnce)
          done()
        })
      })

      it('resolve.create', (done) => {
        systemResolve = sinon.stub().resolves(role)
        wrapper = mount(Role, { ...c, mocks: { ...mocks, $SystemAPI: { roleCreate: systemResolve }, $router: { push } }, propsData: {} })

        wrapper.vm.onSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          assert(systemResolve.calledOnceWith(payload))
          assert(handler.calledOnceWith(role))
          assert(push.calledOnceWith({ name: 'roles.role', params: { roleID } }))
          assert(stdReject.notCalled)
          done()
        })
      })

      it('reject.create', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(Role, { ...c, mocks: { ...mocks, $SystemAPI: { roleCreate: systemReject } }, propsData: {} })

        wrapper.vm.onSubmit()
        expect(wrapper.vm.processing).to.eq(true)
        setTimeout(() => {
          expect(wrapper.vm.processing).to.eq(false)
          assert(systemReject.calledOnceWith(payload))
          assert(handler.notCalled)
          assert(push.notCalled)
          assert(stdReject.calledOnce)
          done()
        })
      })
    })

    it('stdReject', () => {
      wrapper = mount(Role, { ...common, methods: { fetchRole: () => {} } })
      expect(wrapper.vm.error).to.eq(null)

      wrapper.vm.stdReject()
      expect(wrapper.vm.error).to.eq(null)

      wrapper.vm.stdReject({ message: 'message' })
      expect(wrapper.vm.error).to.eq('message')
    })

    it('handler', (done) => {
      wrapper = mount(Role, { ...common, methods: { fetchRole: () => {} } })

      wrapper.vm.handler(role).then((r) => {
        expect(r).to.deep.eq(role)
        let evt = wrapper.emitted().update.pop()
        expect(evt).to.not.eq(undefined)
        expect(wrapper.vm.role).to.eq(role)
        done()
      })
    })
  })
})
