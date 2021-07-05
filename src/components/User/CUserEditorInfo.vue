<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit', user)"
    >
      <b-form-group
        :label="$t('email')"
        label-cols="2"
      >
        <b-form-input
          v-model="user.email"
          required
          type="email"
        />
      </b-form-group>

      <b-form-group
        :label="$t('name')"
        label-cols="2"
      >
        <b-form-input
          v-model="user.name"
          required
        />
      </b-form-group>

      <b-form-group
        :label="$t('handle')"
        label-cols="2"
        :class="{ 'mb-0': !user.userID }"
      >
        <b-form-input
          v-model="user.handle"
        />
      </b-form-group>

      <b-form-group
        v-if="user.updatedAt"
        :label="$t('updatedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="user.updatedAt | locLongDate"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="user.suspendedAt"
        :label="$t('suspendedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="user.suspendedAt | locLongDate"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="user.deletedAt"
        :label="$t('deletedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="user.deletedAt | locLongDate"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="user.createdAt"
        :label="$t('createdAt')"
        label-cols="2"
        class="mb-0"
      >
        <b-form-input
          :value="user.createdAt | locLongDate"
          plaintext
          disabled
        />
      </b-form-group>

      <!--
        include hidden input to enable
        trigger submit event w/ ENTER
      -->
      <input
        type="submit"
        class="d-none"
      >
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
        @submit="$emit('submit', user)"
      />

      <confirmation-toggle
        v-if="user && user.userID"
        @confirmed="$emit('delete')"
      >
        {{ getDeleteStatus }}
      </confirmation-toggle>

      <confirmation-toggle
        v-if="user && user.userID"
        class="ml-1"
        cta-class="light"
        @confirmed="$emit('status')"
      >
        {{ getSuspendStatus }}
      </confirmation-toggle>

      <confirmation-toggle
        v-if="user && user.userID"
        :disabled="user.userID === userID"
        class="ml-1"
        cta-class="secondary"
        @confirmed="$emit('sessionsRemove')"
      >
        {{ $t('revokeAllSession') }}
      </confirmation-toggle>

      <b-button
        v-if="isExisting && !user.emailConfirmed"
        variant="light"
        class="ml-1"
        @click="$emit('patch', '/emailConfirmed', true)"
      >
        {{ $t('confirmEmail') }}
      </b-button>

      <c-corredor-manual-buttons
        ui-page="user/editor"
        ui-slot="infoFooter"
        resource-type="system:user"
        default-variant="secondary"
        class="ml-2"
        @click="dispatchCortezaSystemUserEvent($event, { user })"
      />
    </template>
  </b-card>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import { NoID } from '@cortezaproject/corteza-js'

export default {
  name: 'CUserEditorInfo',

  i18nOptions: {
    namespaces: [ 'system.users' ],
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
  },

  props: {
    user: {
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
  },

  computed: {
    getDeleteStatus () {
      return this.user.deletedAt ? this.$t('undelete') : this.$t('delete')
    },

    getSuspendStatus () {
      return this.user.suspendedAt ? this.$t('unsuspend') : this.$t('suspend')
    },

    isExisting () {
      return this.user && this.user.userID && this.user.userID !== NoID
    },

    userID () {
      if (this.$auth.user) {
        return this.$auth.user.userID
      }
      return undefined
    },
  },
}
</script>
