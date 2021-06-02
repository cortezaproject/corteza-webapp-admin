<template>
  <div
    v-if="hasAccess"
    class="d-flex flex-column vh-100"
  >
    <header>
      <c-topbar
        :sidebar-pinned="pinned"
      >
        <template #title>
          {{ appName }}
        </template>
      </c-topbar>
    </header>
    <div
      class="d-flex flex-row overflow-hidden"
    >
      <c-the-main-nav
        :access="access"
      />

      <main
        class="flex-fill overflow-auto pb-5"
      >
        <router-view />
        <c-permissions-modal />
        <c-prompts />
      </main>
    </div>
  </div>
</template>
<script>
import CTheMainNav from 'corteza-webapp-admin/src/components/CTheMainNav'
import { components, mixins } from '@cortezaproject/corteza-vue'

const { CTopbar } = components

export default {
  components: {
    CPermissionsModal: components.CPermissionsModal,
    CPrompts: components.CPrompts,
    CTheMainNav,
    CTopbar,
  },

  mixins: [
    mixins.corredor,
  ],

  data () {
    return {
      error: null,
      access: [],
      pinned: false,
    }
  },

  computed: {

    hasAccess () {
      return this.access.filter(({ allow }) => allow).length > 0
    },

    appName () {
      /* eslint-disable no-undef */
      return WEBAPP
    },
  },

  /**
   * This is the base admin layout
   *
   * Redirect to /auth if user is not authenticated
   */
  created () {
    this.$store.dispatch('ui/incLoader')

    this.access = []

    this.loadPermissions()
      .catch(this.stdReject)
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
          return this.$FederationAPI.permissionsEffective()
            .catch(() => [])
        })
        .then(rules => {
          this.access = this.access.concat(rules)

          // Load effective Federation permissions, make sure not to trigger error since federation endpoints are optional
          return this.$AutomationAPI.permissionsEffective()
            .catch(() => [])
        })
        .then(rules => {
          this.access = this.access.concat(rules)
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
