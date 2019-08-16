<template>
  <b-form @submit.prevent="onSubmit" class="d-flex flex-column">
    <div class="sticky-top bg-white px-3 py-2 border-bottom">
      <h5 class="float-left">
        {{ $t('application.information') }} ({{ $t('application.id.label') }}: {{ application.applicationID }})
      </h5>
      <permissions-button :title="application.name" :resource="'system:application:'+applicationID" class="float-right">{{ $t('application.manage-id-permissions') }}</permissions-button>
    </div>
    <div class="flex-grow-1 overflow-auto p-5">
      <b-form-group :label="$t('application.name.label')" label-cols-lg="1">
        <b-form-input v-model="application.name" required />
      </b-form-group>

      <b-form-group>
        <b-form-checkbox v-model="application.enabled">{{ $t('application.enabled') }}</b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox v-model="application.unify.listed">{{ $t('application.listed') }}</b-form-checkbox>
      </b-form-group>

      <div v-if="application.unify" class="border-top pt-3">
        <h6>{{ $t('application.appSelector.label') }}</h6>
        <b-form-group :label="$t('application.name.label')" label-cols-lg="1" :description="$t('application.name.description')">
          <b-form-input v-model="application.unify.name" />
        </b-form-group>

        <b-form-group :label="$t('application.icon.label')" :description="$t('application.icon.description')" label-cols-lg="1">
          <b-form-input v-model="application.unify.icon" />
        </b-form-group>

        <b-form-group :label="$t('application.logo.label')" :description="$t('application.logo.description')" label-cols-lg="1">
          <b-form-input v-model="application.unify.logo" />
        </b-form-group>

        <b-form-group :label="$t('application.url.label')" :description="$t('application.url.description')" label-cols-lg="1">
          <b-form-input v-model="application.unify.url" />
        </b-form-group>

        <b-form-group :label="$t('application.config.label')" :description="$t('application.config.description')">
          <b-form-textarea rows="10" v-model="application.unify.config" :state="configState"></b-form-textarea>
        </b-form-group>
      </div>

      <b-form-group :label="$t('application.created.label')" class="w-50 d-inline">
        <b-form-text>{{ application.createdAt }}</b-form-text>
      </b-form-group>
      <b-form-group :label="$t('application.lastUpdate.label')" class="w-50 d-inline">
        <b-form-text>{{ application.updatedAt }}</b-form-text>
      </b-form-group>
    </div>
    <div class="sticky-bottom mb-3 bg-white p-1 border-top text-right">
      <confirmation-toggle @confirmed="onDelete" v-if="applicationID">{{ $t('application.delete') }}</confirmation-toggle>
      <b-button type="submit" variant="primary" :disabled="disableSubmit">{{ $t('general.label.submit') }}</b-button>
    </div>
  </b-form>
</template>
<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'

export default {
  components: {
    ConfirmationToggle,
  },

  props: {
    applicationID: {
      type: String,
      required: false,
    },
  },

  data () {
    return {
      processing: false,
      application: {},
      error: null,
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
      this.$SystemAPI.applicationRead({ applicationID: this.applicationID })
        .then(this.prepare)
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    onDelete () {
      this.processing = true

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
  height: calc(100vh - 50px);
}

</style>
