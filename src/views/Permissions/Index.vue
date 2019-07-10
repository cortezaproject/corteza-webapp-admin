<template>
  <div>
    <p>{{ $t('permission.managePermissions') }}</p>
    <ul class="menu-layer">
      <li>
        <permissions-button resource="system">System</permissions-button>
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
import ListWithDetails from 'corteza-webapp-admin/src/components/ListWithDetails'

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
div {
  margin: 10px;
}
</style>
