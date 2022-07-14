<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit', sensitivityLevel)"
    >
      <b-form-group
        :label="$t('handle.label')"
      >
        <b-form-input
          v-model="sensitivityLevel.handle"
          :placeholder="$t('handle.placeholder')"
          :state="handleState"
        />
        <b-form-invalid-feedback :state="handleState">
          {{ $t('handle.invalid-characters') }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        :label="$t('name')"
      >
        <b-form-input
          v-model="sensitivityLevel.meta.name"
        />
      </b-form-group>

      <b-form-group
        :label="$t('description')"
      >
        <b-form-textarea
          v-model="sensitivityLevel.meta.description"
        />
      </b-form-group>

      <b-form-group
        :label="$t('level')"
      >
        <b-form-input
          v-model="sensitivityLevel.level"
          number
          type="number"
          min="1"
        />
      </b-form-group>

      <b-form-group
        v-if="sensitivityLevel.updatedAt"
        :label="$t('updatedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="sensitivityLevel.updatedAt | locFullDateTime"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="sensitivityLevel.deletedAt"
        :label="$t('deletedAt')"
        label-cols="2"
      >
        <b-form-input
          :value="sensitivityLevel.deletedAt | locFullDateTime"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        v-if="sensitivityLevel.createdAt"
        :label="$t('createdAt')"
        label-cols="2"
        class="mb-0"
      >
        <b-form-input
          :value="sensitivityLevel.createdAt | locFullDateTime"
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
        :disabled="saveDisabled"
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
        :disabled="saveDisabled"
        @submit="$emit('submit', sensitivityLevel)"
      />

      <confirmation-toggle
        v-if="sensitivityLevel && sensitivityLevel.sensitivityLevelID"
        @confirmed="$emit('delete')"
      >
        {{ getDeleteStatus }}
      </confirmation-toggle>
    </template>
  </b-card>
</template>

<script>
import { NoID } from '@cortezaproject/corteza-js'
import { handleState } from 'corteza-webapp-admin/src/lib/handle'
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CSensitivityLevelEditorInfo',

  i18nOptions: {
    namespaces: 'system.sensitivityLevel',
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
  },

  props: {
    sensitivityLevel: {
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
    fresh () {
      return !this.sensitivityLevel.sensitivityLevelID || this.sensitivityLevel.sensitivityLevelID === NoID
    },

    editable () {
      return this.fresh ? this.canCreate : true
    },

    handleState () {
      const { handle } = this.sensitivityLevel

      return handle ? handleState(handle) : false
    },

    saveDisabled () {
      return !this.editable || [this.handleState].includes(false)
    },

    getDeleteStatus () {
      return this.sensitivityLevel.deletedAt ? this.$t('undelete') : this.$t('delete')
    },
  },
}
</script>
