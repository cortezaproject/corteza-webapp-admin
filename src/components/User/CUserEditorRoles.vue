<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit')"
    >
      <c-role-picker
        :current-roles.sync="roles"
      />
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
        @submit="$emit('submit')"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import CRolePicker from 'corteza-webapp-admin/src/components/CRolePicker'

export default {
  i18nOptions: {
    namespaces: [ 'system.users' ],
    keyPrefix: 'editor.roles',
  },

  components: {
    CSubmitButton,
    CRolePicker,
  },

  props: {
    currentRoles: {
      type: Array,
      required: true,
      default: () => [],
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
    roles: {
      get () {
        return this.currentRoles
      },

      set (roles) {
        this.$emit('update:current-roles', roles)
      },
    },
  },
}
</script>
