<template>
  <c-sidebar
    class="overflow-auto pt-5"
  >
    <b-list-group>
      <c-main-nav-item
        :label="$t('dashboard:navItem.label')"
        :to="{ name: 'dashboard' }"
        :icon="['fas', 'tachometer-alt']"
      />
    </b-list-group>

    <b-list-group>
      <small class="ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('system:navGroup.label') }}
      </small>

      <c-main-nav-item
        :label="$t('system.users:navItem.label')"
        :to="{ name: 'system.user' }"
        :icon="['fas', 'users']"
      />

      <c-main-nav-item
        :label="$t('system.roles:navItem.label')"
        :to="{ name: 'system.role' }"
        :icon="['fas', 'hat-cowboy']"
      />

      <c-main-nav-item
        :label="$t('system.applications:navItem.label')"
        :to="{ name: 'system.application' }"
        :icon="['fas', 'th-large']"
      />

      <c-main-nav-item
        :label="$t('system.scripts:navItem.label')"
        :to="{ name: 'system.script' }"
        :icon="['fas', 'magic']"
      />

      <c-main-nav-item
        :label="$t('system.settings:navItem.label')"
        :to="{ name: 'system.settings' }"
        :icon="['fas', 'cogs']"
      />

      <c-main-nav-item
        :label="$t('system.permissions:navItem.label')"
        :to="{ name: 'system.permissions' }"
        :icon="['fas', 'lock']"
      />
    </b-list-group>

    <b-list-group>
      <small class="ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('compose:navGroup.label') }}
      </small>

      <c-main-nav-item
        :label="$t('compose.settings:navItem.label')"
        :to="{ name: 'compose.settings' }"
        :icon="['fas', 'cogs']"
      />

      <c-main-nav-item
        :label="$t('compose.permissions:navItem.label')"
        :to="{ name: 'compose.permissions' }"
        :icon="['fas', 'lock']"
      />
    </b-list-group>

    <b-list-group>
      <small class="ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('messaging:navGroup.label') }}
      </small>

      <c-main-nav-item
        :label="$t('messaging.settings:navItem.label')"
        :to="{ name: 'messaging.settings' }"
        :icon="['fas', 'cogs']"
      />

      <c-main-nav-item
        :label="$t('messaging.permissions:navItem.label')"
        :to="{ name: 'messaging.permissions' }"
        :icon="['fas', 'lock']"
      />
    </b-list-group>
  </c-sidebar>
</template>
<script>
import CMainNavItem from 'corteza-webapp-admin/src/components/CMainNavItem'
import CSidebar from 'corteza-webapp-admin/src/components/CSidebar'

export default {
  components: {
    CSidebar,
    CMainNavItem,
  },
}
</script>
