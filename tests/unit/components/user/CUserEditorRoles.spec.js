/* eslint-disable no-unused-expressions */
// import { expect } from 'chai'
// import CUserEditorRoles from 'corteza-webapp-admin/src/components/User/CUserEditorRoles'
// import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
//
// describe('components/CUserEditorRoles.vue', () => {
//   let propsData
//   beforeEach(() => {
//     propsData = { currentRoles: [ { dirty: false }, { dirty: true } ] }
//   })
//
//   const mountUR = (opt) => shallowMount(CUserEditorRoles, {
//     propsData,
//     ...opt,
//   })
//
//   it('filter for roles I am a member of', () => {
//     const wrap = mountUR()
//
//     expect(wrap.vm.filteredRoles).to.deep.eq([{ dirty: true }])
//   })
//
//   it('filter roles I am not a member of - by query', () => {
//     propsData.currentRoles = [ { dirty: false, name: 'filter' }, { dirty: true, name: 'filter' } ]
//     const wrap = mountUR()
//
//     expect(wrap.vm.filtered).to.deep.eq([{ dirty: false, name: 'filter' }])
//   })
// })
