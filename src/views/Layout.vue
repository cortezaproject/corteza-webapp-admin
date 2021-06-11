<template>
  <div class="d-flex flex-column w-100 vh-100">
    <header
      class="mw-100"
    >
      <c-topbar
        :sidebar-pinned="pinned"
      >
        <template #title>
          <portal-target name="topbar-title" />
        </template>

        <template #tools>
          <portal-target name="topbar-tools" />
        </template>
      </c-topbar>
    </header>

    <aside>
      <c-sidebar
        :expanded.sync="expanded"
        :pinned.sync="pinned"
        expand-on-hover
      >
        <template #header-expanded>
          <portal-target name="sidebar-header-expanded" />
        </template>

        <template #body-expanded>
          <portal-target name="sidebar-body-expanded" />
        </template>

        <template #footer-expanded>
          <portal-target name="sidebar-footer-expanded" />
        </template>
      </c-sidebar>
    </aside>

    <portal to="sidebar-body-expanded">
      <c-the-main-nav
        :access="access"
      />
    </portal>

    <main class="d-inline-flex h-100 overflow-auto">
      <!--
        Content spacer
        Large and xl screens should push in content when the nav is expanded
      -->
      <template>
        <div
          class="spacer"
          :class="{
            'expanded': expanded && pinned,
          }"
        />
      </template>
      <router-view />
    </main>

    <c-prompts />
    <c-permissions-modal />
  </div>
</template>
<script>
import CTheMainNav from 'corteza-webapp-admin/src/components/CTheMainNav'
import { components, mixins } from '@cortezaproject/corteza-vue'
const { CPermissionsModal, CPrompts, CTopbar, CSidebar } = components

export default {
  components: {
    CPermissionsModal,
    CPrompts,
    CTopbar,
    CSidebar,
    CTheMainNav,
  },

  mixins: [
    mixins.corredor,
  ],

  data () {
    return {
      error: null,
      access: [],
      expanded: true,
      pinned: true,
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
.spacer {
  min-width: 0;
  -webkit-transition: min-width 0.2s ease-in-out;
  -moz-transition: min-width 0.2s ease-in-out;
  -o-transition: min-width 0.2s ease-in-out;
  transition: min-width 0.2s ease-in-out;

  &.expanded {
    min-width: $sidebar-width;
    -webkit-transition: min-width 0.2s ease-in-out;
    -moz-transition: min-width 0.2s ease-in-out;
    -o-transition: min-width 0.2s ease-in-out;
    transition: min-width 0.2s ease-in-out;
  }
}
</style>
