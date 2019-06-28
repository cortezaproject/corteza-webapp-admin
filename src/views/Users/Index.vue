<template>
  <list-with-details :title="$t('user.manage', { count: users.length || 0 })"
                     class="user-list"
                     :create-button-label="$t('user.add')"
                      permissions-resource-type="system:user:*"
                     :permissions-button-label="$t('user.manage-wc-permissions')"
                     @update="fetchUsers"
                     @create="$router.push({ name: 'users.user' })">

    <ul>
      <li v-for="u in users" :key="u.userID">
        <router-link :to="{ name: 'users.user', params: { userID: u.userID } }">{{ u.name || u.username || u.email }}</router-link>
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

  data () {
    return {
      query: '',
      users: [],
      error: null,
    }
  },

  created () {
    this.fetchUsers()
  },

  methods: {
    fetchUsers () {
      this.$SystemAPI.userList({ query: this.query.toLowerCase(), sort: 'name' }).then(({ set }) => {
        this.users = set
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
