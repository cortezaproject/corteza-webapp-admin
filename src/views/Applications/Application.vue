<template>
  <b-form @submit.prevent="onSubmit">
    <div class="header">
      <router-link :to="{ name: 'applications' }" class="float-right"><b-button-close></b-button-close></router-link>
      <h2 class="header-subtitle header-row">
        {{ $t('application.information') }}
      </h2>

    </div>
    <div class="application">
      <b-form-group :label="$t('application.id.label')" label-cols="3">
        <b-form-text>{{ application.applicationID }}</b-form-text>
      </b-form-group>

      <b-form-group :label="$t('application.name.label')" label-cols="3">
        <b-form-input v-model="application.name" required />
      </b-form-group>

      <b-form-group label-cols="3">
        <b-form-checkbox plain v-model="application.enabled">{{ $t('application.enabled') }}</b-form-checkbox>
      </b-form-group>

      <b-form-group label-cols="3">
        <permissions-button :resource="'system:application:'+applicationID">{{ $t('application.manage-id-permissions') }}</permissions-button>
      </b-form-group>

      <b-form-group :label="$t('application.appSelector.label')" label-cols="3" v-if="application.unify" class="unify">
        <b-form-group>
          <b-form-checkbox plain v-model="application.unify.listed">{{ $t('application.listed') }}</b-form-checkbox>
        </b-form-group>

        <b-form-group :label="$t('application.name.label')" label-cols="3" :description="$t('application.name.description')">
          <b-form-input v-model="application.unify.name" />
        </b-form-group>

        <b-form-group :label="$t('application.icon.label')" :description="$t('application.icon.description')" label-cols="3">
          <b-form-input v-model="application.unify.icon" />
        </b-form-group>

        <b-form-group :label="$t('application.logo.label')" :description="$t('application.logo.description')" label-cols="3">
          <b-form-input v-model="application.unify.logo" />
        </b-form-group>

        <b-form-group :label="$t('application.url.label')" :description="$t('application.url.description')" label-cols="3">
          <b-form-input v-model="application.unify.url" />
        </b-form-group>

        <b-form-group :label="$t('application.config.label')" :description="$t('application.config.description')">
          <b-form-textarea rows="10" v-model="application.unify.config" :state="configState"></b-form-textarea>
        </b-form-group>
      </b-form-group>

      <b-form-group :label="$t('application.lastUpdate.label')" label-cols="3">
        <b-form-text>{{ application.updatedAt }}</b-form-text>
      </b-form-group>

      <b-form-group :label="$t('application.created.label')" label-cols="3">
        <b-form-text>{{ application.createdAt }}</b-form-text>
      </b-form-group>
    </div>
    <div class="footer">
      <confirmation-toggle @confirmed="onDelete" v-if="applicationID">{{ $t('application.delete') }}</confirmation-toggle>
      <b-button type="submit" variant="primary" :disabled="disableSubmit">{{ $t('general.label.submit') }}</b-button>
    </div>
  </b-form>
</template>
<script>
import ConfirmationToggle from '@/components/ConfirmationToggle'

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
          this.fetchApplications()
        }
      },
    },
  },

  methods: {
    fetchApplications () {
      this.processing = true
      this.$SystemAPI.applicationRead({ applicationID: this.applicationID }).then(application => {
        this.prepare(application)
        this.processing = false
      })
    },

    onDelete () {
      this.$SystemAPI.applicationDelete({ applicationID: this.applicationID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'applications' })
        })
    },

    onSubmit () {
      this.processing = true

      const payload = { ...this.application }

      if (this.applicationID) {
        this.$SystemAPI.applicationUpdate(payload).then(this.handler)
      } else {
        this.$SystemAPI.applicationCreate(payload)
          .then(this.handler)
          .then(({ applicationID }) => {
            this.$router.push({ name: 'applications.application', params: { applicationID } })
          })
      }
    },

    handler (application) {
      this.processing = false

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
