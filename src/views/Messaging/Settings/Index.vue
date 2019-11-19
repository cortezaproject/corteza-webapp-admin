<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <c-messaging-editor-basic
      :basic="settings"
      :processing="basic.processing"
      :success="basic.success"
      @submit="onBasicSubmit"
    />
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CMessagingEditorBasic from 'corteza-webapp-admin/src/components/Settings/Messaging/CMessagingEditorBasic'

export default {
  i18nOptions: {
    namespaces: [ 'messaging.settings' ],
    keyPrefix: 'editor',
  },

  components: {
    CMessagingEditorBasic,
  },

  mixins: [
    editorHelpers,
  ],

  data () {
    return {
      settings: {},

      basic: {
        processing: false,
        success: false,
      },
    }
  },

  created () {
    this.fetchSettings()
  },

  methods: {
    onBasicSubmit (basic) {
      this.basic.processing = true

      const values = Object.entries(basic).map(([name, value]) => {
        return { name, value }
      })

      this.$MessagingAPI.settingsUpdate({ values })
        .then(() => {
          this.animateSuccess('basic')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.basic.processing = false
        })
    },

    fetchSettings () {
      this.incLoader()

      this.$MessagingAPI.settingsList().then(settings => {
        settings.forEach(({ name, value }) => {
          this.$set(this.settings, name, value)
        })
      })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },
  },
}
</script>
