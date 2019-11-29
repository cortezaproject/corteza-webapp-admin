import { expect } from 'chai'
import ExternalOIDC from 'corteza-webapp-admin/src/components/Settings/System/Auth/ExternalOIDC'

describe('components/Settings/System/Auth/ExternalOIDC.vue', () => {
  it('clean handle', () => {
    let dirty = 'aA0-_ /.:;+?\''
    let clean = 'aA0-_'
    expect(ExternalOIDC.methods.alphanum(dirty)).to.eq(clean)
  })
})
