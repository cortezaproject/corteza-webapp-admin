<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="title"
    />

    <c-connection-editor-info
      v-if="connection"
      :connection="connection"
      :processing="info.processing"
      :success="info.success"
      :can-create="canCreate"
      @submit="onInfoSubmit"
      @delete="onDelete"
    />

    <c-connection-capabilities
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
import CConnectionEditorInfo from 'corteza-webapp-admin/src/components/Connection/CConnectionEditorInfo'
import CConnectionCapabilities from 'corteza-webapp-admin/src/components/Connection/CConnectionCapabilities'
import { mapGetters } from 'vuex'

export default {
  components: {
    CConnectionEditorInfo,
    CConnectionCapabilities,
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
      processing: false,
      connection: undefined,

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

    canCreate () {
      return this.can('system/', 'dal-connection.create')
    },
  },

  watch: {
    connectionID: {
      immediate: true,
      handler (connectionID) {
        if (connectionID) {
          this.fetchConnection(connectionID)
        } else {
          this.connection = {
            name: '',
            handle: '',
            type: 'corteza::system:dal-connection',

            location: {
              geometry: {
                coordinates: [],
                type: '',
              },
              properties: {
                name: '',
              },
            },

            ownership: '',
            sensitivityLevel: undefined,

            config: {
              defaultModelIdent: 'compose_record',
              defaultAttributeIdent: 'values',
              defaultPartitionFormat: 'compose_record_{{namespace}}_{{module}}',
              partitionFormatValidator: '',
              connection: {
                type: 'corteza::dal:connection:dsn',
                params: {
                  dsn: '',
                },
              },
            },

            capabilities: {
              enforced: [],
              supported: [
                'corteza::dal:capability:create',
                'corteza::dal:capability:update',
                'corteza::dal:capability:delete',
                'corteza::dal:capability:search',
                'corteza::dal:capability:lookup',
                'corteza::dal:capability:paging',
                'corteza::dal:capability:stats',
                'corteza::dal:capability:sorting',
                'corteza::dal:capability:RBAC',
              ],
              unsupported: [],
              enabled: [],
            },
          }
        }
      },
    },
  },

  methods: {
    fetchConnection (connectionID) {
      this.incLoader()

      return this.$SystemAPI.dalConnectionRead({ connectionID }).then(connection => {
        this.connection = connection
      }).catch(this.toastErrorHandler(this.$t('notification:fetch.error')))
        .finally(async () => {
          this.decLoader()
        })
    },

    onInfoSubmit (connection) {
      this.info.processing = true

      if (connection.connectionID) {
        this.$SystemAPI.dalConnectionUpdate(connection)
          .then(connection => {
            this.connection = connection

            this.animateSuccess('info')
            this.toastSuccess(this.$t('notification:connection.update.success'))
          })
          .catch(this.toastErrorHandler(this.$t('notification:connection.update.error')))
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$SystemAPI.dalConnectionCreate(connection)
          .then(({ connectionID }) => {
            this.animateSuccess('info')
            this.toastSuccess(this.$t('notification:connection.create.success'))
            this.$router.push({ name: 'system.connection.edit', params: { connectionID } })
          })
          .catch(this.toastErrorHandler(this.$t('notification:connection.create.error')))
          .finally(() => {
            this.info.processing = false
          })
      }
    },

    onDelete () {
      this.incLoader()

      if (this.connection.deletedAt) {
        this.$SystemAPI.dalConnectionUndelete({ connectionID: this.connectionID })
          .then(() => {
            this.fetchConnection()

            this.toastSuccess(this.$t('notification:connection.undelete.success'))
          })
          .catch(this.toastErrorHandler(this.$t('notification:connection.undelete.error')))
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.dalConnectionDelete({ connectionID: this.connectionID })
          .then(() => {
            this.$router.push({ name: 'system.connection' })
          })
          .catch(this.toastErrorHandler(this.$t('notification:connection.delete.error')))
          .finally(() => {
            this.decLoader()
          })
      }
    },

    onCapabilitiesSubmit ({ capabilities }) {
      this.capabilities.processing = true

      this.$SystemAPI.dalConnectionUpdate({ ...this.connection, capabilities })
        .then(connection => {
          this.connection = connection

          this.animateSuccess('capabilities')
          this.toastSuccess(this.$t('notification:connection.capabilities.success'))
        })
        .catch(this.toastErrorHandler(this.$t('notification:connection.capabilities.error')))
        .finally(() => {
          this.capabilities.processing = false
        })
    },
  },
}
</script>
