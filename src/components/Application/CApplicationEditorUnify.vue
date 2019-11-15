<template>
  <b-card
    class="shadow-sm m-2 p-0"
  >
    <b-form
      @submit.prevent="$emit('submit', unify)"
    >
      <b-form-group
        :label="$t('icon.label')"
        :description="$t('icon.description')"
        label-cols="2"
      >
        <b-form-input v-model="unify.icon" />
      </b-form-group>

      <b-form-group
        :label="$t('logo.label')"
        :description="$t('logo.description')"
        label-cols="2"
      >
        <b-form-input v-model="unify.logo" />
      </b-form-group>

      <b-form-group
        :label="$t('url.label')"
        :description="$t('url.description')"
        label-cols="2"
      >
        <b-form-input v-model="unify.url" />
      </b-form-group>

      <b-form-group
        label-cols="2"
      >
        <b-form-checkbox
          v-model="unify.listed"
        >
          {{ $t('listed') }}
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
        :label="$t('config.label')"
        :description="$t('config.description')"
        class="mb-0"
      >
        <b-form-textarea
          v-model="unify.config"
          :state="configState"
          rows="10"
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
        :disabled="disabled"
        @submit="$emit('submit', unify)"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CApplicationEditorUnify',

  i18nOptions: {
    namespaces: [ 'system.applications' ],
    keyPrefix: 'editor.unify',
  },

  components: {
    CSubmitButton,
  },

  props: {
    unify: {
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
    disabled () {
      return !this.validConfig
    },

    validConfig () {
      if (!this.unify) {
        return true
      }

      try {
        if ((this.unify.config || '').trim() !== '') {
          JSON.parse(this.unify.config)
        }
        return true
      } catch (e) {
        return false
      }
    },

    configState () {
      if (((this.unify || {}).config || '').trim() === '') {
        return null
      } else {
        return this.validConfig
      }
    },
  },
}
</script>
