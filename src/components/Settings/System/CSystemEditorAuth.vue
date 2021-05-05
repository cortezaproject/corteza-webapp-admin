<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit', settings)"
    >
      <b-form-group
        :label="$t('internal.title')"
        label-size="lg"
      >
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['auth.internal.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('internal.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['auth.internal.password-reset.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('internal.password-reset.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['auth.internal.signup.email-confirmation-required']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('internal.signup.email-confirmation-required') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['auth.internal.signup.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('internal.signup.enabled') }}
          </b-form-checkbox>
        </b-form-group>
      </b-form-group>

      <hr>

      <b-form-group
        :label="$t('mfa.title')"
        label-size="lg"
      >
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['auth.multi-factor.email-otp.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('mfa.emailOTP.enforced') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['auth.multi-factor.email-otp.enforced']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('mfa.emailOTP.enforced') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          :label="$t('mfa.emailOTP.expires.label')"
          :description="$t('mfa.emailOTP.expires.description')"
          label-cols="2"
        >
          <b-input-group append="seconds">
            <b-form-input
              v-model="settings['auth.multi-factor.email-otp.expires']"
              type="number"
              placeholder="60"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['auth.multi-factor.totp.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('mfa.TOTP.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="settings['auth.multi-factor.totp.enforced']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('mfa.TOTP.enforced') }}
          </b-form-checkbox>
        </b-form-group>
      </b-form-group>
      <b-form-group
        :label="$t('mfa.TOTP.issuer.label')"
        :description="$t('mfa.TOTP.issuer.description')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-input
            v-model="settings['auth.multi-factor.totp.issuer']"
            placeholder="Corteza"
          />
        </b-input-group>
      </b-form-group>

      <hr>

      <b-form-group
        :label="$t('mail.title')"
        label-size="lg"
      >
        <b-form-group
          :label="$t('mail.from-address')"
          label-cols="2"
          description="Please enter valid email address."
        >
          <b-input-group>
            <b-form-input
              v-model="settings['auth.mail.from-address']"
              type="email"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group
          :label="$t('mail.from-name')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input v-model="settings['auth.mail.from-name']" />
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
        @submit="$emit('submit', settings)"
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
    settings: {
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
