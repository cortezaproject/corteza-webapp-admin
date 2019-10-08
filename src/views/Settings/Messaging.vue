<template>
  <b-form @submit.prevent="onSubmit">
    <div class="header">
      <router-link :to="{ name: 'settings' }" class="float-right"><b-button-close></b-button-close></router-link>
      <h2 class="header-subtitle header-row">
        {{ $t('settings.messaging.title') }}
      </h2>
    </div>

    <main>
    </main>

    <div class="footer">
      <b-button type="submit" variant="primary" :disabled="!submittable">{{ $t('general.label.saveChanges') }}</b-button>
    </div>
  </b-form>
</template>

<script>
export default {
  data () {
    return {
      processing: true,

      error: null,

      settings: [],

      enabled: false,
    }
  },

  computed: {
    dirty () {
      return this.changes.length > 0
    },

    submittable () {
      return this.dirty && !this.processing
    },

    changes () {
      let c = []
      return c
    },
  },

  created () {
    this.fetchSettings()
  },

  methods: {
    checkForChange (name, newValue, settings = []) {
      const oldValue = (settings.find(s => s.name === name) || {}).value

      if (oldValue === undefined && newValue === undefined) {
        // Do not be greedy, skip when old value is undefined and
        // new value is falsy
        return
      }

      if (newValue === oldValue) {
        return
      }

      // Values changed, record
      return { name, value: newValue }
    },

    onSubmit () {
      // Collect changed variables
      this.processing = true

      this.$SystemAPI.settingsUpdate({ values: this.changes })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchSettings () {
      this.processing = true
    },

    stdReject ({ message }) {
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
    border-bottom: 2px solid $light;
  }

  .footer {
    flex: 1;
    text-align: right;
  }

  main {
    flex: 1;
    flex-grow: 100;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 2px;
  }
}
</style>
