<template>
  <b-card
    class="shadow-sm m-2 p-0"
  >
    <b-form
      v-if="userID"
      @submit.prevent="onPasswordSubmit"
    >
      <b-form-group
        :label="$t('new')"
        label-cols="2"
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
      >
        <b-form-input
          v-model="confirmPassword"
          :state="confirmPasswordState"
          autocomplete="new-password"
          required
          type="password"
        />
      </b-form-group>

      <span
        v-if="confirmPasswordState === false"
        class="mr-5"
      >
        {{ $t('missmatch') }}
      </span>
      <span
        v-if="passwordState === false"
        class="mr-5"
      >
        {{ $t('length', { length: minPasswordLength }) }}
      </span>
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>

    <template #footer>
      <b-button
        v-if="userID"
        :disabled="processing || password !== confirmPassword"
        type="submit"
        variant="primary"
        class="ml-10"
        @click.prevent="onPasswordSubmit"
      >
        {{ $t('submit') }}
      </b-button>
    </template>
  </b-card>
</template>
<script>
/**
 * @todo find a way to get this number from the backend
 * @type {number}
 */
// const minPasswordLength = 5

export default {
  name: 'CUserEditorPassword',

  i18nOptions: {
    namespaces: [ 'users' ],
    keyPrefix: 'editor.password',
  },

  props: {
    userID: {
      type: String,
      required: true,
    },
    processing: {
      type: Boolean,
      value: false,
    },
  },

  data () {
    return {
      password: '',
      confirmPassword: '',
      minPasswordLength: 5,

      error: null,
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
