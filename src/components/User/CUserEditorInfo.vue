<template>
  <b-card
    class="shadow-sm"
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

        <!--
          include hidden input to enable
          trigger submit event w/ ENTER
        -->
        <input
          type="submit"
          class="d-none"
        >
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
          v-model="user.updatedAt"
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
          v-model="user.suspendedAt"
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
          v-model="user.deletedAt"
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
          v-model="user.createdAt"
          plaintext
          disabled
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
        class="ml-2"
        cta-class="secondary"
        @confirmed="$emit('status')"
      >
        {{ getSuspendStatus }}
      </confirmation-toggle>
    </template>
  </b-card>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

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
  },
}
</script>
