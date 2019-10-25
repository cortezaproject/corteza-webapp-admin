<template>
  <list-with-details
    :title="title"
    :create-button-label="$t('role.add')"
    :permissions-button-label="$t('role.manage-wc-permissions')"
    permissions-resource-type="system:role:*"
    @update="onUpdate"
    @create="onCreate"
  >
    <ul class="menu-layer">
      <li
        v-for="r in roles"
        :key="r.ID"
        class="role"
      >
        <router-link :to="{ name: 'roles.role', params: { roleID: r.roleID } }">
          {{ r.name || r.handle || r.roleID || $t('role.unnamed') }}
        </router-link>
      </li>
    </ul>
  </list-with-details>
</template>

<script>
import ListWithDetails from 'corteza-webapp-admin/src/components/ListWithDetails'

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
    onUpdate (e) {
      this.fetchRoles(e)
    },

    onCreate () {
      this.$router.push({ name: 'roles.role', params: { roleID: undefined } })
    },

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
