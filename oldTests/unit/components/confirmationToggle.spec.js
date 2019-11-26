/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'

describe('components/ConfirmationToggle.vue', () => {
  let wrap
  const mountCT = (opt) => shallowMount(ConfirmationToggle, {
    ...opt,
  })

  beforeEach(() => {
    wrap = mountCT()
    wrap.find('.confirmation-prompt').trigger('click')
  })

  it('prompt confirmation/cancel', () => {
    expect(wrap.find('.confirmation-confirm').exists()).to.be.true
    expect(wrap.find('.confirmation-cancel').exists()).to.be.true
  })

  it('confirm', () => {
    wrap.find('.confirmation-confirm').trigger('click')
    expect(wrap.emitted().confirmed).to.not.be.undefined
    expect(wrap.find('.confirmation-prompt').exists()).to.be.true
    expect(wrap.find('.confirmation-confirm').exists()).to.be.false
    expect(wrap.find('.confirmation-cancel').exists()).to.be.false
  })

  it('cancel', () => {
    wrap.find('.confirmation-cancel').trigger('click')
    expect(wrap.emitted().confirmed).to.be.undefined
    expect(wrap.find('.confirmation-prompt').exists()).to.be.true
    expect(wrap.find('.confirmation-confirm').exists()).to.be.false
    expect(wrap.find('.confirmation-cancel').exists()).to.be.false
  })
})
