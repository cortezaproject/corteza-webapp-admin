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
        class="mb-0"
      >
        <b-form-input
          v-model="confirmPassword"
          :state="confirmPasswordState"
          autocomplete="new-password"
          required
          type="password"
        />
        <span
          v-if="confirmPasswordState === false"
        >
          {{ $t('missmatch') }}
        </span>
        <span
          v-if="passwordState === false"
        >
          {{ $t('length', { length: minPasswordLength }) }}
        </span>
      </b-form-group>
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
        <b-spinner
          v-if="processing"
          small
          class="float-right"
          type="grow"
        />
        <font-awesome-icon
          v-else-if="success"
          :icon="['fas', 'check']"
          class="text-success float-right"
        />
      </h3>
    </template>

    <template #footer>
      <b-button
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
