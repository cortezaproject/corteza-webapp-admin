<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit', route)"
    >
      <b-form-group
        v-if="route.routeID"
        :label="$t('id')"
        label-cols="2"
      >
        <b-form-input
          v-model="route.routeID"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('endpoint')"
        label-cols="2"
      >
        <b-form-input
          v-model="route.endpoint"
          required
        />
        <input
          type="submit"
          class="d-none"
        >
      </b-form-group>

      <b-form-group
        :label="$t('method')"
        label-cols="2"
      >
        <b-form-input
          v-model="route.method"
        />
        <input
          type="submit"
          class="d-none"
        >
      </b-form-group>

      <b-form-group
        label-cols="2"
        :class="{ 'mb-0': !route.routeID }"
      >
        <b-form-checkbox
          v-model="route.enabled"
        >
          {{ $t('enabled') }}
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
        v-if="route.updatedAt"
        :label="$t('updatedAt')"
        label-cols="2"
      >
        <b-form-input
          v-model="route.updatedAt"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="route.deletedAt"
        :label="$t('deletedAt')"
        label-cols="2"
      >
        <b-form-input
          v-model="route.deletedAt"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="route.createdAt"
        :label="$t('createdAt')"
        label-cols="2"
        class="mb-0"
      >
        <b-form-input
          v-model="route.createdAt"
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
        :disabled="!canCreate"
        @submit="$emit('submit', route)"
      />

      <confirmation-toggle
        v-if="route && route.routeID"
        @confirmed="$emit('delete')"
      >
        {{ getDeleteStatus }}
      </confirmation-toggle>
    </template>
  </b-card>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CRouteEditorInfo',

  i18nOptions: {
    namespaces: [ 'system.routes' ],
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
  },

  props: {
    route: {
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
    getDeleteStatus () {
      return this.route.deletedAt ? this.$t('undelete') : this.$t('delete')
    },
  },
}
</script>
