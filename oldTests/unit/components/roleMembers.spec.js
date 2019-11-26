/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import RoleMembers from 'corteza-webapp-admin/src/components/RoleMembers'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('components/RoleMembers.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, propsData
  beforeEach(() => {
    $SystemAPI = {
      userList: sinon.stub().resolves({ set: [ { userID: 'ID1', name: 'user1' }, { userID: 'ID2', name: 'user2' }, { userID: 'ID3' } ] }),
    }
    propsData = {
      currentMembers: [ 'ID1' ],
    }
  })

  const mountRM = (opt) => shallowMount(RoleMembers, {
    mocks: { $SystemAPI },
    propsData,
    ...opt,
  })

  it('provide user objects for members', async () => {
    const wrap = mountRM()

    await fp()
    expect(wrap.vm.filteredMembers).to.deep.eq([{ userID: 'ID1', name: 'user1' }])
  })

  it('filter users over a query', async () => {
    const wrap = mountRM()
    wrap.setData({ filter: 'user' })

    await fp()
    expect(wrap.vm.filtered).to.deep.eq([ { userID: 'ID1', name: 'user1' }, { userID: 'ID2', name: 'user2' } ])
  })

  describe('add member', () => {
    beforeEach(() => {
      sinon.stub(RoleMembers, 'created')
    })

    it('existing', () => {
      const wrap = mountRM()

      wrap.vm.addMember({ userID: 'ID1' })
      expect(wrap.emitted()['update:current-members']).to.be.undefined
    })

    it('un existing', () => {
      const wrap = mountRM()

      let prev = wrap.vm.members.length
      wrap.vm.addMember({ userID: 'ID4' })
      expect(wrap.emitted()['update:current-members'].pop().pop().length).to.eq(prev + 1)
    })
  })

  describe('remove member', () => {
    beforeEach(() => {
      sinon.stub(RoleMembers, 'created')
    })

    it('existing', () => {
      const wrap = mountRM()

      let prev = wrap.vm.members.length
      wrap.vm.removeMember({ userID: 'ID1' })
      expect(wrap.emitted()['update:current-members'].pop().pop().length).to.eq(prev - 1)
    })

    it('un existing', () => {
      const wrap = mountRM()

      wrap.vm.removeMember({ userID: 'ID4' })
      expect(wrap.emitted()['update:current-members']).to.be.undefined
    })
  })
})
