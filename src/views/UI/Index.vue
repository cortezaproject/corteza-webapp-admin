<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <b-row cols="12">
      <b-col
        cols="6"
      >
        <b-card
          class="shadow-sm"
          :title="$t('mainLogo.title')"
        >
          <c-uploader-with-preview
            :value="uploadedFile('main-logo')"
            :endpoint="'/settings/ui.main-logo'"
            :disabled="!canManage"
            :labels="$t('mainLogo.uploader', { returnObjects: true })"
            @upload="onUpload($event)"
          />
        </b-card>
      </b-col>
      <b-col
        cols="6"
      >
        <b-card
          class="shadow-sm"
          :title="$t('headerLogo.title')"
        >
          <c-uploader-with-preview
            :value="uploadedFile('header-logo')"
            :endpoint="'/settings/ui.header-logo'"
            :disabled="!canManage"
            :labels="$t('headerLogo.uploader', { returnObjects: true })"
            @upload="onUpload($event)"
          />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CUploaderWithPreview from 'corteza-webapp-admin/src/components//CUploaderWithPreview'
import { mapGetters } from 'vuex'

const prefix = 'ui.'

export default {
  i18nOptions: {
    namespaces: [ 'ui.settings' ],
    keyPrefix: 'editor',
  },

  components: {
    CUploaderWithPreview,
  },

  mixins: [
    editorHelpers,
  ],

  data () {
    return {
      settings: {},
    }
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    canManage () {
      return this.can('system/', 'settings.manage')
    },

  },

  created () {
    this.fetchSettings()
  },

  methods: {
    fetchSettings () {
      this.incLoader()
      this.$SystemAPI.settingsList({ prefix: prefix })
        .then(settings => {
          settings.forEach(({ name, value }) => {
            this.$set(this.settings, name.substring(prefix.length), value)
          })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onUpload ({ name, value }) {
      this.$set(this.settings, name.substring(prefix.length), value)
    },

    uploadedFile (name) {
      const localAttachment = /^attachment:(\d+)/

      switch (true) {
        case this.settings[name] && localAttachment.test(this.settings[name]):
          const [, attachmentID] = localAttachment.exec(this.settings[name])

          return this.$SystemAPI.baseURL +
            this.$SystemAPI.attachmentOriginalEndpoint({
              attachmentID,
              kind: 'settings',
              name: prefix + name,
            })
      }

      return undefined
    },
  },
}
</script>
