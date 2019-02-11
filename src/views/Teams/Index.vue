<template>
  <list-with-details :title="title">
    <ul>
      <li v-for="u in teams" :key="u.ID">
        <router-link :to="{ name: 'teams.team', params: { teamID: u.teamID } }">{{u.name || u.teamname || u.email}}</router-link>
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
      teams: [],
    }
  },

  computed: {
    title () {
      return `Manage teams (${this.teams.length})`
    },
  },

  created () {
    this.fetchTeams()
  },

  methods: {
    fetchTeams () {
      this.$system.teamList({ query: this.query.toLowerCase() }).then(tt => {
        this.teams = tt
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

.list-teams {
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
