<template>
  <list-with-details :title="$t('user.manage', { count: 0 })"
                     :create-button-label="$t('user.add')"
                     permissions-resource-type="system:user:*"
                     :permissions-button-label="$t('user.manage-wc-permissions')"
                     @update="fetchUsers"
                     @create="$router.push({ name: 'users.user' })">
    <b-table sortable striped hover small
             head-variant="dark"
             responsive
             :items="fetchUsers"
             :fields="fields"
             @row-clicked="selected">
    </b-table>
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
      error: null,
      fields: [
        { key: 'name', sortable: true },
        { key: 'handle', sortable: true },
        { key: 'email', sortable: true },
        { key: 'createdAt', sortable: true },
      ],
    }
  },

  methods: {
    fetchUsers (ctx, callback) {
      const p = {
        query: this.query.toLowerCase(),
        sort: `${ctx.sortBy || 'createdAt'} ${ctx.sortDesc ? 'DESC' : 'ASC'}`,
        // page: ctx.currentPage,
        // perPage: ctx.perPage,
      }
      this.$SystemAPI.userList(p).then(({ set }) => {
        callback(set)
      }).catch(({ message }) => {
        this.error = message
      })
    },
    selected ({ userID }) {
      this.$router.push({ name: 'users.user', params: { userID } })
    },
  },
}
</script>
