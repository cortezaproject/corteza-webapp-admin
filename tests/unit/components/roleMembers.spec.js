import { expect, assert } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import RoleMembers from '@/components/RoleMembers'
import sinon from 'sinon'
import { mount, stdStubs } from 'crust-common.vue/src/lib/testHelpers'

let localVue = createLocalVue()

describe('components/RoleMembers.vue', () => {
  const mocks = { $t: (e) => e }
  const common = { localVue, propsData: { currentMembers: [] }, stubs: [ ...stdStubs, 'b-input-group', 'b-input-group-prepend', 'b-input-group-text', 'b-input-group-append' ], mocks }
  let wrapper
  const getMembersEvt = () => ((wrapper.emitted()['update:current-members'] || []).pop() || []).pop()

  beforeEach(() => {
    sinon.restore()
  })

  describe('computed', () => {
    it('members', () => {
      let currentMembers = [ 'id1', 'id2' ]
      const systemReject = sinon.stub().rejects(new Error('reject'))
      wrapper = mount(RoleMembers, { ...common, propsData: { currentMembers }, mocks: { ...mocks, $system: { userList: systemReject } } })

      expect(wrapper.vm.members).to.have.length(2)
      let ev = getMembersEvt()
      expect(ev).to.eq(undefined)

      // Length stays at 2, because it's a computed!
      wrapper.vm.members = [ 'id3' ]
      expect(wrapper.vm.members).to.have.length(2)
      ev = getMembersEvt()
      expect(ev).to.deep.eq(['id3'])
    })

    it('filtered', () => {
      let local = {
        users: [
          { name: 'match' },
          { handle: 'match' },
          { username: 'match' },
          { email: 'match' },
          { userID: 'match' },
          { userID: 'miss' },
        ],
        filter: 'match',
      }

      let rtr = RoleMembers.computed.filtered.call(local)
      expect(rtr).to.deep.eq(local.users.slice(0, -1))
    })

    it('filteredMembers', () => {
      let currentMembers = [ 'id1', 'id2' ]
      let users = [ { userID: 'id1' }, 'id2', { userID: 'id3' }, 'id4' ]
      const systemReject = sinon.stub().rejects(new Error('reject'))
      wrapper = mount(RoleMembers, { ...common, data: () => ({ users }), propsData: { currentMembers }, mocks: { ...mocks, $system: { userList: systemReject } } })

      expect(wrapper.vm.filteredMembers).to.deep.eq(users.slice(0, 2))
    })
  })

  describe('created', () => {
    let systemResolve, systemReject
    it('users.fetch.resolve', (done) => {
      let resolve = [ {}, {} ]
      systemResolve = sinon.stub().resolves(resolve)
      wrapper = mount(RoleMembers, { ...common, mocks: { ...mocks, $system: { userList: systemResolve } } })

      expect(wrapper.vm.users).to.have.length(0)
      setTimeout(() => {
        expect(wrapper.vm.users).to.have.length(2)
        expect(wrapper.vm.error).to.eq(null)
        assert(systemResolve.calledOnce)
        done()
      })
    })

    it('users.fetch.reject', (done) => {
      systemReject = sinon.stub().rejects(new Error('reject'))
      wrapper = mount(RoleMembers, { ...common, mocks: { ...mocks, $system: { userList: systemReject } } })

      expect(wrapper.vm.users).to.have.length(0)
      setTimeout(() => {
        expect(wrapper.vm.users).to.have.length(0)
        expect(wrapper.vm.error).to.eq('reject')
        assert(systemReject.calledOnce)
        done()
      })
    })
  })

  describe('methods', () => {
    it('isMember', () => {
      const systemReject = sinon.stub().rejects(new Error('reject'))
      wrapper = mount(RoleMembers, { ...common, mocks: { ...mocks, $system: { userList: systemReject } } })

      expect(wrapper.vm.isMember()).to.eq(false)
      expect(wrapper.vm.isMember({})).to.eq(false)
      expect(wrapper.vm.isMember({ userID: 'id1' })).to.eq(false)

      wrapper.setProps({ currentMembers: [ 'id2' ] })
      expect(wrapper.vm.isMember({ userID: 'id1' })).to.eq(false)

      wrapper.setProps({ currentMembers: [ 'id2', 'id1' ] })
      expect(wrapper.vm.isMember({ userID: 'id1' })).to.eq(true)
    })

    it('addMember', () => {
      const systemReject = sinon.stub().rejects(new Error('reject'))
      wrapper = mount(RoleMembers, { ...common, propsData: { currentMembers: [] }, mocks: { ...mocks, $system: { userList: systemReject } } })

      expect(wrapper.vm.members).to.have.length(0)

      wrapper.vm.addMember({ userID: 'userID1' })
      expect(wrapper.vm.members).to.have.length(0)
      let ev = getMembersEvt()
      expect(ev).to.deep.eq(['userID1'])
      wrapper.setProps({ currentMembers: ev })

      wrapper.vm.addMember('userID2')
      expect(wrapper.vm.members).to.have.length(1)
      ev = getMembersEvt()
      expect(ev).to.deep.eq(['userID1', 'userID2'])
      wrapper.setProps({ currentMembers: ev })
      expect(wrapper.vm.members).to.have.length(2)
    })

    it('removeMember', () => {
      const systemReject = sinon.stub().rejects(new Error('reject'))
      wrapper = mount(RoleMembers, { ...common, propsData: { currentMembers: [ 'userID1', 'userID2', 'userID3' ] }, mocks: { ...mocks, $system: { userList: systemReject } } })

      expect(wrapper.vm.members).to.have.length(3)

      wrapper.vm.removeMember({ userID: 'userID1' })
      expect(wrapper.vm.members).to.have.length(3)
      let ev = getMembersEvt()
      expect(ev).to.deep.eq(['userID2', 'userID3'])
      wrapper.setProps({ currentMembers: ev })

      wrapper.vm.removeMember('userID2')
      expect(wrapper.vm.members).to.have.length(2)
      ev = getMembersEvt()
      expect(ev).to.deep.eq(['userID3'])
      wrapper.setProps({ currentMembers: ev })

      // No match
      wrapper.vm.removeMember('userID')
      expect(wrapper.vm.members).to.have.length(1)
      expect(getMembersEvt()).to.eq(undefined)
    })
  })
})
