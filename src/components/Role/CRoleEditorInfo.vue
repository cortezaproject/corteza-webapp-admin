<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit="$emit('submit', role)"
    >
      <b-form-group
        :label="$t('name')"
        label-cols="2"
      >
        <b-form-input
          v-model="role.name"
          :state="checkName"
        />
      </b-form-group>

      <b-form-group
        :label="$t('handle')"
        label-cols="2"
        :class="{ 'mb-0': !role.roleID }"
      >
        <b-form-input
          v-model="role.handle"
          :state="checkHandle"
        />
      </b-form-group>

      <b-form-group
        v-if="role.updatedAt"
        :label="$t('updatedAt')"
        label-cols="2"
      >
        <b-form-input
          v-model="role.updatedAt"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="role.archivedAt"
        :label="$t('archivedAt')"
        label-cols="2"
      >
        <b-form-input
          v-model="role.archivedAt"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="role.deletedAt"
        :label="$t('deletedAt')"
        label-cols="2"
      >
        <b-form-input
          v-model="role.deletedAt"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="role.createdAt"
        :label="$t('createdAt')"
        label-cols="2"
        class="mb-0"
      >
        <b-form-input
          v-model="role.createdAt"
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
        :disabled="disabled || !canCreate"
        @submit="$emit('submit', role)"
      />

      <confirmation-toggle
        v-if="role && role.roleID"
        @confirmed="$emit('delete')"
      >
        {{ getDeleteStatus }}
      </confirmation-toggle>

      <confirmation-toggle
        v-if="role && role.roleID"
        class="ml-2"
        cta-class="secondary"
        @confirmed="$emit('status')"
      >
        {{ getArchiveStatus }}
      </confirmation-toggle>
    </template>
  </b-card>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CRoleEditorInfo',

  i18nOptions: {
    namespaces: [ 'system.roles' ],
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
  },

  props: {
    role: {
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

    canCreate: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    disabled () {
      return !(this.checkHandle === null && this.checkName === null)
    },

    // At least 1 character
    checkName () {
      return /^.+$/.test(this.role.name || '') ? null : false
    },

    // 2+ alpha-numeric + _
    checkHandle () {
      return /^\w{2,}$/.test(this.role.handle || '') ? null : false
    },

    getDeleteStatus () {
      return this.role.deletedAt ? this.$t('undelete') : this.$t('delete')
    },

    getArchiveStatus () {
      return this.role.archivedAt ? this.$t('unarchive') : this.$t('archive')
    },
  },
}
</script>
