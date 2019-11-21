<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <c-permission-list
      :roles="roles"
      :permissions="permissions"
      :role-permissions="rolePermissions"
      :loaded="isLoaded"
      :processing="permission.processing"
      :success="permission.success"
      @submit="onSubmit"
    />
  </b-container>
</template>

<script>
import permissionHelpers from 'corteza-webapp-admin/src/mixins/permissionHelpers'
import CPermissionList from 'corteza-webapp-admin/src/components/Permissions/CPermissionList'

export default {
  i18nOptions: {
    namespaces: [ 'system.permissions' ],
    keyPrefix: 'list',
  },

  components: {
    CPermissionList,
  },

  mixins: [
    permissionHelpers,
  ],

  created () {
    this.api = this.$SystemAPI
    this.fetchRoles(this.$SystemAPI)
    this.fetchPermissions(this.$SystemAPI)
  },
}
</script>
