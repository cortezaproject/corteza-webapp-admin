<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <c-federation-editor-info
      :federation="federation"
      :processing="info.processing"
      :success="info.success"
      @submit="onInfoSubmit"
      @delete="onDelete"
    />
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CFederationEditorInfo from 'corteza-webapp-admin/src/components/Federation/CFederationEditorInfo'

export default {
  components: {
    CFederationEditorInfo,
  },

  i18nOptions: {
    namespaces: [ 'system.federation' ],
    keyPrefix: 'editor',
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    federationID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      federation: {},

      // Processing and success flags for each form
      info: {
        processing: false,
        success: false,
      },
    }
  },

  watch: {
    federationID: {
      immediate: true,
      handler () {
        if (this.federationID) {
          this.fetchFederation()
        } else {
          this.federation = {}
        }
      },
    },
  },

  methods: {
    fetchFederation () {
      this.federation = { federationID: '0', name: 'Bromley High School', url: 'bromley.com', email: 'bromley@mail.com', enabled: 'True', status: 'Paired', tags: ['Education', 'HR'], createdAt: new Date() }
      // this.incLoader()

      // this.$SystemAPI.federationRead({ federationID: this.federationID })
      //   .then(federation => {
      //     this.federation = new system.Federation(federation)
      //   })
      //   .catch(this.stdReject)
      //   .finally(() => {
      //     this.decLoader()
      //   })
    },

    /**
     * Handles federation info submit event, calls federation update or create API endpoint
     * and handles response & errors
     *
     * @param federation {Object}
     */
    onInfoSubmit (federation) {
      this.info.processing = true

      const payload = { ...federation }

      if (payload.federationID) {
        // On update, reset the federation obj
        this.$SystemAPI.federationUpdate(payload)
          .then(u => {
            this.animateSuccess('info')
            this.federation = u
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        // On creation, redirect to edit page
        this.$SystemAPI.federationCreate(payload)
          .then(({ federationID }) => {
            this.animateSuccess('info')
            this.$router.push({ name: 'system.federation.edit', params: { federationID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },

    /**
     * Handles federation delete event, calls federation delete API endpoint
     * and handles response & errors
     */
    onDelete () {
      this.incLoader()

      if (this.federation.deletedAt) {
        this.$SystemAPI.federationUndelete({ federationID: this.federationID })
          .then(() => {
            this.fetchFederation()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.federationDelete({ federationID: this.federationID })
          .then(() => {
            this.fetchFederation()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },
  },
}
</script>
