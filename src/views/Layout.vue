<template>
  <b-container
    class="vh-100 bg-light p-0 m-0"
    fluid
  >
    <b-row
      class="py-2 px-3 m-0"
    >
      <b-col
        align-self="start"
        class="m-0 p-0"
      >
        <h4 class="m-0 mt-3">
          Admin
        </h4>
      </b-col>

      <b-col
        align-self="end"
        class="text-right"
      >
        identity..
      </b-col>
    </b-row>
    <b-row
      class="h-100 m-0"
    >
      <c-sidebar>
        <b-list-group>
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
      </c-sidebar>
      <div
        class="flex-grow-1 overflow-auto h-100"
      >
        <router-view />
      </div>

      <c-sidebar
        orientation="right"
      >
        <code>
          @todo should not hide on narrow view (maybe slide over?)
        </code>
      </c-sidebar>
    </b-row>
  </b-container>
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
