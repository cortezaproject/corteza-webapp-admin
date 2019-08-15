<template>
  <list-with-details :title="$t('user.manage', { count: users.length || 0 })"
                     :create-button-label="$t('user.add')"
                      permissions-resource-type="system:user:*"
                     :permissions-button-label="$t('user.manage-wc-permissions')"
                     @update="onUpdate"
                     @create="onCreate">
<<<<<<< HEAD

    <ul class="menu-layer">
      <li v-for="u in users" :key="u.userID" class="user">
        <router-link :to="{ name: 'users.user', params: { userID: u.userID } }">{{ u.name || u.username || u.email }}</router-link>
=======
                     @update="fetchUsers"
                     @create="$router.push({ name: 'users.user' })">
    <ul class="list-group">
      <li >
        <router-link v-for="u in users"
                     :key="u.userID"
                     class="list-group-item text-dark p-2"
                     :to="{ name: 'users.user', params: { userID: u.userID } }">{{ u.name || u.username || u.email }}</router-link>
>>>>>>> Replace menu-layer with Bootstrap group-item
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
    onUpdate (e) {
      this.fetchUsers(e)
    },

    onCreate () {
      this.$router.push({ name: 'users.user' })
    },

    fetchUsers () {
      this.$SystemAPI.userList({ query: this.query.toLowerCase(), sort: 'name' }).then(({ set } = {}) => {
        this.users = set
      }).catch(({ message }) => {
        this.error = message
      })
    },
  },
}
</script>
