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
        >
          <div
            class="d-flex justify-content-between"
          >
            <h4
              class="card-title"
            >
              {{ $t('mainLogo.title') }}
            </h4>
            <b-button
              v-if="uploadedFile('main-logo')"
              variant="link"
              class="d-flex align-items-top text-dark p-1"
              @click="resetAttachment('ui.main-logo')"
            >
              <font-awesome-icon
                :icon="['far', 'trash-alt']"
              />
            </b-button>
          </div>

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
        >
          <div
            class="d-flex justify-content-between"
          >
            <h4
              class="card-title"
            >
              {{ $t('iconLogo.title') }}
            </h4>
            <b-button
              v-if="uploadedFile('icon-logo')"
              variant="link"
              class="d-flex align-items-top text-dark p-1"
              @click="resetAttachment('ui.icon-logo')"
            >
              <font-awesome-icon
                :icon="['far', 'trash-alt']"
              />
            </b-button>
          </div>

          <c-uploader-with-preview
            :value="uploadedFile('icon-logo')"
            :endpoint="'/settings/ui.icon-logo'"
            :disabled="!canManage"
            :labels="$t('iconLogo.uploader', { returnObjects: true })"
            @upload="onUpload($event)"
            @clear="resetAttachment('ui.icon-logo')"
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

    resetAttachment (name) {
      this.$SystemAPI.settingsUpdate({ values: [{ name, value: undefined }], upload: {} })
        .then(() => {
          this.$set(this.settings, name.substring(prefix.length), undefined)
        })
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
