<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <b-button-group
        v-if="nodeID"
      >
        <b-button
          variant="link"
          @click="generate.modal = true"
        >
          {{ $t('generateUri') }}
        </b-button>
      </b-button-group>
    </c-content-header>

    <c-federation-editor-info
      :node="node"
      :processing="info.processing"
      :success="info.success"
      @submit="onInfoSubmit"
      @delete="onDelete"
    />

    <b-modal
      v-model="generate.modal"
      hide-header
      hide-footer
      centered
      size="lg"
      body-class="px-5"
    >
      <div
        class="text-center px-5"
      >
        <font-awesome-icon
          size="7x"
          :icon="['fas', 'share-alt']"
          class="text-light mb-2"
        />
        <h2>
          {{ $t('generate.description') }}
        </h2>
      </div>

      <b-input-group
        size="xl"
        class="mt-5"
      >
        <b-form-input
          v-model="generate.email"
          type="email"
          placeholder="email@example.com"
        />
        <b-input-group-append>
          <c-submit-button
            button-class="px-4"
            variant="outline-primary"
            icon-variant="text-primary"
            :processing="generate.processing"
            :success="generate.success"
            :disabled="!generate.url || !generate.email"
            @submit="sendEmail()"
          >
            {{ $t('generate.sendEmail') }}
          </c-submit-button>
        </b-input-group-append>
      </b-input-group>

      <div
        class="mt-3"
      >
        <p>
          {{ $t('generate.subject') }} <strong>{{ $t('generate.invitation') }}</strong>
        </p>

        <p
          class="mt-4"
        >
          {{ $t('generate.hello') }}
        </p>

        <p>
          {{ $t('generate.body', { userLabel }) }}
        </p>

        <p
          class="text-center"
        >
          <i>
            {{ generate.url || $t('generate.notGenerated') }}
          </i>
        </p>

        <p>
          {{ $t('generate.kindRegards') }}
        </p>
      </div>

      <hr
        class="my-3"
      >

      <b-button
        variant="link"
        size="sm"
        :to="{}"
        class="p-1"
        @click="copyUrl()"
      >
        <font-awesome-icon
          :icon="['far', 'copy']"
          class="text-secondary pointer"
        />
      </b-button>
      {{ generate.url || $t('generate.notGenerated') }}
    </b-modal>
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CFederationEditorInfo from 'corteza-webapp-admin/src/components/Federation/CFederationEditorInfo'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  i18nOptions: {
    namespaces: [ 'system.federation' ],
    keyPrefix: 'editor',
  },

  components: {
    CFederationEditorInfo,
    CSubmitButton,
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    nodeID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      node: {},

      // Processing and success flags for each form
      info: {
        processing: false,
        success: false,
      },

      generate: {
        modal: false,
        processing: false,
        success: false,
        email: '',
        url: '',
      },
    }
  },

  computed: {
    userLabel () {
      return this.$auth.user.name || this.$auth.user.handle
    },
  },

  watch: {
    nodeID: {
      immediate: true,
      handler () {
        if (this.nodeID) {
          this.fetchNode()
        } else {
          this.node = {}
        }
      },
    },
  },

  mounted () {
    if (this.nodeID && this.node.status !== 'paired') {
      this.$FederationAPI.nodeGenerateUri({ nodeID: this.nodeID })
        .then(url => {
          this.generate.url = url
        })
        .catch(this.stdReject)
    }
  },

  methods: {
    fetchNode () {
      this.incLoader()

      this.$SystemAPI.nodeRead({ nodeID: this.nodeID })
        .then(node => {
          this.node = node // new federation.Node(node)
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    /**
     * Handles node info submit event, calls node update or create API endpoint
     * and handles response & errors
     *
     * @param node {Object}
     */
    onInfoSubmit (node) {
      this.info.processing = true

      const payload = { ...node }

      if (payload.nodeID) {
        // On update, reset the node obj
        this.$SystemAPI.nodeUpdate(payload)
          .then(node => {
            this.animateSuccess('info')
            this.node = node
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        // On creation, redirect to edit page
        this.$SystemAPI.nodeCreate(payload)
          .then(({ nodeID }) => {
            this.animateSuccess('info')
            this.$router.push({ name: 'system.federation.edit', params: { nodeID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },

    /**
     * Handles node delete event, calls node delete API endpoint
     * and handles response & errors
     */
    onDelete () {
      this.incLoader()

      if (this.node.deletedAt) {
        this.$SystemAPI.nodeUndelete({ nodeID: this.nodeID })
          .then(() => {
            this.fetchNode()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.nodeDelete({ nodeID: this.nodeID })
          .then(() => {
            this.fetchNode()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },

    async sendEmail () {
      this.generate.processing = true

      const values = {
        to: [this.generate.email],
        content: {
          html: '', // TODO
        },
      }
      await this.$ComposeAPI.notificationEmailSend(values)
        .then(f => {
          this.animateSuccess('generate')
          this.generate.email = ''
        })
        .catch(this.stdReject)
        .finally(() => {
          this.generate.processing = false
        })
    },

    copyUrl () {
      navigator.clipboard.writeText(this.generate.url)
    },
  },
}
</script>
