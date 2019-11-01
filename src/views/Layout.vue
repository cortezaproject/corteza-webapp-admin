<template>
  <b-container
    class="vh-100"
    fluid
  >
    <b-row
      class="py-2 px-3"
    >
      <h4 class="m-0">
        Admin
      </h4>
    </b-row>
    <b-row
      class="h-100"
    >
      <c-sidebar>
        <b-list-group>
          <c-main-nav-item
            :label="$t('navigation.applications')"
            :to="{ name: 'applications' }"
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
        class="bg-light flex-grow-1 overflow-auto h-100 p-2 pb-5"
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

<style scoped lang="scss">

</style>
