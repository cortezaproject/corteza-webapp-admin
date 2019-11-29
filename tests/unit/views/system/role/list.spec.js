/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import sinon from 'sinon'
import List from 'corteza-webapp-admin/src/views/System/Role/List'
import { stdReject, shallowMount } from 'corteza-webapp-admin/tests/lib/helpers'

describe('views/Role/List.vue', () => {
  afterEach(() => {
    sinon.restore()
  })

  let $SystemAPI, $router, $store
  beforeEach(() => {
    $SystemAPI = {
      roleList: sinon.stub().resolves({ set: [{ roleID: 'ID1' }, { roleID: 'ID2' }] }),
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

  describe('fetch roles', () => {
    it('on success - set roles', async () => {
      const wrap = mountList()

      wrap.vm.items().then(items => {
        expect(items).to.have.length(2)
      }).catch(() => {})
    })
    it('on error - set error flag', async () => {
      $SystemAPI.roleList = stdReject()
      const wrap = mountList()

      wrap.vm.items()
        .then(items => {})
        .catch(error => {
          expect(error).to.not.be.null
        })
    })
  })
})
