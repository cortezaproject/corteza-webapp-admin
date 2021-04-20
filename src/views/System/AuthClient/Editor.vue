<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
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
          :title="(authclient.meta || {}).name || authclient.handle"
          :target="(authclient.meta || {}).name || authclient.handle"
          :resource="'system:auth-client:'+authClientID"
          button-variant="light"
        >
          <font-awesome-icon :icon="['fas', 'lock']" />
          {{ $t('permissions') }}
        </c-permissions-button>
      </span>
    </c-content-header>

    <c-authclient-editor-info
      v-if="authclient"
      :authclient="authclient"
      :roles="roles"
      :processing="info.processing"
      :success="info.success"
      :can-create="canCreate"
      @submit="onInfoSubmit"
      @delete="onDelete"
    />
  </b-container>
</template>
<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CAuthclientEditorInfo from 'corteza-webapp-admin/src/components/Authclient/CAuthclientEditorInfo'

export default {
  components: {
    CAuthclientEditorInfo,
  },

  i18nOptions: {
    namespaces: [ 'system.authclients' ],
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
      authclient: {},
      roles: [],

      canCreate: false,
      canGrant: false,

      info: {
        processing: false,
        success: false,
      },
    }
  },

  watch: {
    authClientID: {
      immediate: true,
      handler () {
        this.fetchEffective()
        if (this.authClientID) {
          this.fetchRoles().then(() => {
            this.fetchAuthclient()
          })
        } else {
          this.authclient = {}
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

    fetchEffective () {
      this.incLoader()

      this.$SystemAPI.permissionsEffective()
        .then(rules => {
          this.canCreate = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'auth-client.create').allow
          this.canGrant = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'grant').allow
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

    onInfoSubmit (authclient) {
      this.info.processing = true

      if (this.authClientID) {
        this.$SystemAPI.authClientUpdate({ clientID: this.authClientID, validGrant: this.authclient.grant, ...authclient })
          .then(ac => {
            this.animateSuccess('info')
            this.authclient = ac
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$SystemAPI.authClientCreate({ validGrant: this.authclient.grant, ...authclient })
          .then(({ authClientID }) => {
            this.animateSuccess('info')
            this.$router.push({ name: 'system.authClient.edit', params: { authClientID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },

    onDelete () {
      this.incLoader()

      if (this.authclient.deletedAt) {
        this.$SystemAPI.authClientUndelete({ clientID: this.authClientID })
          .then(() => {
            this.fetchAuthclient()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.authClientDelete({ clientID: this.authClientID })
          .then(() => {
            this.fetchAuthclient()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },
  },
}
</script>
