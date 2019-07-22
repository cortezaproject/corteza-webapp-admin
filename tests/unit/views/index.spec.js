/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Index from 'corteza-webapp-admin/src/views/Index'
import { writeableWindowLocation, stdReject, shallowMount, stdAuth } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Index.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI
  beforeEach(() => {
    $SystemAPI = {
      permissionsEffective: sinon.stub().resolves(),
    }
  })

  const mountIndex = (opt, mocks = {}) => shallowMount(Index, {
    mocks: { $SystemAPI, ...mocks },
    ...opt,
  })

  it('not authenticated - redirect', async () => {
    writeableWindowLocation({ path: '/dirty' })
    const $auth = stdAuth({
      check: stdReject(),
      goto: (u) => { window.location = u },
      open: (u) => { window.location = u },
    })
    mountIndex({}, { $auth })

    await fp()
    sinon.assert.calledOnce($auth.check)
    expect(window.location).to.not.eq('/dirty')
  })

  describe('check permissions', () => {
    it('on resolve and permissions sufficient - allow access', async () => {
      $SystemAPI.permissionsEffective = sinon.stub().resolves([{ resource: 'system', operation: 'access', allow: true }])
      const wrap = mountIndex()

      await fp()
      sinon.assert.calledOnce($SystemAPI.permissionsEffective)
      expect(wrap.find('.app').exists()).to.be.true
    })

    it('on resolve and permissions not sufficient - notify user', async () => {
      $SystemAPI.permissionsEffective = sinon.stub().resolves([{}])
      const wrap = mountIndex()

      await fp()
      sinon.assert.calledOnce($SystemAPI.permissionsEffective)
      expect(wrap.find('.error').exists()).to.be.true
    })

    it('on error - notify user', async () => {
      $SystemAPI.permissionsEffective = stdReject()
      const wrap = mountIndex()

      await fp()
      sinon.assert.calledOnce($SystemAPI.permissionsEffective)
      expect(wrap.find('.error').exists()).to.be.true
    })
  })
})
