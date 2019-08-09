import { expect, assert } from 'chai'
import { createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import Index from 'corteza-webapp-admin/src/views/Index'
import { mount, writeableWindowLocation } from 'corteza-webapp-common/src/lib/testHelpers'

const localVue = createLocalVue()

describe('views/Index.vue', () => {
  const isFalse = sinon.stub().returns(false)

  const mocks = { $auth: {
    is: isFalse,
    goto: (u) => { window.location = u },
    open: (u) => { window.location = u },
  } }
  const common = { localVue, propsData: { internalEnabled: true }, stubs: ['router-view', 'router-link'], mocks }
  let wrapper

  describe('created', () => {
    let authResolve, authReject
    let checkPermissions = sinon.fake()
    beforeEach(() => {
      checkPermissions.resetHistory()
      authResolve = sinon.stub().resolves({ message: 'resolve' })
      authReject = sinon.stub().rejects(new Error('reject'))
      writeableWindowLocation()
    })

    it('auth.check.resolve', (done) => {
      wrapper = mount(Index, { ...common, methods: { checkPermissions }, mocks: { $auth: { ...mocks.$auth, check: authResolve } } })

      setTimeout(() => {
        assert(checkPermissions.calledOnceWith({ message: 'resolve' }))
        done()
      })
    })

    it('auth.check.reject', (done) => {
      wrapper = mount(Index, { ...common, methods: { checkPermissions }, mocks: { $auth: { ...mocks.$auth, check: authReject } } })

      setTimeout(() => {
        // expect(window.location).to.eq('/auth')
        assert(checkPermissions.notCalled)
        done()
      })
    })
  })

  describe('methods', () => {
    let systemResolve, systemReject, authReject
    // helper to make permutations
    const permutations = (valid = false, parts = [ [ 'none', 'system' ], [ 'none', 'access' ], [ false, true ] ]) => {
      return parts.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []))
        .filter(([r, o, a]) => valid || !(r === 'system' && o === 'access' && a))
        .map(([resource, operation, allow]) => ({ resource, operation, allow }))
    }

    beforeEach(() => {
      authReject = sinon.stub().rejects(new Error('reject'))
      systemReject = sinon.stub().rejects(new Error('reject'))
    })

    it('resolve', (done) => {
      let ep = []
      systemResolve = sinon.stub().resolves(ep)
      wrapper = mount(Index, { ...common, mocks: { $auth: { ...mocks.$auth, check: authReject }, $SystemAPI: { permissionsEffective: systemResolve }, $t: (e) => e } })

      wrapper.vm.checkPermissions()
      expect(wrapper.vm.error).to.eq(null)
      expect(wrapper.vm.loaded).to.eq(false)
      setTimeout(() => {
        expect(wrapper.vm.error).to.eq('auth.noAccess')
        expect(wrapper.vm.loaded).to.eq(false)
        done()
      })
    })

    it('resolve.permissions.invalid', (done) => {
      let ep = permutations()

      systemResolve = sinon.stub().resolves(ep)
      wrapper = mount(Index, { ...common, mocks: { $auth: { ...mocks.$auth, check: authReject }, $SystemAPI: { permissionsEffective: systemResolve }, $t: (e) => e } })

      wrapper.vm.checkPermissions()

      expect(wrapper.vm.error).to.eq(null)
      expect(wrapper.vm.loaded).to.eq(false)
      setTimeout(() => {
        expect(wrapper.vm.error).to.eq('auth.noAccess')
        expect(wrapper.vm.loaded).to.eq(false)
        done()
      })
    })

    it('resolve.permissions.valid', (done) => {
      let ep = permutations(true)

      systemResolve = sinon.stub().resolves(ep)
      wrapper = mount(Index, { ...common, mocks: { $auth: { ...mocks.$auth, check: authReject }, $SystemAPI: { permissionsEffective: systemResolve }, $t: (e) => e } })

      wrapper.vm.checkPermissions()

      expect(wrapper.vm.error).to.eq(null)
      expect(wrapper.vm.loaded).to.eq(false)
      setTimeout(() => {
        expect(wrapper.vm.error).to.eq(null)
        expect(wrapper.vm.loaded).to.eq(true)
        done()
      })
    })

    it('reject', (done) => {
      wrapper = mount(Index, { ...common, mocks: { $auth: { ...mocks.$auth, check: authReject }, $SystemAPI: { permissionsEffective: systemReject } } })

      wrapper.vm.checkPermissions()

      expect(wrapper.vm.error).to.eq(null)
      expect(wrapper.vm.loaded).to.eq(false)
      setTimeout(() => {
        expect(wrapper.vm.error).to.eq('reject')
        expect(wrapper.vm.loaded).to.eq(false)
        done()
      })
    })
  })
})
