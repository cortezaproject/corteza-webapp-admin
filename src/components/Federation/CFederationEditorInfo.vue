<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit', federation)"
    >
      <b-form-group
        :label="$t('name')"
        label-cols="2"
      >
        <b-form-input
          v-model="federation.name"
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
        :label="$t('url')"
        label-cols="2"
      >
        <b-form-input
          v-model="federation.url"
          required
          type="url"
        />
      </b-form-group>

      <b-form-group
        :label="$t('email')"
        label-cols="2"
      >
        <b-form-input
          v-model="federation.email"
          required
          type="email"
        />
      </b-form-group>

      <b-form-group
        :label="$t('tags.label')"
        label-cols="2"
      >
        <b-form-tags
          v-model="federation.tags"
          tag-variant="warning"
          tag-class="rounded"
          input-class="h4"
          :placeholder="$t('tags.placeholder')"
          size="lg"
          class="py-1 px-2"
        />
      </b-form-group>

      <b-form-group
        v-if="federation.status"
        :label="$t('status')"
        label-cols="2"
      >
        <b-form-input
          v-model="federation.status"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        label-cols="2"
        :class="{ 'mb-0': !federation.federationID }"
      >
        <b-form-checkbox
          v-model="federation.enabled"
        >
          {{ $t('enabled') }}
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
        v-if="federation.updatedAt"
        :label="$t('updatedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="federation.updatedAt | locLongDate"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="federation.deletedAt"
        :label="$t('deletedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="federation.deletedAt | locLongDate"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="federation.createdAt"
        :label="$t('createdAt')"
        label-cols="2"
        class="mb-0"
      >
        <b-form-input
          :value="federation.createdAt | locLongDate"
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
        @submit="$emit('submit', federation)"
      />

      <confirmation-toggle
        v-if="federation && federation.federationID"
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
  name: 'CFederationEditorInfo',

  i18nOptions: {
    namespaces: [ 'system.federation' ],
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
  },

  props: {
    federation: {
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
      return this.federation.deletedAt ? this.$t('undelete') : this.$t('delete')
    },
  },
}
</script>
