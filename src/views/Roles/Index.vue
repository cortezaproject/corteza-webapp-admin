<template>
  <list-with-details :title="title">
    <ul>
      <li v-for="r in roles" :key="r.ID">
        <router-link :to="{ name: 'roles.role', params: { roleID: r.roleID } }">{{r.name || r.handle || r.roleID || 'Unnamed role' }}</router-link>
      </li>
    </ul>
  </list-with-details>
</template>

<script>
import ListWithDetails from '@/components/ListWithDetails'

export default {
  data () {
    return {
      query: '',
      roles: [],
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
      this.$system.roleList({ query: this.query.toLowerCase() }).then(rr => {
        this.roles = rr
      })
    },
  },

  components: {
    ListWithDetails,
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';

.list-roles {
  border-right: 2px solid $appcream;
  h2 {
    padding: 10px 0 0 15px;
  }
  ul {
    height: calc(100vh - 110px);
    overflow: scroll;
  }
}
</style>
