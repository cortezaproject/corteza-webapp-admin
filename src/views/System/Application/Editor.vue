<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <b-button-group
        v-if="applicationID && canCreate"
      >
        <b-button
          variant="link"
          :to="{ name: 'system.application.new' }"
        >
          {{ $t('new') }}
        </b-button>
      </b-button-group>
      <b-button-group
        v-if="applicationID && canGrant"
      >
        <c-permissions-button
          :title="application.name"
          :resource="'system:application:'+applicationID"
          button-variant="link"
        >
          {{ $t('permissions') }}
        </c-permissions-button>
      </b-button-group>
    </c-content-header>

    <c-application-editor-info
      :application="application"
      :processing="info.processing"
      :success="info.success"
      :can-create="canCreate"
      @submit="onInfoSubmit"
      @delete="onDelete"
    />

    <c-application-editor-unify
      v-if="application.unify && application.applicationID"
      class="mt-3"
      :unify="application.unify"
      :processing="unify.processing"
      :success="unify.success"
      @submit="onUnifySubmit"
      @delete="onDelete"
    />
  </b-container>
</template>
<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CApplicationEditorInfo from 'corteza-webapp-admin/src/components/Application/CApplicationEditorInfo'
import CApplicationEditorUnify from 'corteza-webapp-admin/src/components/Application/CApplicationEditorUnify'

export default {
  components: {
    CApplicationEditorInfo,
    CApplicationEditorUnify,
  },

  i18nOptions: {
    namespaces: [ 'system.applications' ],
    keyPrefix: 'editor',
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    applicationID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      application: {},

      canCreate: false,
      canGrant: false,

      info: {
        processing: false,
        success: false,
      },
      unify: {
        processing: false,
        success: false,
      },
    }
  },

  watch: {
    applicationID: {
      immediate: true,
      handler () {
        this.fetchEffective()
        if (this.applicationID) {
          this.fetchApplication()
        } else {
          this.application = {}
        }
      },
    },
  },

  methods: {
    fetchApplication () {
      this.incLoader()

      this.$SystemAPI.applicationRead({ applicationID: this.applicationID })
        .then(this.prepare)
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    fetchEffective () {
      this.incLoader()

      this.$SystemAPI.permissionsEffective()
        .then(rules => {
          this.canCreate = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'application.create').allow
          this.canGrant = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'grant').allow
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onInfoSubmit (application) {
      this.info.processing = true

      if (this.applicationID) {
        this.$SystemAPI.applicationUpdate(application)
          .then(a => {
            this.animateSuccess('info')
            this.application = a
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$SystemAPI.applicationCreate(application)
          .then(({ applicationID }) => {
            this.animateSuccess('info')
            this.$router.push({ name: 'system.application.edit', params: { applicationID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },

    onUnifySubmit (unify) {
      this.unify.processing = true

      if (this.applicationID) {
        this.$SystemAPI.applicationUpdate({ ...this.application, unify })
          .then(a => {
            this.animateSuccess('unify')
            this.application = a
          })
          .catch(this.stdReject)
          .finally(() => {
            this.unify.processing = false
          })
      }
    },

    onDelete () {
      this.incLoader()

      if (this.application.deletedAt) {
        this.$SystemAPI.applicationUndelete({ applicationID: this.applicationID })
          .then(() => {
            this.fetchApplication()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.applicationDelete({ applicationID: this.applicationID })
          .then(() => {
            this.fetchApplication()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },

    prepare (application = {}) {
      if (!application.unify) {
        application.unify = {
          listed: true,
          name: this.application.name,
          config: '',
          icon: '',
          logo: '',
          url: '',
        }
      }

      this.application = application
    },
  },
}
</script>
