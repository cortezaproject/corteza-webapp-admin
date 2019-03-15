<template>
  <list-with-details :title="title"
                     :create-button-label="$t('application.add')"
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

  computed: {
    title () {
      return `${this.$t('navigation.manageApps')} (${this.applications.length})`
    },
  },

  created () {
    this.fetchApplications()
  },

  methods: {
    fetchApplications () {
      this.$system.applicationList({ query: this.query.toLowerCase() }).then(uu => {
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
