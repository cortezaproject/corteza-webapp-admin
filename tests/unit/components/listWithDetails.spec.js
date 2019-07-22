/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import ListWithDetails from 'corteza-webapp-admin/src/components/ListWithDetails'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'

describe('components/ListWithDetails.vue', () => {
  let propsData
  beforeEach(() => {
    propsData = {}
  })

  const mountLWD = (opt) => shallowMount(ListWithDetails, {
    propsData,
    ...opt,
  })

  describe('request create on click', () => {
    it('not available', () => {
      const wrap = mountLWD()
      expect(wrap.find('.create-button').exists()).to.be.false
    })

    it('available', () => {
      propsData.createButtonLabel = 'createButtonLabel'
      propsData.title = 'title'
      propsData.permissionsResourceType = 'permissionsResourceType'
      const wrap = mountLWD()
      expect(wrap.find('.create-button').exists()).to.be.true
      wrap.find('.create-button').trigger('click')

      expect(wrap.emitted().create).to.not.be.undefined
    })
  })
})
