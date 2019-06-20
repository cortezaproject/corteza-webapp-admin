<template>
  <list-with-details :title="$t('user.manage', { count: users.length })"
                     :create-button-label="$t('user.add')"
                     @create="$router.push({ name: 'users.user' })"
                     @update="fetchUsers"
                     class="user-list">

    <ul class="menu-layer">
      <li v-for="u in users" :key="u.userID">
        <router-link :to="{ name: 'users.user', params: { userID: u.userID } }">{{ u.name || u.username || u.email }}</router-link>
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
      this.$SystemAPI.userList({ query: this.query.toLowerCase() }).then(uu => {
        this.users = uu.sort((a, b) => a.name.localeCompare(b.name))
      }).catch(({ message }) => {
        this.error = message
      })
    },
  },
}
</script>
