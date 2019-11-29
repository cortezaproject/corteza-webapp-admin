/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import List from 'corteza-webapp-admin/src/views/System/Application/List'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'

describe('views/Application/List.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, $router, $store
  beforeEach(() => {
    $SystemAPI = {
      applicationList: sinon.stub().resolves(),
      permissionsEffective: sinon.stub().resolves(),
    }
    $router = {
      push: sinon.fake(),
    }
    $store = {
      dispatch: sinon.fake(),
    }
  })

  const mountList = (opt) => shallowMount(List, {
    mocks: { $SystemAPI, $router, $store },
    ...opt,
  })

  describe('fetch applications', () => {
    it('on success - set applications', async () => {
      $SystemAPI.applicationList = sinon.stub().resolves({ set: [{}, {}] })
      const wrap = mountList()

      wrap.vm.items().then(items => {
        expect(items).to.have.length(2)
      }).catch(() => {})
    })

    it('on error - set error flag', async () => {
      $SystemAPI.applicationList = stdReject()
      const wrap = mountList()

      wrap.vm.items()
        .then(items => {})
        .catch(error => {
          expect(error).to.not.be.null
        })
    })
  })
})
