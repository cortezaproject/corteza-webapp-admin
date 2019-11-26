/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import UserRoles from 'corteza-webapp-admin/src/components/UserRoles'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'

describe('components/UserRoles.vue', () => {
  let propsData
  beforeEach(() => {
    propsData = { currentRoles: [ { dirty: false }, { dirty: true } ] }
  })

  const mountUR = (opt) => shallowMount(UserRoles, {
    propsData,
    ...opt,
  })

  it('filter for roles I am a member of', () => {
    const wrap = mountUR()

    expect(wrap.vm.filteredRoles).to.deep.eq([{ dirty: true }])
  })

  it('filter roles I am not a member of - by query', () => {
    propsData.currentRoles = [ { dirty: false, name: 'filter' }, { dirty: true, name: 'filter' } ]
    const wrap = mountUR()

    expect(wrap.vm.filtered).to.deep.eq([{ dirty: false, name: 'filter' }])
  })

  it('can set role')
  it('can remove role')
})
