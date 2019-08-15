<template>
  <list-with-details :title="`${$t('navigation.manageApps')} (${applications.length})`"
                     :create-button-label="$t('application.add')"
                     permissions-resource-type="system:application:*"
                     :permissions-button-label="$t('application.manage-wc-permissions')"
                     @update="onUpdate"
                     @create="onCreate">

<<<<<<< HEAD
    <ul class="menu-layer">
      <li v-for="u in applications" :key="u.ID" class="application">
        <router-link :to="{ name: 'applications.application', params: { applicationID: u.applicationID } }">{{u.name || u.applicationname || u.email}}</router-link>
      </li>
=======
    <ul class="list-group">
      <router-link v-for="u in applications" :key="u.ID" class="list-group-item text-dark p-2" :to="{ name: 'applications.application', params: { applicationID: u.applicationID } }">{{u.name || u.applicationname || u.email}}</router-link>
>>>>>>> Replace menu-layer with Bootstrap group-item
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
      error: null,
    }
  },

  created () {
    this.fetchApplications()
  },

  methods: {
    onUpdate (e) {
      this.fetchApplications(e)
    },

    onCreate () {
      this.$router.push({ name: 'applications.application', params: { applicationID: undefined } })
    },

    fetchApplications () {
      this.$SystemAPI.applicationList({ query: this.query.toLowerCase() }).then(uu => {
        this.applications = uu
      }).catch(({ message }) => {
        this.error = message
      })
    },
  },
}
</script>
