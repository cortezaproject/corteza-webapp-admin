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
        :icon="icon"
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
      <c-the-main-nav />
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
import icon from 'corteza-webapp-admin/src/themes/corteza-base/img/icon.png'

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
      expanded: window.innerWidth > 576,
      pinned: window.innerWidth > 576,
    }
  },

  computed: {
    appName () {
      /* eslint-disable no-undef */
      return WEBAPP
    },

    icon () {
      return this.$Settings.attachment('ui.iconLogo', icon)
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
