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
        <permissions-modal />
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
import { components } from 'corteza-vue'

export default {
  components: {
    PermissionsModal: components.PermissionsModal,
    CTheAlertContainer,
    CTheHeader,
    CTheMainNav,
  },

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
      .then(async () => {
        await this.loadPermissions()
      })
      .catch((e) => {
        this.$auth.open()
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

          // Load effective Messaging permissions
          return this.$MessagingAPI.permissionsEffective()
        })
        .then(rules => {
          this.access = this.access.concat(rules)
        })
        .catch(({ message }) => {
          this.$store.dispatch('ui/appendAlert', message)
        })
        .finally(() => {
          this.$store.dispatch('ui/decLoader')
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
