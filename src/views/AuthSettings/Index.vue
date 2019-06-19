<template>
  <list-with-details :title="$t('navigation.auth-settings')">
    <ul>
      <li>
        <router-link :to="{ name: 'auth-settings.external-providers' }">{{ $t('auth-settings.external-providers.title') }}</router-link>
      </li>
    </ul>
  </list-with-details>
</template>

<script>
import ListWithDetails from '@/components/ListWithDetails'

export default {
  components: {
    ListWithDetails,
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/menu-layer.scss';
</style>
