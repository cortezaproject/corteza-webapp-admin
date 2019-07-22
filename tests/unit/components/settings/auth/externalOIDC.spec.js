import { expect } from 'chai'
import ExternalOIDC from 'corteza-webapp-admin/src/components/settings/auth/ExternalOIDC'

describe('components/settings/auth/ExternalOIDC.vue', () => {
  it('clean handle', () => {
    let dirty = 'aA0-_ /.:;+?\''
    let clean = 'aA0-_'
    expect(ExternalOIDC.methods.alphanum(dirty)).to.eq(clean)
  })
})
