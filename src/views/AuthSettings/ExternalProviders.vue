<template>
  <b-form @submit.prevent="onSubmit">
    <div class="header">
      <router-link :to="{ name: 'auth-settings' }" class="float-right"><b-button-close></b-button-close></router-link>
      <h2 class="header-subtitle header-row">
        {{ $t('auth-settings.external-providers.title') }}
      </h2>
    </div>

    <main>
      <b-form-group label-cols="3">
        <b-form-checkbox plain v-model="enabled" :value="true" :unchecked-value="false">
          {{$t('auth-settings.external-providers.enabled')}}
        </b-form-checkbox>
      </b-form-group>

      <hr/>

      <oidc-external
        v-for="(p, i) in oidc" :key="i"
        :title="$t('auth-settings.external-providers.oidc')"
        v-model="oidc[i]"/>

      <hr />

      <standard-external
        :title="$t('auth-settings.external-providers.gplus')"
        v-model="standard.gplus" />

      <hr />

      <standard-external
        :title="$t('auth-settings.external-providers.facebook')"
        v-model="standard.facebook"/>
      <hr />

      <standard-external
        :title="$t('auth-settings.external-providers.github')"
        v-model="standard.github"/>
      <hr />

      <standard-external
        :title="$t('auth-settings.external-providers.linkedin')"
        v-model="standard.linkedin"/>

    </main>

    <div class="footer">
      <b-button type="submit" variant="primary" :disabled="!submittable">{{ $t('permission.saveChanges') }}</b-button>
    </div>
  </b-form>
</template>

<script>
import StandardExternal from '@/components/settings/auth/ExternalStd'
import OidcExternal from '@/components/settings/auth/ExternalOIDC'

const prefix = `auth.external`

export default {
  components: {
    StandardExternal,
    OidcExternal,
  },

  data () {
    return {
      processing: true,

      settings: [],

      enabled: false,

      oidc: [],

      standard: {
        gplus: {
          enabled: false,
          key: '',
          secret: '',
        },

        facebook: {
          enabled: false,
          key: '',
          secret: '',
        },

        github: {
          enabled: false,
          key: '',
          secret: '',
        },

        linkedin: {
          enabled: false,
          key: '',
          secret: '',
        },
      },
    }
  },

  computed: {
    dirty () {
      return this.changes.length > 0
    },

    submittable () {
      return this.dirty && !this.processing
    },

    //
    oidcProviders () {
      const prefix = `auth.external.providers.openid-connect.`

      // Set() will make sure we only get unique values
      return [...new Set(
        this.settings
          // Filter out all keys that start with prefix
          .filter(v => v.name.indexOf(prefix) === 0)
          // trim off the prefix and everything after next.
          .map(({ name }) => name.substring(prefix.length).split('.', 2)[0]))]
    },

    changes () {
      let c = []

      const process = (name, newValue) => {
        const oldValue = (this.settings.find(s => s.name === name) || { value: null }).value

        if (oldValue === null && newValue === '') {
          // Do not be greedy, skip when old value is undefined and
          // new value is falsy
          return
        }

        if (newValue === oldValue) {
          return
        }

        // Values changed, record
        c.push({ name, value: newValue })
      }

      for (let provider in this.standard) {
        for (let k of ['key', 'secret', 'enabled']) {
          process(`auth.external.providers.${provider}.${k}`, this.standard[provider][k])
        }
      }

      for (let provider of this.oidc) {
        const { handle } = provider
        for (let k of ['key', 'secret', 'enabled', 'issuer']) {
          process(`auth.external.providers.openid-connect.${handle}.${k}`, provider[k])
        }
      }

      // Find out if enabled flag got changed
      let name = 'auth.external.enabled'
      const e = this.settings.find(v => v.name === name)
      if (e === undefined || e.value !== this.enabled) {
        c.push({ name, value: this.enabled })
      }

      return c
    },
  },

  created () {
    this.fetchSettings()
  },

  methods: {
    onSubmit () {
      // Collect changed variables
      this.processing = true

      this.$system.settingsUpdate({ values: this.changes }).then(r => {
        console.log(r)

        this.processing = false
      })
    },

    fetchSettings () {
      this.processing = true
      return this.$system.settingsList({ prefix }).then((vv) => {
        this.settings = vv

        for (let provider in this.standard) {
          this.standard[provider] = this.extractKeys(provider, {
            enabled: false,
            secret: '',
            key: '',
          })
        }

        this.oidc = []
        for (let handle of (this.oidcProviders || ['didmos2'])) {
          this.oidc.push(this.extractKeys('openid-connect.' + handle, {
            handle,
            enabled: false,
            issuer: '',
            key: '',
            secret: '',
          }))
        }

        this.enabled = !!(vv.find(v => v.name === 'auth.external.enabled') || {}).value

        this.processing = false
      })
    },

    extractKeys (provider, base = {}) {
      let out = Object.assign({}, base)

      for (let k in base) {
        const name = `auth.external.providers.${provider}.${k}`
        const v = this.settings.find(v => v.name === name)
        if (!v) {
          continue
        }

        switch (typeof out[k]) {
          case 'string':
            out[k] = v.value || ''
            break
          case 'boolean':
            out[k] = !!v.value
            break
        }
      }

      return out
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';

form {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);

  .header {
    flex: 1;
    border-bottom: 2px solid $appcream;
  }

  .footer {
    flex: 1;
    text-align: right;
  }

  main {
    flex: 1;
    flex-grow: 100;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 2px;
  }
}
</style>
