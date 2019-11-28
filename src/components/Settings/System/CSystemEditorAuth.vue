<template>
  <b-card
    class="shadow-sm"
  >
    <b-form
      @submit.prevent="$emit('submit', auth)"
    >
      <b-form-group
        :label="$t('internal.title')"
        label-size="lg"
      >
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="auth['auth.internal.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('internal.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="auth['auth.internal.password-reset.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('internal.password-reset.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="auth['auth.internal.signup-email-confirmation-required']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('internal.signup-email-confirmation-required') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="auth['auth.internal.signup.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('internal.signup.enabled') }}
          </b-form-checkbox>
        </b-form-group>
      </b-form-group>

      <hr>

      <b-form-group
        :label="$t('frontend.title')"
        label-size="lg"
      >
        <b-form-group
          :label="$t('frontend.url.base')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input v-model="auth['auth.frontend.url.base']" />
          </b-input-group>
        </b-form-group>
        <b-form-group
          :label="$t('frontend.url.email-confirmation')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input v-model="auth['auth.frontend.url.email-confirmation']" />
          </b-input-group>
        </b-form-group>
        <b-form-group
          :label="$t('frontend.url.password-reset')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input v-model="auth['auth.frontend.url.password-reset']" />
          </b-input-group>
        </b-form-group>
        <b-form-group
          :label="$t('frontend.url.redirect')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input v-model="auth['auth.frontend.url.redirect']" />
          </b-input-group>
        </b-form-group>
      </b-form-group>

      <hr>

      <b-form-group
        :label="$t('mail.title')"
        label-size="lg"
      >
        <b-form-group
          :label="$t('mail.from-address')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input v-model="auth['auth.mail.from-address']" />
          </b-input-group>
        </b-form-group>
        <b-form-group
          :label="$t('mail.from-name')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input v-model="auth['auth.mail.from-name']" />
          </b-input-group>
        </b-form-group>
      </b-form-group>

      <b-form-group
        :label="$t('mail.emailConfirmation.title')"
        label-size="lg"
      >
        <b-form-group
          :label="$t('mail.emailConfirmation.subject')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input v-model="auth['auth.mail.email-confirmation.subject.en']" />
          </b-input-group>
        </b-form-group>

        <b-form-group
          :label="$t('mail.emailConfirmation.body')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-textarea
              v-model="auth['auth.mail.email-confirmation.body.en']"
              class="overflow-auto"
              max-rows="20"
            />
          </b-input-group>
        </b-form-group>
      </b-form-group>

      <b-form-group
        :label="$t('mail.passwordReset.title')"
        label-size="lg"
        class="mb-0"
      >
        <b-form-group
          :label="$t('mail.passwordReset.subject')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input v-model="auth['auth.mail.password-reset.subject.en']" />
          </b-input-group>
        </b-form-group>

        <b-form-group
          :label="$t('mail.passwordReset.body')"
          label-cols="2"
          class="mb-0"
        >
          <b-input-group>
            <b-form-textarea
              v-model="auth['auth.mail.password-reset.body.en']"
              class="overflow-auto"
              max-rows="20"
            />
          </b-input-group>
        </b-form-group>
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
        :disabled="!canManage"
        :processing="processing"
        :success="success"
        @submit="$emit('submit', auth)"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CSystemEditorAuth',

  i18nOptions: {
    namespaces: [ 'system.settings' ],
    keyPrefix: 'editor.auth',
  },

  components: {
    CSubmitButton,
  },

  props: {
    auth: {
      type: Object,
      required: true,
    },

    processing: {
      type: Boolean,
      value: false,
    },

    success: {
      type: Boolean,
      value: false,
    },

    canManage: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
