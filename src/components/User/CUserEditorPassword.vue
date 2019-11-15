<template>
  <b-card
    class="shadow-sm m-2 p-0"
  >
    <b-form
      @submit.prevent="onPasswordSubmit"
    >
      <b-form-group
        :label="$t('new')"
        label-cols="2"
        :description="getPasswordWarning"
      >
        <b-form-input
          v-model="password"
          :state="passwordState"
          autocomplete="new-password"
          required
          type="password"
        />
      </b-form-group>

      <b-form-group
        :label="$t('confirm')"
        label-cols="2"
        :description="getConfirmPasswordWarning"
        class="mb-0"
      >
        <b-form-input
          v-model="confirmPassword"
          type="password"
          autocomplete="new-password"
          required
          :disabled="!passwordState"
          :state="confirmPasswordState"
        />
      </b-form-group>
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>

    <template #footer>
      <c-submit-button
        class="float-right"
        :processing="processing"
        :success="success"
        :disabled="!passwordState || !confirmPasswordState"
        @submit="onPasswordSubmit"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

/**
 * @todo find a way to get this number from the backend
 * @type {number}
 */
// const minPasswordLength = 5

export default {
  name: 'CUserEditorPassword',

  i18nOptions: {
    namespaces: [ 'system.users' ],
    keyPrefix: 'editor.password',
  },

  components: {
    CSubmitButton,
  },

  props: {
    processing: {
      type: Boolean,
      value: false,
    },
    success: {
      type: Boolean,
      value: false,
    },
  },

  data () {
    return {
      password: '',
      confirmPassword: '',
      minPasswordLength: 5,
    }
  },

  computed: {
    passwordState () {
      if (this.password.length > 0) {
        return this.password.length >= this.minPasswordLength
      }

      return null
    },

    confirmPasswordState () {
      if (this.passwordState && this.confirmPassword.length > 0) {
        return this.password === this.confirmPassword
      }

      return null
    },

    getPasswordWarning () {
      if (this.passwordState === false) {
        return this.$t('length', { length: this.minPasswordLength })
      }

      return null
    },

    getConfirmPasswordWarning () {
      if (this.confirmPasswordState === false) {
        return this.$t('missmatch')
      }

      return null
    },
  },

  methods: {
    onPasswordSubmit () {
      this.$emit('submit', this.password)

      this.password = ''
      this.confirmPassword = ''
    },
  },
}
</script>

<style scoped>

</style>
