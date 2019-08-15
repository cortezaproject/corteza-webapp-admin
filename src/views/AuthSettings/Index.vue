<template>
  <list-with-details :title="$t('navigation.auth-settings')">
    <ul class="list-group">
      <router-link :to="{ name: 'auth-settings.external-providers' }" class="list-group-item text-dark p-2">{{ $t('auth-settings.external-providers.title') }}</router-link>
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
