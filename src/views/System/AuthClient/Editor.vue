<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="title"
    >
      <span
        class="text-nowrap"
      >
        <b-button
          v-if="authClientID && canCreate"
          variant="primary"
          class="mr-2"
          :to="{ name: 'system.authClient.new' }"
        >
          {{ $t('new') }}
        </b-button>
        <c-permissions-button
          v-if="authClientID && canGrant"
          :title="rbacEditorTitle"
          :target="rbacEditorTitle"
          :resource="'corteza::system:auth-client/'+authClientID"
          button-variant="light"
        >
          <font-awesome-icon :icon="['fas', 'lock']" />
          {{ $t('permissions') }}
        </c-permissions-button>
      </span>
    </c-content-header>

    <c-authclient-editor-info
      v-if="authclient"
      :key="authClientID"
      :resource="authclient"
      :roles="roles"
      :processing="info.processing"
      :success="info.success"
      :can-delete="authclient && authclient.authClientID && !authclient.isDefault && authclient.canDeleteAuthClient"
      :secret="secret"
      @regenerate-secret="onRegenerateSecret"
      @request-secret="onRequestSecret"
      @submit="onSubmit($event)"
      @delete="onDelete($event)"
      @undelete="onUndelete($event)"
    />
  </b-container>
</template>
<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CAuthclientEditorInfo from 'corteza-webapp-admin/src/components/Authclient/CAuthclientEditorInfo'
import { mapGetters } from 'vuex'

// @todo move this to corteza-js and follow the pattern we use with other resource types
const makeNewAuthClient = () => JSON.parse(JSON.stringify({
  scope: 'profile api',
  enabled: true,
  validGrant: 'authorization_code',
}))

export default {
  components: {
    CAuthclientEditorInfo,
  },

  i18nOptions: {
    namespaces: 'system.authclients',
    keyPrefix: 'editor',
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    authClientID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      authclient: undefined,
      secret: '',
      roles: [],

      info: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    canCreate () {
      return this.can('system/', 'auth-client.create')
    },

    canGrant () {
      return this.can('system/', 'grant')
    },

    title () {
      return this.authClientID ? this.$t('title.edit') : this.$t('title.create')
    },

    rbacEditorTitle () {
      if (this.authclient) {
        const { meta: { name } = {}, handle } = this.authclient || {}
        return name || handle
      }

      return ''
    },
  },

  watch: {
    authClientID: {
      immediate: true,
      handler () {
        if (this.authClientID) {
          this.fetchRoles().then(() => {
            this.fetchAuthclient()
          })
        } else {
          this.authclient = makeNewAuthClient()
        }
      },
    },
  },

  methods: {
    fetchAuthclient () {
      this.incLoader()

      this.$SystemAPI.authClientRead({ clientID: this.authClientID })
        .then(ac => {
          this.authclient = ac
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    fetchRoles () {
      this.incLoader()

      return this.$SystemAPI.roleList()
        .then(({ set: roles = [] }) => {
          this.roles = roles
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onSubmit (authclient) {
      this.info.processing = true

      if (this.authClientID) {
        // workaround in API client inconsistency:
        const clientID = this.authClientID

        this.$SystemAPI.authClientUpdate({ clientID, ...authclient })
          .then(ac => {
            this.animateSuccess('info')
            this.authclient = ac
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$SystemAPI.authClientCreate({ ...authclient })
          .then((ac) => {
            this.animateSuccess('info')
            this.authclient = ac
            const { authClientID } = ac
            this.$router.push({ name: 'system.authClient.edit', params: { authClientID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },

    onDelete (clientID) {
      this.incLoader()
      this.$SystemAPI.authClientDelete({ clientID })
        .then(() => this.fetchAuthclient())
        .catch(this.stdReject)
        .finally(() => this.decLoader())
    },

    onUndelete (clientID) {
      this.incLoader()
      this.$SystemAPI.authClientUndelete({ clientID })
        .then(() => this.fetchAuthclient())
        .catch(this.stdReject)
        .finally(() => this.decLoader())
    },

    onRequestSecret (clientID = this.authClientID) {
      this.$SystemAPI
        .authClientExposeSecret(({ clientID }))
        .then(secret => { this.secret = secret })
    },

    onRegenerateSecret (clientID = this.authClientID) {
      this.$SystemAPI
        .authClientRegenerateSecret(({ clientID }))
        .then(newSecret => { this.secret = newSecret })
    },
  },
}
</script>
