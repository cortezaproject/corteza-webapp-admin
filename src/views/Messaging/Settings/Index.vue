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
      :can-manage="canManage"
      @submit="onBasicSubmit"
    />
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CMessagingEditorBasic from 'corteza-webapp-admin/src/components/Settings/Messaging/CMessagingEditorBasic'

const prefix = 'messaging.'

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

      canManage: false,

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
    fetchSettings () {
      this.incLoader()

      this.$SystemAPI.settingsList({ prefix })
        .then(settings => {
          settings.forEach(({ name, value }) => {
            this.$set(this.settings, name, value)
          })

          this.$MessagingAPI.permissionsEffective()
            .then(rules => {
              this.canManage = rules.find(({ resource, operation, allow }) => resource === 'messaging' && operation === 'settings.manage').allow
            })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onBasicSubmit (basic) {
      this.basic.processing = true

      const values = Object.entries(basic).map(([name, value]) => {
        return { name, value }
      })

      this.$SystemAPI.settingsUpdate({ values })
        .then(() => {
          this.animateSuccess('basic')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.basic.processing = false
        })
    },
  },
}
</script>
