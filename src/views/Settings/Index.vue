<template>
  <list-with-details :title="$t('navigation.settings')">
    <ul class="menu-layer">
      <li>
        <router-link :to="{ name: 'auth-settings' }">{{ $t('settings.system.auth.title') }}</router-link>
        <router-link :to="{ name: 'external-providers' }">{{ $t('settings.system.auth.external-providers.title') }}</router-link>
        <router-link :to="{ name: 'compose' }">{{ $t('settings.compose.title') }}</router-link>
        <router-link :to="{ name: 'messaging' }">{{ $t('settings.messaging.title') }}</router-link>
        <router-link :to="{ name: 'email' }">{{ $t('settings.mail.title') }}</router-link>
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
