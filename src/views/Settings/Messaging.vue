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
        {{ $t('settings.messaging.title') }}
      </h2>
    </div>

    <hr>

    <main>
      <b-form-group
        :label="$t('settings.messaging.emoji.title')"
        label-size="lg"
      >
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['emoji.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('settings.messaging.emoji.enabled') }}
          </b-form-checkbox>
        </b-form-group>
      </b-form-group>

      <hr>

      <b-form-group
        :label="$t('settings.messaging.message.attachment.title')"
        label-size="lg"
      >
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['message.attachment.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('settings.messaging.message.attachment.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          v-if="settings['message.attachment.enabled']"
          label-cols="2"
        >
          <b-form-checkbox
            v-model="settings['message.attachment.source.gallery.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('settings.messaging.message.attachment.source.gallery.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          v-if="settings['message.attachment.enabled']"
          label-cols="2"
        >
          <b-form-checkbox
            v-model="settings['message.attachment.source.camera.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('settings.messaging.message.attachment.source.camera.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          v-if="settings['message.attachment.enabled']"
          :label="$t('settings.messaging.message.attachment.max-size')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input
              v-model="settings['message.attachment.max-size']"
              type="number"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group
          v-if="settings['message.attachment.enabled']"
          :label="$t('settings.messaging.message.attachment.type.whitelist')"
          :description="$t('settings.messaging.message.attachment.type.description')"
          label-cols="2"
        >
          <b-input-group class="m-0">
            <b-form-input v-model="attachmentWhitelist" />
          </b-input-group>
        </b-form-group>
      </b-form-group>

      <hr>

      <b-form-group
        :label="$t('settings.messaging.notification.title')"
        label-size="lg"
      >
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['notification.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('settings.messaging.notification.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          v-if="settings['notification.enabled']"
          :label="$t('settings.messaging.notification.header.template')"
          :description="$t('settings.messaging.notification.header.description')"
          label-cols="2"
        >
          <b-input-group class="m-0">
            <b-form-input v-model="settings['notification.header.template']" />
          </b-input-group>
        </b-form-group>
        <b-form-group
          v-if="settings['notification.enabled']"
          :label="$t('settings.messaging.notification.message.max-length')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input
              v-model="settings['notification.message.max-length']"
              type="number"
            />
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
    attachmentWhitelist: {
      get () {
        return (this.settings['message.attachment.type.whitelist'] || []).join(', ')
      },

      set (value) {
        this.settings['message.attachment.type.whitelist'] = (value || '').split(',').map(v => {
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

      const values = Object.entries(this.settings).map(([name, value]) => {
        return { name, value }
      })

      this.$MessagingAPI.settingsUpdate({ values })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchSettings () {
      this.processing = true

      this.$MessagingAPI.settingsList().then(vv => {
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
