<template>
  <div
    v-if="$auth.is() && hasAccess"
    class="d-flex flex-column vh-100 bg-light"
  >
    <small
      class="p-1 text-secondary position-absolute version"
    >
      {{ frontendVersion }}
    </small>

    <c-the-header />

    <div
      class="d-flex flex-row overflow-hidden"
    >
      <c-the-main-nav
        :access="access"
      />

      <main
        class="flex-fill overflow-auto pb-5"
      >
        <c-the-alert-container />
        <router-view />
        <c-permissions-modal />
      </main>
    </div>
  </div>
  <!--
    Show this when
  -->
  <c-the-alert-container
    v-else
  />
</template>
<script>
import CTheAlertContainer from 'corteza-webapp-admin/src/components/CTheAlertContainer'
import CTheHeader from 'corteza-webapp-admin/src/components/CTheHeader'
import CTheMainNav from 'corteza-webapp-admin/src/components/CTheMainNav'
import { components, mixins } from '@cortezaproject/corteza-vue'

export default {
  components: {
    CPermissionsModal: components.CPermissionsModal,
    CTheAlertContainer,
    CTheHeader,
    CTheMainNav,
  },

  mixins: [
    mixins.corredor,
  ],

  data () {
    return {
      error: null,
      access: [],
    }
  },

  computed: {
    frontendVersion () {
      /* eslint-disable no-undef */
      return VERSION
    },

    hasAccess () {
      return !!this.access.find(({ resource, operation, allow }) => resource === 'system' && operation === 'access' && allow)
    },
  },

  /**
   * This is the base admin layout
   *
   * Redirect to /auth if user is not authenticated
   */
  beforeCreate () {
    this.$store.dispatch('ui/incLoader')

    this.access = []

    this.$auth
      // First, check if we're authenticated
      .check()
      .then((user) => {
        if (!user) {
          // check performed: no error & no user,
          // redirect to auth
          throw new Error()
        }

        return this.loadPermissions()
      })
      .catch((e) => {
        this.$auth.open()
      })
      .finally(() => {
        this.$store.dispatch('ui/decLoader')
      })
  },

  methods: {
    async loadPermissions () {
      // Load effective System permissions
      return this.$SystemAPI.permissionsEffective()
        .then(rules => {
          this.access = rules

          if (!this.hasAccess) {
            // Open auth if we do not have admin (system) access
            throw new Error(this.$t('general.noAccess'))
          }

          // Load effective Compose permissions
          return this.$ComposeAPI.permissionsEffective()
        })
        .then(rules => {
          this.access = this.access.concat(rules)

          // Load effective Federation permissions, make sure not to trigger error since federation endpoints are optional
          return window.FederationAPI ? this.$FederationAPI.permissionsEffective() : []
        })
        .then(rules => {
          this.access = this.access.concat(rules)

          // Load effective Messaging permissions
          return this.$MessagingAPI.permissionsEffective()
        })
        .then(rules => {
          this.access = this.access.concat(rules)
        })
        .catch(({ message }) => {
          this.$store.dispatch('ui/appendAlert', message)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.version {
  bottom: 0;
  right: 0;
}
</style>
