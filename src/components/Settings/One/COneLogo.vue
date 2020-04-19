<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit', panels)"
    >
      <div
        v-if="logoUrl"
        class="logo-preview text-center m-2"
      >
        <img
          :src="logoUrl"
        >
      </div>

      <c-uploader
        :endpoint="'/settings/ui.one.logo'"
        @uploaded="handleUploaded"
      />
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>
  </b-card>
</template>

<script>
import CUploader from 'corteza-webapp-admin/src/components/CUploader'

export default {
  name: 'CMessagingEditorBasic',

  i18nOptions: {
    namespaces: [ 'ui.one.settings' ],
    keyPrefix: 'editor.logo',
  },

  components: {
    CUploader,
  },

  props: {
    value: {
      type: String,
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

  data () {
    return {
      panels: [],
    }
  },

  computed: {
    logoUrl () {
      const localAttachment = /^attachment:(\d+)/

      switch (true) {
        case localAttachment.test(this.value):
          const [, attachmentID] = localAttachment.exec(this.value)

          return this.$SystemAPI.baseURL +
            this.$SystemAPI.attachmentOriginalEndpoint({
              attachmentID,
              kind: 'settings',
              name: 'logo',
            })
      }

      return undefined
    },
  },

  methods: {
    handleUploaded ({ value }) {
      this.$emit('input', value)
    },
  },
}
</script>
<style lang="scss">
.card-header {
  cursor: move;
}
.logo-preview {
  img {
    max-height: 20px;

  }
}
</style>
