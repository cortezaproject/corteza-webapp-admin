<template>
  <b-form @submit.prevent="onSubmit" class="overflow-hidden">
    <router-link :to="{ name: 'settings' }" class="float-right pr-1"><b-button-close></b-button-close></router-link>
    <div class="header">
      <h2 class="header-subtitle header-row">
        {{ $t('settings.compose.title') }}
      </h2>
    </div>

    <hr />

    <main>
      <b-form-group :label="$t('settings.compose.panel.title')" label-size="lg">
        <b-form-group label-cols="2">
          <b-form-checkbox v-model="settings['panel.namespace-switcher']" :value="true" :unchecked-value="false">
            {{ $t('settings.compose.panel.namespace-switcher') }}
          </b-form-checkbox>
        </b-form-group>
      </b-form-group>

      <hr />

      <b-form-group :label="$t('settings.compose.file.title')" label-size="lg">
        <b-form-group :label="$t('settings.compose.file.max-size')" label-cols="2">
          <b-input-group>
            <b-form-input type="number" v-model="settings['file.max-size']" />
          </b-input-group>
        </b-form-group>
        <b-form-group :label="$t('settings.compose.file.type.whitelist')"
                      :description="$t('settings.compose.file.type.description')"
                      label-cols="2">

          <b-input-group class="m-0">
            <b-form-input v-model="fileWhitelist" />
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
export default {
  data () {
    return {
      processing: true,

      error: null,

      settings: {},
    }
  },

  computed: {
    fileWhitelist: {
      get () {
        return (this.settings['file.type.whitelist'] || []).join(',')
      },

      set (value) {
        this.settings['file.type.whitelist'] = (value || '').split(',').map(v => {
          return v.replace(/ /g, '')
        }).filter(v => {
          return v
        })
      },
    },
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

      this.$ComposeAPI.settingsUpdate({ values })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchSettings () {
      this.processing = true

      this.$ComposeAPI.settingsList().then(vv => {
        vv.forEach(({ name, value }) => {
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
