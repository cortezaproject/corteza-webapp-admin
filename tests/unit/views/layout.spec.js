/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import Layout from 'corteza-webapp-admin/src/views/Layout'
import CTheMainNav from 'corteza-webapp-admin/src/components/CTheMainNav'
import { shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'
import fp from 'flush-promises'

describe('views/Layout.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $auth, $store, $SystemAPI

  beforeEach(() => {
    $auth = {
      is: sinon.stub().returns(true),
      check: sinon.stub().resolves({ user: 'authenticated' }),
      open: sinon.stub().resolves(),
    }

    $SystemAPI = {
      permissionsEffective: sinon.stub().resolves([
        { resource: 'system', operation: 'access', allow: true },
      ]),

      automationList: sinon.stub().resolves([
        {},
      ]),
    }

    $store = {
      dispatch: sinon.fake(),
    }
  })

  const mountLayout = (opt) => shallowMount(Layout, {
    mocks: { $auth, $store, $SystemAPI },
    ...opt,
  })

  describe('fetch user', () => {
    it('on auth - show main', async () => {
      const wrap = mountLayout()

      await fp()
      expect(wrap.find(CTheMainNav).exists()).to.be.true
      expect(wrap.find('main').isVisible()).to.be.true
    })

    it('on not authenticated - show main', async () => {
      $auth.check = sinon.stub().rejects()
      $auth.is = sinon.stub().returns(false)
      const wrap = mountLayout()

      await fp()
      expect(wrap.find(CTheMainNav).exists()).to.be.false
      expect(wrap.find('main').exists()).to.be.false
      sinon.assert.calledOnce($auth.open)
    })
  })
})
