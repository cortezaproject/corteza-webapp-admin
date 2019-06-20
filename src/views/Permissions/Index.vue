<template>
  <div>
    <p>{{ $t('role.managePermissions') }}</p>
    <ul>
      <li>
        <permissions-button resource="system:">System</permissions-button>
      </li>
      <li>
        <permissions-button resource="messaging">Messaging</permissions-button>
      </li>
      <li>
        <permissions-button resource="compose">Compose</permissions-button>
      </li>
    </ul>

  </div>
</template>

<script>
import ListWithDetails from '@/components/ListWithDetails'

export default {
  components: {
    ListWithDetails,
  },

  data () {
    return {
      query: '',
      roles: [],
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/menu-layer.scss';

div {
  margin: 10px;
}
</style>
