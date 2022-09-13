<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="connectionID ? $t('title.edit') : $t('title.create')"
    />

    <b-form
      v-if="connection"
      @submit.prevent="onSubmit"
    >
      <c-connection-editor-info
        :connection="connection"
        :sensitivity-levels="sensitivityLevels"
        :disabled="disabled"
        :is-primary="isPrimary"
      />

      <c-connection-editor-properties
        :properties="connection.meta.properties"
        :disabled="disabled"
        class="mt-4"
      />

      <c-connection-editor-dal
        v-if="connection.config.dal"
        :dal="connection.config.dal"
        :issues="connection.issues || []"
        :disabled="disabled"
        :can-manage="connection.canManageDalConfig"
        class="mt-4"
      />
      <!--
        include hidden input to enable
        trigger submit event w/ ENTER
      -->
      <input
        type="submit"
        class="d-none"
      >

      <b-container>
        <b-row>
          <b-col
            cols="12"
            class="mt-3 mb-5 text-right"
          >
            <confirmation-toggle
              v-if="connection && connection.connectionID && !isPrimary && !disabled"
              cta-class="link"
              @confirmed="toggleDelete"
            >
              {{ connection.deletedAt ? $t('general:label.undelete') : $t('general:label.delete') }}
            </confirmation-toggle>

            <c-submit-button
              :processing="processing"
              :disabled="disabled"
              @submit="onSubmit"
            />
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </b-container>
</template>

<script>
import { NoID } from '@cortezaproject/corteza-js'
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CConnectionEditorInfo from 'corteza-webapp-admin/src/components/Connection/CConnectionEditorInfo'
import CConnectionEditorProperties from 'corteza-webapp-admin/src/components/Connection/CConnectionEditorProperties'
import CConnectionEditorDal from 'corteza-webapp-admin/src/components/Connection/CConnectionEditorDAL'
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import { mapGetters } from 'vuex'
import { merge } from 'lodash'

const base = Object.freeze({
  handle: '',
  type: 'corteza::system:dal-connection',

  meta: {
    name: '',
    ownership: '',
    location: {
      properties: { name: '' },
      geometry: {
        coordinates: [],
        type: '',
      },

    },

    properties: {
      dataAtRestEncryption: {
        enabled: false,
        notes: '',
      },
      dataAtRestProtection: {
        enabled: false,
        notes: '',
      },
      dataAtTransitEncryption: {
        enabled: false,
        notes: '',
      },
      dataRestoration: {
        enabled: false,
        notes: '',
      },
    },
  },

  config: {
    privacy: {
      sensitivityLevelID: NoID,
    },
  },
})

const baseConfigDAL = Object.freeze({
  type: 'corteza::dal:connection:dsn',
  params: { dsn: '' },
  modelIdent: '',
  modelIdentCheck: [],
})

export default {
  components: {
    CConnectionEditorInfo,
    CConnectionEditorDal,
    CConnectionEditorProperties,
    ConfirmationToggle,
    CSubmitButton,
  },

  i18nOptions: {
    namespaces: 'system.connections',
    keyPrefix: 'editor',
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

      sensitivityLevels: [],
    }
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    canCreate () {
      return this.can('system/', 'dal-connection.create')
    },

    isPrimary () {
      return this.connection.type === 'corteza::system:primary-dal-connection'
    },

    disabled () {
      return this.processing
    },
  },

  watch: {
    connectionID: {
      immediate: true,
      handler (connectionID) {
        if (connectionID) {
          this.fetchConnection(connectionID)
        } else {
          this.connection = Object.assign({}, { ...base })
        }
      },
    },
  },

  mounted () {
    this.fetchSensitivityLevels()
  },

  methods: {
    fetchConnection (connectionID) {
      this.incLoader()
      return this.$SystemAPI.dalConnectionRead({ connectionID }).then(connection => {
        this.connection = this.merge(connection)
      }).catch(this.toastErrorHandler(this.$t('notification:connection.fetch.error')))
        .finally(async () => {
          this.decLoader()
        })
    },

    async fetchSensitivityLevels () {
      this.processing = true

      return this.$SystemAPI.dalSensitivityLevelList()
        .then(({ set = [] }) => {
          this.sensitivityLevels = set
        })
        .catch(this.toastErrorHandler(this.$t('notification:sensitivity-level.fetch.error')))
        .finally(() => {
          this.processing = false
        })
    },

    onSubmit () {
      const updating = !!this.connection.connectionID
      const op = updating ? 'update' : 'delete'
      const fn = updating ? 'dalConnectionUpdate' : 'dalConnectionCreate'

      this.processing = true
      this.incLoader()

      return this.$SystemAPI[fn](this.connection)
        .then(connection => {
          const { connectionID } = this.connection

          this.toastSuccess(this.$t(`notification:connection.${op}.success`))
          if (!updating) {
            this.$router.push({ name: `system.connection.edit`, params: { connectionID } })
          } else {
            this.connection = this.merge(connection)
          }
        })
        .catch(this.toastErrorHandler(this.$t(`notification:connection.${op}.error`)))
        .finally(() => {
          this.processing = false
        })
    },

    toggleDelete () {
      const { deletedAt } = this.connection
      const deleting = !!deletedAt
      const op = deleting ? 'delete' : 'undelete'
      const fn = deleting ? 'dalConnectionDelete' : 'dalConnectionUndelete'

      this.processing = true
      this.incLoader()

      return this.$SystemAPI[fn](this.connection)
        .then(connection => {
          this.toastSuccess(this.$t(`notification:connection.${op}.success`))

          if (deleting) {
            /**
             * Resource deleted, move back to the list
             */
            this.$router.push({ name: `system.connection` })
          } else {
            this.connection.deletedAt = null
          }
        })
        .catch(this.toastErrorHandler(this.$t(`notification:connection.${op}.error`)))
        .finally(() => {
          this.processing = false
        })
    },

    merge (conn) {
      conn = merge({}, { ...base }, conn)
      if (conn.canManageDalConfig) {
        conn.config.dal = merge({}, { ...baseConfigDAL }, conn.config.dal)
      }

      return conn
    },
  },
}
</script>
