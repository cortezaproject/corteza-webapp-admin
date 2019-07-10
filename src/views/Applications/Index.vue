<template>
  <list-with-details :title="`${$t('navigation.manageApps')} (${applications.length})`"
                     :create-button-label="$t('application.add')"
                     permissions-resource-type="system:application:*"
                     :permissions-button-label="$t('application.manage-wc-permissions')"
                     @update="fetchApplications"
                     @create="$router.push({ name: 'applications.application', params: { applicationID: undefined } })">

    <ul class="menu-layer">
      <li v-for="u in applications" :key="u.ID">
        <router-link :to="{ name: 'applications.application', params: { applicationID: u.applicationID } }">{{u.name || u.applicationname || u.email}}</router-link>
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
      applications: [],
    }
  },

  created () {
    this.fetchApplications()
  },

  methods: {
    fetchApplications () {
      this.$SystemAPI.applicationList({ query: this.query.toLowerCase() }).then(uu => {
        this.applications = uu
      })
    },
  },
}
</script>
