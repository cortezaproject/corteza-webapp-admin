<template>
  <section id="teams">
    <header>
      <h2 class="header-title">Manage teams ({{teams.length}})</h2>
    </header>
    <div class="content row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-lg-2">
            <div class="list-teams">
              <h2 class="header-row header-subtitle">
                List of teams
              </h2>
              <ul>
                <li v-for="t in teams" :key="t.ID">
                  <router-link :to="{ name: 'teams.team', params: { teamID: t.teamID } }">{{ t.name }}</router-link>
                </li>
              </ul>
            </div>
          </div>
          <transition name="slide">
            <router-view class="col-lg-10" :key="$route.fullPath"></router-view>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      teams: [],
    }
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

.settings {
  h2 {
    padding-top: 15px;
  }
  .list-settings {
    max-height: calc(100vh - 110px);
    overflow: scroll;
  }
}

.slide-enter-active {
  transition: all .3s ease;
}
.slide-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(1000px);
}

</style>
