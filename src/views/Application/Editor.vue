<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <b-button-group>
        <b-button
          variant="link"
          :to="{ name: 'user.new' }"
        >
          New &blk14;
        </b-button>
      </b-button-group>
      <b-button-group>
        <permissions-button
          title="Users"
          resource="system:users:*"
          button-variant="link"
        >
          Permissions &blk14;
        </permissions-button>
      </b-button-group>
    </c-content-header>
    <b-form @submit.prevent="onSubmit">
      <div class="header">
        <router-link
          :to="{ name: 'applications' }"
          class="float-right"
        >
          <b-button-close />
        </router-link>
        <h2 class="header-subtitle header-row">
          {{ $t('application.information') }}
        </h2>
      </div>

      <div
        v-if="error"
        class="bg-danger alert text-white"
      >
        {{ error }}
      </div>

      <div class="application">
        <b-form-group
          :label="$t('application.id.label')"
          label-cols="2"
        >
          <b-form-text>{{ application.applicationID }}</b-form-text>
        </b-form-group>

        <b-form-group
          :label="$t('application.name.label')"
          label-cols="2"
        >
          <b-form-input
            v-model="application.name"
            required
          />
        </b-form-group>

        <b-form-group label-cols="2">
          <b-form-checkbox v-model="application.enabled">
            {{ $t('application.enabled') }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group label-cols="2">
          <permissions-button
            :title="application.name"
            :resource="'system:application:'+applicationID"
          >
            {{ $t('application.manage-id-permissions') }}
          </permissions-button>
        </b-form-group>

        <b-form-group
          v-if="application.unify"
          :label="$t('application.appSelector.label')"
          label-cols="2"
          class="unify"
        >
          <b-form-group>
            <b-form-checkbox v-model="application.unify.listed">
              {{ $t('application.listed') }}
            </b-form-checkbox>
          </b-form-group>

          <b-form-group
            :label="$t('application.name.label')"
            :description="$t('application.name.description')"
            label-cols="2"
          >
            <b-form-input v-model="application.unify.name" />
          </b-form-group>

          <b-form-group
            :label="$t('application.icon.label')"
            :description="$t('application.icon.description')"
            label-cols="2"
          >
            <b-form-input v-model="application.unify.icon" />
          </b-form-group>

          <b-form-group
            :label="$t('application.logo.label')"
            :description="$t('application.logo.description')"
            label-cols="2"
          >
            <b-form-input v-model="application.unify.logo" />
          </b-form-group>

          <b-form-group
            :label="$t('application.url.label')"
            :description="$t('application.url.description')"
            label-cols="2"
          >
            <b-form-input v-model="application.unify.url" />
          </b-form-group>

          <b-form-group
            :label="$t('application.config.label')"
            :description="$t('application.config.description')"
          >
            <b-form-textarea
              v-model="application.unify.config"
              :state="configState"
              rows="10"
            />
          </b-form-group>
        </b-form-group>

        <b-form-group
          :label="$t('application.lastUpdate.label')"
          label-cols="2"
        >
          <b-form-text>{{ application.updatedAt }}</b-form-text>
        </b-form-group>

        <b-form-group
          :label="$t('application.created.label')"
          label-cols="2"
        >
          <b-form-text>{{ application.createdAt }}</b-form-text>
        </b-form-group>
      </div>
      <div class="footer">
        <confirmation-toggle
          v-if="applicationID"
          @confirmed="onDelete"
        >
          {{ $t('application.delete') }}
        </confirmation-toggle>
        <b-button
          :disabled="disableSubmit"
          type="submit"
          variant="primary"
        >
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>
  </b-container>
</template>
<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'

export default {
  components: {
    ConfirmationToggle,
  },

  i18nOptions: {
    namespaces: [ 'system.application' ],
    keyPrefix: 'editor',
  },

  props: {
    applicationID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      processing: false,
      error: null,

      application: {},
    }
  },

  computed: {
    disableSubmit () {
      return this.processing || !this.validConfig
    },

    validConfig () {
      if (!this.application.unify) {
        return true
      }

      try {
        if ((this.application.unify.config || '').trim() !== '') {
          JSON.parse(this.application.unify.config)
        }
        return true
      } catch (e) {
        return false
      }
    },

    configState () {
      if (((this.application.unify || {}).config || '').trim() === '') {
        return null
      } else {
        return this.validConfig
      }
    },
  },

  watch: {
    applicationID: {
      immediate: true,
      handler () {
        if (this.applicationID) {
          this.fetchApplication()
        }
      },
    },
  },

  methods: {
    fetchApplication () {
      this.processing = true
      this.error = null

      this.$SystemAPI.applicationRead({ applicationID: this.applicationID })
        .then(this.prepare)
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    onDelete () {
      this.processing = true
      this.error = null

      this.$SystemAPI.applicationDelete({ applicationID: this.applicationID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'applications' })
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    onSubmit () {
      this.processing = true
      this.error = null

      const payload = { ...this.application }

      if (this.applicationID) {
        this.$SystemAPI.applicationUpdate(payload)
          .then(this.handler)
          .catch(this.stdReject)
          .finally(this.finalize)
      } else {
        this.$SystemAPI.applicationCreate(payload)
          .then(this.handler)
          .then(({ applicationID }) => {
            this.$router.push({ name: 'applications.application', params: { applicationID } })
          })
          .catch(this.stdReject)
          .finally(this.finalize)
      }
    },

    handler (application) {
      // Inform parent component about application changes
      // @todo solve this with vuex
      this.$emit('update')
      this.prepare(application)

      return Promise.resolve(application)
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

    stdReject ({ message = null } = {}) {
      this.error = message
    },

    finalize () {
      this.processing = false
    },
  },
}
</script>
<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);

  .header {
    flex: 1;
    height: 150px;
  }

  .footer {
    flex: 1;
    text-align: right;
    height: 150px;
  }

  .application {
    flex: 1;
    flex-grow: 100;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 2px;
  }

  .unify {
    padding-top: 10px;
    border-width: 2px 0 2px 0 ;
    border-style: solid;
    border-color: $light;
  }
}

</style>
