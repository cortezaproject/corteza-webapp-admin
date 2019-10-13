<template>
  <b-form @submit.prevent="onSubmit" class="overflow-hidden">
    <router-link :to="{ name: 'settings' }" class="float-right pr-1"><b-button-close></b-button-close></router-link>
    <div class="header">
      <h2 class="header-subtitle header-row">
        {{ $t('settings.system.auth.title') }}
      </h2>
    </div>

    <hr />

    <main>
      <b-form-group :label="$t('settings.system.auth.internal.title')" label-size="lg">
        <b-form-group label-cols="3">
          <b-form-checkbox v-model="settings['auth.internal.enabled']" :value="true" :unchecked-value="false">
            {{ $t('settings.system.auth.internal.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="3">
          <b-form-checkbox v-model="settings['auth.internal.password-reset.enabled']" :value="true" :unchecked-value="false">
            {{ $t('settings.system.auth.internal.password-reset.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="3">
          <b-form-checkbox v-model="settings['auth.internal.signup-email-confirmation-required']" :value="true" :unchecked-value="false">
            {{ $t('settings.system.auth.internal.signup-email-confirmation-required') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="3">
          <b-form-checkbox v-model="settings['auth.internal.signup.enabled']" :value="true" :unchecked-value="false">
            {{ $t('settings.system.auth.internal.signup.enabled') }}
          </b-form-checkbox>
        </b-form-group>
      </b-form-group>

      <hr />

      <b-form-group :label="$t('settings.system.auth.frontend.title')" label-size="lg">
        <b-form-group :label="$t('settings.system.auth.frontend.url.base')" label-cols="3">
          <b-input-group>
            <b-form-input v-model="settings['auth.frontend.url.base']" />
          </b-input-group>
        </b-form-group>
        <b-form-group :label="$t('settings.system.auth.frontend.url.email-confirmation')" label-cols="3">
          <b-input-group>
            <b-form-input v-model="settings['auth.frontend.url.email-confirmation']" />
          </b-input-group>
        </b-form-group>
        <b-form-group :label="$t('settings.system.auth.frontend.url.password-reset')" label-cols="3">
          <b-input-group>
            <b-form-input v-model="settings['auth.frontend.url.password-reset']" />
          </b-input-group>
        </b-form-group>
        <b-form-group :label="$t('settings.system.auth.frontend.url.redirect')" label-cols="3">
          <b-input-group>
            <b-form-input v-model="settings['auth.frontend.url.redirect']" />
          </b-input-group>
        </b-form-group>
      </b-form-group>

      <hr />

      <b-form-group :label="$t('settings.system.auth.mail.title')" label-size="lg">
        <b-form-group :label="$t('settings.system.auth.mail.from-address')" label-cols="3">
          <b-input-group>
            <b-form-input v-model="settings['auth.mail.from-address']" />
          </b-input-group>
        </b-form-group>
        <b-form-group :label="$t('settings.system.auth.mail.from-name')" label-cols="3">
          <b-input-group>
            <b-form-input v-model="settings['auth.mail.from-name']" />
          </b-input-group>
        </b-form-group>
      </b-form-group>
    </main>

    <div class="text-right">
      <b-button type="submit" variant="primary">{{ $t('general.label.saveChanges') }}</b-button>
    </div>
  </b-form>
</template>

<script>
const prefix = `auth`

export default {
  data () {
    return {
      processing: true,

      error: null,

      settings: {},
    }
  },

  created () {
    this.fetchSettings()
  },

  methods: {
    onSubmit () {
      // Collect changed variables
      this.processing = true

      const values = Object.entries(this.settings).map(([name, value]) => {
        return { name, value }
      })

      this.$SystemAPI.settingsUpdate({ values })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchSettings () {
      this.processing = true

      this.$SystemAPI.settingsList({ prefix }).then(vv => {
        vv.filter(v => v.name.split('.')[1] !== 'external').forEach(({ name, value }) => {
          this.$set(this.settings, name, value)
        })
      })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    stdReject ({ message }) {
      this.error = message
    },

    finalize () {
      this.processing = false
    },
  },
}
</script>
<style scoped lang="scss">
main {
  height: auto;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
