<template>
  <list-with-details :title="$t('user.manage', { count: users.length })"
                     @update="fetchUsers">

    <ul>
      <li v-for="u in users" :key="u.ID">
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
      this.$SystemAPI.userList({ query: this.query.toLowerCase() }).then(uu => {
        this.users = uu
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
