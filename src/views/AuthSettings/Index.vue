<template>
  <list-with-details :title="$t('navigation.auth-settings')">
    <ul class="menu-layer">
      <li>
        <router-link :to="{ name: 'auth-settings.external-providers' }">{{ $t('auth-settings.external-providers.title') }}</router-link>
      </li>
    </ul>
  </list-with-details>
</template>

<script>
import ListWithDetails from 'corteza-webapp-admin/src/components/ListWithDetails'

export default {
  components: {
    ListWithDetails,
  },
}
</script>
