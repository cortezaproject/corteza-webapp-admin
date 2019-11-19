<template>
  <b-card
    class="shadow-sm m-2 p-0"
  >
    <b-form
      @submit.prevent="$emit('submit', basic)"
    >
      <b-form-group
        :label="$t('ui.title')"
        label-size="lg"
        class="mb-0"
      >
        <b-form-group label-cols="2">
          <b-form-checkbox
            v-model="basic['ui.emoji.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('ui.emoji.enabled') }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group
          label-cols="2"
          :class="{ 'mb-0': !basic['ui.browser-notifications.enabled'] }"
        >
          <b-form-checkbox
            v-model="basic['ui.browser-notifications.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('ui.browser-notifications.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          v-if="basic['ui.browser-notifications.enabled']"
          :label="$t('ui.browser-notifications.header.title')"
          :description="$t('ui.browser-notifications.header.description')"
          label-cols="2"
        >
          <b-input-group class="m-0">
            <b-form-input v-model="basic['ui.browser-notifications.header']" />
          </b-input-group>
        </b-form-group>
        <b-form-group
          v-if="basic['ui.browser-notifications.enabled']"
          :label="$t('ui.browser-notifications.message-trim')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input
              v-model="basic['ui.browser-notifications.message-trim']"
              type="number"
            />
          </b-input-group>
        </b-form-group>
      </b-form-group>

      <hr>

      <b-form-group
        :label="$t('message.attachment.title')"
        label-size="lg"
        class="mb-0"
      >
        <b-form-group
          label-cols="2"
          :class="{ 'mb-0': !basic['message.attachment.enabled'] }"
        >
          <b-form-checkbox
            v-model="basic['message.attachment.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('message.attachment.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          v-if="basic['message.attachment.enabled']"
          label-cols="2"
        >
          <b-form-checkbox
            v-model="basic['message.attachment.source.gallery.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('message.attachment.source.gallery.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          v-if="basic['message.attachment.enabled']"
          label-cols="2"
        >
          <b-form-checkbox
            v-model="basic['message.attachment.source.camera.enabled']"
            :value="true"
            :unchecked-value="false"
          >
            {{ $t('message.attachment.source.camera.enabled') }}
          </b-form-checkbox>
        </b-form-group>
        <b-form-group
          v-if="basic['message.attachment.enabled']"
          :label="$t('message.attachment.max-size')"
          label-cols="2"
        >
          <b-input-group>
            <b-form-input
              v-model="basic['message.attachment.max-size']"
              type="number"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group
          v-if="basic['message.attachment.enabled']"
          :label="$t('message.attachment.type.whitelist')"
          :description="$t('message.attachment.type.description')"
          label-cols="2"
        >
          <b-input-group class="m-0">
            <b-form-input v-model="attachmentWhitelist" />
          </b-input-group>
        </b-form-group>
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
        @submit="$emit('submit', basic)"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CMessagingEditorBasic',

  i18nOptions: {
    namespaces: [ 'messaging.settings' ],
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
  },

  computed: {
    attachmentWhitelist: {
      get () {
        return (this.basic['message.attachments.mimetypes'] || []).join(',')
      },

      set (value) {
        this.basic['message.attachments.mimetypes'] = this.convertToExternal(value)
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
