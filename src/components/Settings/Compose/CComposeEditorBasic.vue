<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit', basic)"
    >
      <h4>{{ $t('ui.title') }}</h4>
      <b-form-checkbox
        v-model="basic['compose.ui.namespace-switcher.enabled']"
        :value="true"
        :unchecked-value="false"
      >
        {{ $t('ui.namespace-switcher.enabled') }}
      </b-form-checkbox>
      <b-form-checkbox
        v-model="basic['compose.ui.namespace-switcher.defaultOpen']"
        :value="true"
        :unchecked-value="false"
      >
        {{ $t('ui.namespace-switcher.defaultOpen') }}
      </b-form-checkbox>
      <hr>
      <h4>{{ $t('attachments.page') }}</h4>
      <b-form-group
        :label="$t('attachments.max-size')"
        label-cols="2"
      >
        <b-form-input
          v-model="basic['compose.page.attachments.max-size']"
          type="number"
        />
      </b-form-group>
      <b-form-group
        :label="$t('attachments.type.whitelist')"
        :description="$t('attachments.type.description')"
        label-cols="2"
        class="mb-0"
      >
        <b-input-group>
          <b-form-input v-model="pageAttachmentWhitelist" />
        </b-input-group>
      </b-form-group>
      <hr>
      <h4>{{ $t('attachments.record') }}</h4>
      <b-form-group
        :label="$t('attachments.max-size')"
        label-cols="2"
      >
        <b-input-group>
          <b-form-input
            v-model="basic['compose.record.attachments.max-size']"
            type="number"
          />
        </b-input-group>
      </b-form-group>
      <b-form-group
        :label="$t('attachments.type.whitelist')"
        :description="$t('attachments.type.description')"
        label-cols="2"
        class="mb-0"
      >
        <b-input-group class="m-0">
          <b-form-input v-model="recordAttachmentWhitelist" />
        </b-input-group>
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
        @submit="$emit('submit', basic)"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CComposeEditorBasic',

  i18nOptions: {
    namespaces: [ 'compose.settings' ],
    keyPrefix: 'editor.basic',
  },

  components: {
    CSubmitButton,
  },

  props: {
    basic: {
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

  computed: {
    pageAttachmentWhitelist: {
      get () {
        return (this.basic['compose.page.attachments.mimetypes'] || []).join(',')
      },

      set (value) {
        this.basic['compose.page.attachments.mimetypes'] = this.convertToExternal(value)
      },
    },

    recordAttachmentWhitelist: {
      get () {
        return (this.basic['compose.record.attachments.mimetypes'] || []).join(',')
      },

      set (value) {
        this.basic['compose.record.attachments.mimetypes'] = this.convertToExternal(value)
      },
    },
  },

  methods: {
    convertToExternal (value) {
      return (value || '').split(',').map(v => {
        return v.replace(/ /g, '')
      }).filter(v => {
        if (v.match(/^[-\w.]+\/[-\w/+.]+$/g)) {
          return v
        }
      })
    },
  },
}
</script>
