<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>

    <b-form
      @submit.prevent="$emit('submit', settings)"
    >
      <h5>{{ $t('sidebar.title') }}</h5>
      <b-form-group
        class="mb-0"
      >
        <b-form-checkbox
          v-model="sidebarSettings.hideNamespaceList"
        >
          {{ $t('sidebar.hide-namespace-list') }}
        </b-form-checkbox>
        <b-form-checkbox
          v-model="sidebarSettings.hideNamespaceListLink"
        >
          {{ $t('sidebar.hide-namespace-list-link') }}
        </b-form-checkbox>
      </b-form-group>
    </b-form>

    <template #footer>
      <c-submit-button
        class="float-right"
        :disabled="!canManage"
        :processing="processing"
        :success="success"
        @submit="onSubmit"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CComposeEditorUI',

  i18nOptions: {
    namespaces: 'compose.settings',
    keyPrefix: 'editor.ui',
  },

  components: {
    CSubmitButton,
  },

  props: {
    settings: {
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

  data () {
    return {
      sidebarSettings: {},
    }
  },

  watch: {
    settings: {
      immediate: true,
      handler (settings) {
        this.sidebarSettings = settings['compose.ui.sidebar'] || {}
      },
    },
  },

  methods: {
    onSubmit () {
      this.$emit('submit', {
        'compose.ui.sidebar': this.sidebarSettings,
      })
    },
  },
}
</script>
