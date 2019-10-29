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
        {{ $t('settings.mail.title') }}
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
        :label="$t('settings.mail.header')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-textarea
            v-model="settings['general.mail.header.en']"
            class="overflow-auto"
            max-rows="20"
          />
        </b-input-group>
      </b-form-group>

      <b-form-group
        :label="$t('settings.mail.footer')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-textarea
            v-model="settings['general.mail.footer.en']"
            class="overflow-auto"
            max-rows="20"
          />
        </b-input-group>
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

      this.$SystemAPI.settingsUpdate({ values })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchSettings () {
      this.processing = true
      this.error = null

      this.$SystemAPI.settingsList({ prefix: 'general.mail.' }).then(vv => {
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
