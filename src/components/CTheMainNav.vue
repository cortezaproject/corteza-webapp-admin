<template>
  <c-sidebar
    class="overflow-auto"
  >
    <b-list-group>
      <small class="ml-1 mt-3 font-weight-light text-uppercase">
        System &blk14;
      </small>
      <c-main-nav-item
        v-if="false"
        :label="$t('navigation.stats')"
        :to="{ name: 'stats' }"
        :icon="['fas', 'th-large']"
      />

      <c-main-nav-item
        :label="$t('navigation.users')"
        :to="{ name: 'user.list' }"
        :icon="['fas', 'users']"
      />

      <c-main-nav-item
        :label="$t('navigation.roles')"
        :to="{ name: 'role.list' }"
        :icon="['fas', 'hat-cowboy']"
      />

      <c-main-nav-item
        :label="$t('navigation.permissions')"
        :to="{ name: 'permissions' }"
        :icon="['fas', 'lock']"
      />

      <c-main-nav-item
        :label="$t('applications:label')"
        :to="{ name: 'application.list' }"
        :icon="['fas', 'th-large']"
      />

      <c-main-nav-item
        :label="$t('navigation.scripts')"
        :to="{ name: 'script.list' }"
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
        Compose &blk14;
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
        Messaging &blk14;
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
