<template>
  <b-card
    class="shadow-sm m-2"
  >
    <template v-slot:header>
      <h5 class="m-0">
        {{ $t('user.password.change') }}
        {{ $t('user.information') }}
      </h5>
    </template>
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
          :disabled="processing || user.password !== user.confirmPassword"
          type="submit"
          variant="primary"
          class="ml-10"
        >
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'CUserEditorPassword',

  params: {
    userID: {
      type: String,
      required: true,
    }
  },

  data () {
    return {
      processing: false,

      password: '',
      confirmPassword: '',

      error: null,
    }
  },
}
</script>

<style scoped>

</style>
