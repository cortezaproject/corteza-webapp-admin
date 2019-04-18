<template>
  <list-with-details :title="title">
    <ul>
      <li v-for="r in roles" :key="r.ID">
        <router-link :to="{ name: 'permissions.per-role', params: { roleID: r.roleID } }">{{ r.name || r.handle || r.roleID || $t('role.unnamed') }}</router-link>
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
      roles: [],
    }
  },

  computed: {
    title () {
      return this.$t('role.managePermissions')
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
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';
</style>
