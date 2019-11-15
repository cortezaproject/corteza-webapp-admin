<template>
  <b-form
    class="overflow-hidden"
    @submit.prevent="onSubmit"
  >
    <router-link
      :to="{ name: 'settings' }"
      class="float-right pr-1"
    >
      <b-button-close />
    </router-link>
    <div class="header">
      <h2 class="header-subtitle header-row">
        {{ $t('settings.compose.title') }}
      </h2>
    </div>

    <div
      v-if="error"
      class="bg-danger alert text-white"
    >
      {{ error }}
    </div>

    <hr>

    <main>
      <b-form-group
        :label="$t('settings.compose.ui.title')"
        label-size="lg"
      >
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['ui.namespace-switcher.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('settings.compose.ui.namespace-switcher.enabled') }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['ui.namespace-switcher.defaultOpen']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('settings.compose.ui.namespace-switcher.defaultOpen') }}
          </b-form-checkbox>
        </b-form-group>
      </b-form-group>

      <hr>

      <b-form-group
        :label="$t('settings.compose.file.title')"
        label-size="lg"
      >
        <b-form-group
          :label="$t('settings.compose.file.max-size')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input
              v-model="settings['file.max-size']"
              type="number"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group
          :label="$t('settings.compose.file.type.whitelist')"
          :description="$t('settings.compose.file.type.description')"
          label-cols="2"
        >
          <b-input-group class="m-0">
            <b-form-input v-model="fileWhitelist" />
          </b-input-group>
        </b-form-group>
      </b-form-group>
    </main>

    <div class="text-right">
      <b-button
        type="submit"
        variant="primary"
      >
        {{ $t('permission.saveChanges') }}
      </b-button>
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
        return (this.settings['file.type.whitelist'] || []).join(', ')
      },

      set (value) {
        this.settings['file.type.whitelist'] = (value || '').split(',').map(v => {
          return v.replace(/ /g, '')
        }).filter(v => {
          if (v.match(/^[-\w.]+\/[-\w/+.]+$/g)) {
            return v
          }
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
      this.error = null

      const values = Object.entries(this.settings).map(([name, value]) => {
        return { name, value }
      })

      this.$ComposeAPI.settingsUpdate({ values })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchSettings () {
      this.processing = true
      this.error = null

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
