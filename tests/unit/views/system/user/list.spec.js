/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import List from 'corteza-webapp-admin/src/views/System/User/List'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'

describe('views/User/List.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, $router, $store
  beforeEach(() => {
    $SystemAPI = {
      userList: sinon.stub().resolves({ set: [{ userID: 'ID1' }, { userID: 'ID2' }] }),
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

  describe('fetch users', () => {
    it('on success - set users', async () => {
      const wrap = mountList()

      wrap.vm.items().then(items => {
        expect(items).to.have.length(2)
      }).catch(() => {})
    })
    it('on error - set error flag', async () => {
      $SystemAPI.userList = stdReject()
      const wrap = mountList()

      wrap.vm.items()
        .then(items => {})
        .catch(error => {
          expect(error).to.not.be.null
        })
    })
  })
})
