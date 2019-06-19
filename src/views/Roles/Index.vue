<template>
  <list-with-details :title="title"
                     :create-button-label="$t('role.add')"
                     permissions-resource-type="system:role:*"
                     :permissions-button-label="$t('role.manage-wc-permissions')"
                     @update="fetchRoles"
                     @create="$router.push({ name: 'roles.role', params: { roleID: undefined } })">
    <ul>
      <li v-for="r in roles" :key="r.ID">
        <router-link :to="{ name: 'roles.role', params: { roleID: r.roleID } }">{{r.name || r.handle || r.roleID || $t('role.unnamed') }}</router-link>
      </li>
    </ul>
  </list-with-details>
</template>

<script>
import ListWithDetails from '@/components/ListWithDetails'

const systemRoles = [
  '1', // Everyone
]

export default {
  components: {
    ListWithDetails,
  },

  data () {
    return {
      query: '',
      roles: [],
      error: null,
    }
  },

  computed: {
    title () {
      return `Manage roles (${this.roles.length})`
    },
  },

  created () {
    this.fetchRoles()
  },

  methods: {
    fetchRoles () {
      this.$SystemAPI.roleList({ query: this.query.toLowerCase() }).then(rr => {
        this.roles = rr.filter(r => !systemRoles.includes(r.roleID))
      }).catch(({ message }) => {
        this.error = message
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/menu-layer.scss';
</style>
