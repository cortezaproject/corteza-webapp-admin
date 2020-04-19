<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <c-one-logo
      v-model="settings.logo"
      :processing="basic.processing"
      :success="basic.success"
      :can-manage="canManage"
      class="mb-3"
      @submit="onPanelsSubmit"
    />

    <c-one-editor-panels
      v-model="settings.panels"
      :processing="basic.processing"
      :success="basic.success"
      :can-manage="canManage"
      @submit="onPanelsSubmit"
    />
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import COneEditorPanels from 'corteza-webapp-admin/src/components/Settings/One/COneEditorPanels'
import COneLogo from 'corteza-webapp-admin/src/components/Settings/One/COneLogo'

const prefix = 'ui.one.'

export default {
  i18nOptions: {
    namespaces: [ 'ui.one.settings' ],
    keyPrefix: 'editor',
  },

  components: {
    COneEditorPanels,
    COneLogo,
  },

  mixins: [
    editorHelpers,
  ],

  data () {
    return {
      settings: {
        panels: [],
      },

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

      this.$SystemAPI.permissionsEffective()
        .then(rules => {
          this.canManage = rules.find(({ resource, operation }) => resource === 'system' && operation === 'settings.manage').allow
        })
        .then(() => this.$SystemAPI.settingsList({ prefix }))
        .then(settings => {
          settings.forEach(({ name, value }) => {
            name = name.substring(prefix.length)
            this.$set(this.settings, name, value)
          })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onPanelsSubmit (panels) {
      this.basic.processing = true

      const values = [{ name: prefix + 'panels', value: panels }]

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
