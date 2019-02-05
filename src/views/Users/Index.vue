<template>
  <section id="users">
    <div class="row">
      <div class="col-sm-10">
        <h1 class="header-title">Users</h1>
        <div class="row admin-table-header">
          <div class="col-sm-4">
            <div class="header-row">
              {{users.length}} Members – <a href="#" class="header-link">Prune</a>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="header-row">
              <div class="float-right header-row-search">
                <input class="search-input" type="text" v-model="search" placeholder="Search" @keyup.enter="fetchUsers "/>
                <button class="search-button" v-on:click="fetchUsers">
                  <img src="../../assets/images/search.png" alt="Search" title="Search" />
                </button>
              </div>
              <div class="float-right header-row-role">
                <div class="float-right">
                  <form onsubmit="alert('search action');return false;">
                    <select class="custom-select">
                      <option selected>@everyone</option>
                      <option value="1">@other1</option>
                      <option value="2">@other2</option>
                      <option value="3">@other3</option>
                    </select>
                  </form>
                </div>
                <div class="float-right header-role-text" >
                  Display role:
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table admin-table table-hover">
          <tbody>
            <tr v-for="(user, uidx) in users" :key="'users-' + uidx">
              <td class="table-avatar">
                <img src="../../assets/images/no_image.png" />
              </td>
              <td class="table-details table-column-short">
                <a href="#">{{user.name}}</a>
                <span v-if="('kind' in user && user.kind === 'bot')" class="table-detail-label">bot</span>
                <br>
                <p v-if="user.handle">@{{user.handle}}</p>
              </td>
              <td class="table-channels">
                <ul>
                  <li v-for="(team, tidx) in user.teams" :key="'user-team-' + tidx">
                    <a class="btn" href="#"><span class="channel-name-circle">⬤</span>@{{team.name}}</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-2">
        <div class="close-block">
          <button class="btn big-close-button" onclick="alert('close');"></button>
          <br>
          ESC
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      error: '',
      search: '',
      users: [],
      teams: [],
    }
  },
  async created () {
    this.fetchUsers()
    this.fetchTeams()
  },
  methods: {
    async fetchUsers () {
      try {
        this.users = await this.$system.userList({ query: this.search.toLowerCase() })
      } catch (err) {
        this.error = err.message
      }
    },
    async fetchTeams () {
      try {
        this.teams = await this.$system.teamList({})
      } catch (err) {
        this.error = err.message
      }
    },
  },
}
</script>
