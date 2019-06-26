import { expect, assert } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Index from '@/views/Users/Index'
import { mount } from 'corteza-webapp-common/src/lib/testHelpers'

const localVue = createLocalVue()

describe('views/Users/Index.vue', () => {
  const mocks = { $t: (e) => e }
  const common = { localVue, stubs: ['router-view', 'router-link'], mocks }
  let wrapper

  describe('created', () => {
    it('users.fetch', () => {
      let fetchUsers = sinon.fake()
      wrapper = mount(Index, { ...common, methods: { fetchUsers } })
      assert(fetchUsers.calledOnce)
    })
  })

  describe('methods', () => {
    describe('fetchUsers', () => {
      let systemResolve, systemReject
      systemResolve = sinon.stub().resolves({ set: [ 'u1', 'u2', 'u3' ] })
      systemReject = sinon.stub().rejects(new Error('reject'))

      it('resolve', (done) => {
        wrapper = mount(Index, { ...common, mocks: { ...mocks, $SystemAPI: { userList: systemResolve } }, data: () => ({ query: 'QUERY' }) })

        expect(wrapper.vm.users).to.have.length(0)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          assert(systemResolve.calledOnceWith({ query: 'query' }))
          expect(wrapper.vm.users).to.have.length(3)
          expect(wrapper.vm.error).to.eq(null)
          done()
        })
      })

      it('reject', (done) => {
        wrapper = mount(Index, { ...common, mocks: { ...mocks, $SystemAPI: { userList: systemReject } }, data: () => ({ query: 'QUERY' }) })

        expect(wrapper.vm.users).to.have.length(0)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          assert(systemReject.calledOnceWith({ query: 'query' }))
          expect(wrapper.vm.users).to.have.length(0)
          expect(wrapper.vm.error).to.eq('reject')
          done()
        })
      })
    })
  })
})
