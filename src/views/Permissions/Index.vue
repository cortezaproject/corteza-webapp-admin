<template>
  <div class="p-5">
    <p>{{ $t('permission.managePermissions') }}</p>
    <ul class="list-unstyled">
      <li class="mb-1">
        <permissions-button resource="system">System</permissions-button>
      </li>
      <li class="mb-1">
        <permissions-button resource="messaging">Messaging</permissions-button>
      </li>
      <li class="mb-1">
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
