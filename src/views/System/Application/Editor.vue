<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <b-button-group
        v-if="applicationID"
      >
        <b-button
          variant="link"
          :to="{ name: 'system.application.new' }"
        >
          New &blk14;
        </b-button>
      </b-button-group>
      <b-button-group
        v-if="applicationID"
      >
        <permissions-button
          title="Users"
          :resource="'system:applications:'+applicationID"
          button-variant="link"
        >
          Permissions &blk14;
        </permissions-button>
      </b-button-group>
    </c-content-header>

    <c-application-editor-info
      :application="application"
      :processing="info.processing"
      :success="info.success"
      @submit="onInfoSubmit"
      @delete="onDelete"
    />

    <c-application-editor-unify
      v-if="application.unify && application.applicationID"
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
