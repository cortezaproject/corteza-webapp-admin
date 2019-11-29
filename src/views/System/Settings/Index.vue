<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <c-system-editor-auth
      :auth="getAuth"
      :processing="auth.processing"
      :success="auth.success"
      :can-manage="canManage"
      @submit="onAuthSubmit"
    />

    <c-system-editor-email
      class="mt-3"
      :email="getEmail"
      :processing="email.processing"
      :success="email.success"
      :can-manage="canManage"
      @submit="onEmailSubmit"
    />

    <c-system-editor-external
      class="mt-3"
      :external="settings"
      :processing="external.processing"
      :success="external.success"
      :can-manage="canManage"
      @submit="onExternalSubmit"
    />
  </b-container>
</template>
<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CSystemEditorAuth from 'corteza-webapp-admin/src/components/Settings/System/CSystemEditorAuth'
import CSystemEditorEmail from 'corteza-webapp-admin/src/components/Settings/System/CSystemEditorEmail'
import CSystemEditorExternal from 'corteza-webapp-admin/src/components/Settings/System/CSystemEditorExternal'

export default {
  i18nOptions: {
    namespaces: [ 'system.settings' ],
    keyPrefix: 'editor',
  },

  components: {
    CSystemEditorAuth,
    CSystemEditorEmail,
    CSystemEditorExternal,
  },

  mixins: [
    editorHelpers,
  ],

  data () {
    return {
      settings: [],

      canManage: false,

      auth: {
        processing: false,
        success: false,
      },

      email: {
        processing: false,
        success: false,
      },

      external: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    getAuth () {
      if (this.settings.length > 0) {
        return this.settings.reduce((map, obj) => {
          const { name, value } = obj
          const split = name.split('.')
          if (split[0] === 'auth' && split[1] !== 'external') {
            map[name] = value
          }
          return map
        }, {})
      }
      return {}
    },

    getEmail () {
      if (this.settings.length > 0) {
        return this.settings.reduce((map, obj) => {
          const { name, value } = obj
          const split = name.split('.')
          if (split[0] === 'general' && split[1] === 'mail') {
            map[name] = value
          }
          return map
        }, {})
      }
      return {}
    },
  },

  created () {
    this.fetchSettings()
  },

  methods: {
    fetchSettings () {
      this.incLoader()

      this.$SystemAPI.settingsList()
        .then(settings => {
          this.settings = settings

          this.$SystemAPI.permissionsEffective()
            .then(rules => {
              this.canManage = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'settings.manage').allow
            })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onAuthSubmit (auth) {
      this.auth.processing = true

      const values = Object.entries(auth).map(([name, value]) => {
        return { name, value }
      })

      this.$SystemAPI.settingsUpdate({ values })
        .then(() => {
          this.animateSuccess('auth')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.auth.processing = false
        })
    },

    onEmailSubmit (email) {
      this.email.processing = true

      const values = Object.entries(email).map(([name, value]) => {
        return { name, value }
      })

      this.$SystemAPI.settingsUpdate({ values })
        .then(() => {
          this.animateSuccess('email')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.email.processing = false
        })
    },

    onExternalSubmit (external) {
      this.external.processing = true

      this.$SystemAPI.settingsUpdate({ values: external })
        .then(() => {
          this.animateSuccess('external')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.external.processing = false
        })
    },
  },
}
</script>
