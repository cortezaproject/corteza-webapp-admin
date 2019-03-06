<template>
  <list-with-details :title="title"
                     create-button-label="Add User"
                     @update="fetchUsers"
                     @create="$router.push({ name: 'users.user', params: { userID: undefined } })">

    <ul>
      <li v-for="u in users" :key="u.ID">
        <router-link :to="{ name: 'users.user', params: { userID: u.userID } }">{{u.name || u.username || u.email}}</router-link>
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
    }
  },

  computed: {
    title () {
      return `Manage users (${this.users.length})`
    },
  },

  created () {
    this.fetchUsers()
  },

  methods: {
    fetchUsers () {
      this.$system.userList({ query: this.query.toLowerCase() }).then(uu => {
        this.users = uu
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';
</style>
