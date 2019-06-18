<template>
  <list-with-details :title="`${$t('navigation.manageApps')} (${applications.length})`"
                     :create-button-label="$t('application.add')"
                     permissions-resource-type="system:application:*"
                     :permissions-button-label="$t('application.manage-wc-permissions')"
                     @update="fetchApplications"
                     @create="$router.push({ name: 'applications.application', params: { applicationID: undefined } })">

    <ul>
      <li v-for="u in applications" :key="u.ID">
        <router-link :to="{ name: 'applications.application', params: { applicationID: u.applicationID } }">{{u.name || u.applicationname || u.email}}</router-link>
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

<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';
</style>
