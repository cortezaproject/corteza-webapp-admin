<template>
  <list-with-details :title="title">
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

  computed: {
    title () {
      return `${this.$t('navigation.auth-settings')}`
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';
</style>
