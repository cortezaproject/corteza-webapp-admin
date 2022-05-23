<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="title"
    />

    <c-external-connection-editor-info
      :connection="connection"
      :processing="info.processing"
      :success="info.success"
      @submit="onInfoSubmit"
    />

    <c-external-connection-capabilities
      v-if="connection && connectionID"
      :connection="connection"
      :processing="capabilities.processing"
      :success="capabilities.success"
      class="mt-4"
      @submit="onCapabilitiesSubmit"
    />
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CExternalConnectionEditorInfo from 'corteza-webapp-admin/src/components/Connection/External/CExternalConnectionEditorInfo'
import CExternalConnectionCapabilities from 'corteza-webapp-admin/src/components/Connection/External/CExternalConnectionCapabilities'
import { mapGetters } from 'vuex'

export default {
  components: {
    CExternalConnectionEditorInfo,
    CExternalConnectionCapabilities,
  },

  i18nOptions: {
    namespaces: 'system.connections',
    keyPrefix: 'external',
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    connectionID: {
      type: String,
      default: undefined,
    },
  },

  data () {
    return {
      connections: [
        { connectionID: '1', name: 'Primary Data Lake', dsn: 'postgresql:://*************@dlacke.acme.internnal/acme-db', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: true },
      ],

      connection: {},

      info: {
        processing: false,
        success: false,
      },

      capabilities: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    title () {
      return this.connectionID ? this.$t('title.edit') : this.$t('title.create')
    },
  },

  watch: {
    connectionID: {
      immediate: true,
      handler (connectionID) {
        if (connectionID) {
          this.connection = this.connections.find(ds => ds.connectionID === connectionID)
        } else {
          this.connection = {}
        }
      },
    },
  },

  methods: {
    onInfoSubmit (connection) {
      this.info.processing = true

      this.animateSuccess('info')
      if (connection.connectionID) {
        this.toastSuccess(this.$t('notification:connection.update.success'))
      } else {
        this.toastSuccess(this.$t('notification:connection.create.success'))
      }
      this.$router.push({ name: 'system.connection.edit', params: { connectionID: '1' } })

      this.info.processing = false
    },

    onCapabilitiesSubmit () {
      this.capabilities.processing = true

      this.animateSuccess('capabilities')
      this.toastSuccess(this.$t('notification:connection.update-capabilities.success'))

      this.capabilities.processing = false
    },
  },
}
</script>
