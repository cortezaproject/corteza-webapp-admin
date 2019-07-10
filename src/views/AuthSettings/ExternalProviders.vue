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
import StandardExternal from 'corteza-webapp-admin/src/components/settings/auth/ExternalStd'
import OidcExternal from 'corteza-webapp-admin/src/components/settings/auth/ExternalOIDC'

const prefix = `auth.external`

export default {
  components: {
    StandardExternal,
    OidcExternal,
  },

  data () {
    return {
      processing: true,

      error: null,

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

      for (let provider in this.standard) {
        for (let k of ['key', 'secret', 'enabled']) {
          const ch = this.checkForChange(`auth.external.providers.${provider}.${k}`, this.standard[provider][k], this.settings)
          if (ch) {
            c.push(ch)
          }
        }
      }

      for (let provider of this.oidc) {
        const { handle } = provider
        for (let k of ['key', 'secret', 'enabled', 'issuer']) {
          const ch = this.checkForChange(`auth.external.providers.openid-connect.${handle}.${k}`, provider[k], this.settings)
          if (ch) {
            c.push(ch)
          }
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
    checkForChange (name, newValue, settings = []) {
      const oldValue = (settings.find(s => s.name === name) || {}).value

      if (oldValue === undefined && newValue === undefined) {
        // Do not be greedy, skip when old value is undefined and
        // new value is falsy
        return
      }

      if (newValue === oldValue) {
        return
      }

      // Values changed, record
      return { name, value: newValue }
    },

    onSubmit () {
      // Collect changed variables
      this.processing = true

      this.$SystemAPI.settingsUpdate({ values: this.changes })
        .catch(({ message }) => {
          this.error = message
        }).finally(() => {
          this.processing = false
        })
    },

    fetchSettings () {
      this.processing = true
      return this.$SystemAPI.settingsList({ prefix }).then((vv = []) => {
        this.settings = vv

        for (let provider in this.standard) {
          this.standard[provider] = this.extractKeys(provider, this.settings, {
            enabled: false,
            secret: '',
            key: '',
          })
        }

        this.oidc = []
        for (let handle of (this.oidcProviders || ['didmos2'])) {
          this.oidc.push(this.extractKeys('openid-connect.' + handle, this.settings, {
            handle,
            enabled: false,
            issuer: '',
            key: '',
            secret: '',
          }))
        }

        this.enabled = !!(vv.find(v => v.name === 'auth.external.enabled') || {}).value
      }).catch(({ message }) => {
        this.error = message
      }).finally(() => {
        this.processing = false
      })
    },

    extractKeys (provider, settings = {}, base = {}) {
      let out = { ...base }

      for (let k in base) {
        const name = `auth.external.providers.${provider}.${k}`
        const v = settings.find(v => v.name === name)
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
form {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);

  .header {
    flex: 1;
    border-bottom: 2px solid $light;
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
