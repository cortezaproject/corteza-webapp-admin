<template>
  <div
    class="d-flex flex-column vh-100 bg-light"
  >
    <header
      class="d-flex py-2 px-3 bg-primary shadow-sm text-light fixed-top align-items-center"
    >
      <h4 class="m-0">
        Corteza Admin
      </h4>
      <div
        align-self="end"
        class="flex-fill text-right"
      >
        <p class="m-0 d-inline">
          John Doe
        </p>
        <a
          href="#"
          class="text-white ml-3 h5"
        >
          <font-awesome-icon
            :icon="['fas', 'power-off']"
          />
        </a>
      </div>
    </header>

    <div
      class="d-flex flex-fill pt-5 vh-100"
    >
      <c-sidebar
        class="overflow-auto"
      >
        <b-list-group>
          <small class="ml-1 mt-3 font-weight-light text-uppercase">
            System
          </small>
          <c-main-nav-item
            v-if="false"
            :label="$t('navigation.stats')"
            :to="{ name: 'stats' }"
            :icon="['fas', 'th-large']"
          />

          <c-main-nav-item
            :label="$t('navigation.users')"
            :to="{ name: 'users' }"
            :icon="['fas', 'users']"
          />

          <c-main-nav-item
            :label="$t('navigation.roles')"
            :to="{ name: 'roles' }"
            :icon="['fas', 'hat-cowboy']"
          />

          <c-main-nav-item
            :label="$t('navigation.permissions')"
            :to="{ name: 'permissions' }"
            :icon="['fas', 'lock']"
          />

          <c-main-nav-item
            :label="$t('applications:label')"
            :to="{ name: 'applications' }"
            :icon="['fas', 'th-large']"
          />

          <c-main-nav-item
            :label="$t('navigation.automation')"
            :to="{ name: 'automation' }"
            :icon="['fas', 'magic']"
          />

          <c-main-nav-item
            :label="$t('navigation.settings')"
            :to="{ name: 'settings' }"
            :icon="['fas', 'cogs']"
          />
        </b-list-group>

        <b-list-group>
          <small class="ml-1 mt-3 font-weight-light text-uppercase">
            Compose
          </small>

          <c-main-nav-item
            :label="$t('navigation.settings')"
            :to="{ name: 'settings' }"
            :icon="['fas', 'cogs']"
          />

          <c-main-nav-item
            :label="$t('navigation.permissions')"
            :to="{ name: 'permissions' }"
            :icon="['fas', 'lock']"
          />
        </b-list-group>

        <b-list-group>
          <small class="ml-1 mt-3 font-weight-light text-uppercase">
            Messaging
          </small>

          <c-main-nav-item
            :label="$t('navigation.settings')"
            :to="{ name: 'settings' }"
            :icon="['fas', 'cogs']"
          />

          <c-main-nav-item
            :label="$t('navigation.permissions')"
            :to="{ name: 'permissions' }"
            :icon="['fas', 'lock']"
          />
        </b-list-group>
      </c-sidebar>
      <router-view
        class="flex-fill overflow-auto"
      />
    </div>
    <!--
    <b-row
      class="m-0"
    >
      <div
        class="flex-grow-1 overflow-auto h-100"
      >
        <router-view />
      </div>

      <c-sidebar
        v-show="false"
        orientation="right"
      >
        <code>
          @todo should not hide on narrow view (maybe slide over?)
        </code>
      </c-sidebar>
    </b-row>
    -->
  </div>
</template>
<script>
import CMainNavItem from '../components/CMainNavItem'
import CSidebar from '../components/CSidebar'

export default {
  components: {
    CSidebar,
    CMainNavItem,
  },

}
</script>
<style scoped lang="scss">
header {
  height: $header-height !important;
}
</style>
