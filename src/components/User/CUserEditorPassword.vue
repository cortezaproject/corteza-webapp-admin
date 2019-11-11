<template>
  <b-card
    class="shadow-sm m-2 p-0"
  >
    <b-form
      v-if="userID"
      @submit.prevent="onPasswordSubmit"
    >
      <b-form-group
        :label="$t('user.password.new')"
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
        :label="$t('user.password.confirm')"
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
      <div class="footer">
        <span
          v-if="confirmPasswordState === false"
          class="mr-5"
        >
          {{ $t('user.password.missmatch') }}
        </span>
        <b-button
          v-if="userID"
          :disabled="processing || password !== confirmPassword"
          type="submit"
          variant="primary"
          class="ml-10"
        >
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>
  </b-card>
</template>
<script>
/**
 * @todo find a way to get this number from the backend
 * @type {number}
 */
const minPasswordLength = 4

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
  },

  data () {
    return {
      processing: false,

      password: '',
      confirmPassword: '',

      error: null,
    }
  },

  computed: {
    passwordState () {
      if (this.password.length > 0) {
        return this.password.length > minPasswordLength
      }

      return null
    },

    confirmPasswordState () {
      if (this.password.length > 0) {
        return this.password === this.confirmPassword
      }

      return null
    },
  },

}
</script>

<style scoped>

</style>
