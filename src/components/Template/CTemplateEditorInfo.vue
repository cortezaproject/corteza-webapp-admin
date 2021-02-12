<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit="$emit('submit', template)"
    >
      <b-form-group
        :label="$t('meta.short')"
        label-cols="2"
      >
        <b-form-input
          v-model="template.meta.short"
        />
      </b-form-group>

      <b-form-group
        :label="$t('handle')"
        label-cols="2"
        :class="{ 'mb-0': !template.templateID }"
      >
        <b-form-input
          v-model="template.handle"
          :state="checkHandle"
        />
      </b-form-group>

      <b-form-group
        :label="$t('meta.description')"
        label-cols="2"
      >
        <b-form-textarea
          v-model="template.meta.description"
        />
      </b-form-group>

      <b-form-group
        :label="$t('type')"
        label-cols="2"
      >
        <b-form-select
          v-model="template.type"
          :options="contentTypes"
        />
      </b-form-group>

      <b-form-group
        :label="$t('partial')"
        :description="$t('partialDescription')"
        label-cols="2"
      >
        <b-form-checkbox
          v-model="template.partial"
          name="checkbox-1"
        >
          {{ $t('partial') }}
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
        v-if="template.createdAt"
        :label="$t('createdAt')"
        label-cols="2"
      >
        {{ template.createdAt }}
      </b-form-group>

      <b-form-group
        v-if="template.updatedAt"
        :label="$t('updatedAt')"
        label-cols="2"
      >
        {{ template.updatedAt }}
      </b-form-group>

      <b-form-group
        v-if="template.deletedAt"
        :label="$t('deletedAt')"
        label-cols="2"
      >
        {{ template.deletedAt }}
      </b-form-group>

      <b-form-group
        v-if="template.lastUsedAt"
        :label="$t('lastUsedAt')"
        label-cols="2"
      >
        {{ template.lastUsedAt }}
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
        @submit="$emit('submit', template)"
      />

      <confirmation-toggle
        v-if="template && template.templateID"
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
  name: 'CTemplateEditorInfo',

  i18nOptions: {
    namespaces: [ 'system.templates' ],
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
  },

  props: {
    template: {
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

  data () {
    return {
      contentTypes: [
        { value: 'text/html', text: this.$t('contentType.text_html') },
        { value: 'text/plain', text: this.$t('contentType.text_plain') },
      ],
    }
  },

  computed: {
    disabled () {
      return !this.checkHandle
    },

    // 2+ alpha-numeric + _
    checkHandle () {
      return this.template.handle ? /^\w{2,}$/.test(this.template.handle) : null
    },

    getDeleteStatus () {
      return this.template.deletedAt ? this.$t('undelete') : this.$t('delete')
    },

    getArchiveStatus () {
      return this.template.archivedAt ? this.$t('unarchive') : this.$t('archive')
    },
  },
}
</script>
