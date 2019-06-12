import { expect, assert } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Index from '@/views/Roles/Index'
import { mount, stdStubs } from 'crust-common.vue/src/lib/testHelpers'

const localVue = createLocalVue()

describe('views/Roles/Index.vue', () => {
  const mocks = { $t: (e) => e }
  const common = { localVue, stubs: stdStubs, mocks }
  let wrapper

  describe('computed', () => {
    it('title', () => {
      wrapper = mount(Index, { ...common, methods: { fetchRoles: () => {} } })
      expect(wrapper.vm.roles).to.have.length(0)
      expect(wrapper.vm.title.indexOf('0')).to.gt(-1)

      wrapper.setData({ roles: [{}, {}] })
      expect(wrapper.vm.roles).to.have.length(2)
      expect(wrapper.vm.title.indexOf('2')).to.gt(-1)
    })
  })

  describe('created', () => {
    it('roles.fetch', () => {
      const fetchRoles = sinon.fake()
      wrapper = mount(Index, { ...common, methods: { fetchRoles } })

      assert(fetchRoles.calledOnce)
    })
  })

  describe('methods', () => {
    describe('fetchRoles', () => {
      let systemResolve, systemReject
      const query = 'QUERY'
      const c = { ...common, data: () => ({ query }) }

      it('resolve', (done) => {
        let rr = []
        sinon.spy(rr, 'filter')
        systemResolve = sinon.stub().resolves(rr)
        wrapper = mount(Index, { ...c, mocks: { ...mocks, $system: { roleList: systemResolve } } })

        expect(wrapper.vm.roles).to.have.length(0)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          assert(systemResolve.calledOnceWith({ query: query.toLowerCase() }))
          assert(rr.filter.calledOnce)
          expect(wrapper.vm.roles).to.have.length(0)
          expect(wrapper.vm.error).to.eq(null)
          done()
        })
      })

      it('resolve.list', (done) => {
        let rr = [
          { roleID: '5' },
          { roleID: '3' },
          { roleID: '1' }, // removed
          { roleID: '-1' },
        ]
        sinon.spy(rr, 'filter')
        systemResolve = sinon.stub().resolves(rr)
        wrapper = mount(Index, { ...c, mocks: { ...mocks, $system: { roleList: systemResolve } } })

        expect(wrapper.vm.roles).to.have.length(0)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          assert(systemResolve.calledOnceWith({ query: query.toLowerCase() }))
          assert(rr.filter.calledOnce)
          expect(wrapper.vm.roles).to.have.length(3)
          expect(wrapper.vm.roles).to.not.include({ roleID: '1' })
          expect(wrapper.vm.error).to.eq(null)
          done()
        })
      })

      it('reject', (done) => {
        systemReject = sinon.stub().rejects(new Error('reject'))
        wrapper = mount(Index, { ...c, mocks: { ...mocks, $system: { roleList: systemReject } } })

        expect(wrapper.vm.roles).to.have.length(0)
        expect(wrapper.vm.error).to.eq(null)
        setTimeout(() => {
          assert(systemReject.calledOnceWith({ query: query.toLowerCase() }))
          expect(wrapper.vm.roles).to.have.length(0)
          expect(wrapper.vm.error).to.eq('reject')
          done()
        })
      })
    })
  })
})
