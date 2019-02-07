<template>
  <section id="users">
    <header>
      <h2 class="header-title">Manage Teams ({{teams.length}})</h2>
    </header>
    <div class="content row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-lg-2">
            <div class="list-users">
              <h2 class="header-row header-subtitle">
                List of users
              </h2>
              <ul>
                <li v-for="(user, uidx) in users" :key="'users-' + uidx">
                  <a href="#">{{user.name}}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-10">
            <div class="settings">
              <h2 class="header-subtitle header-row">
                User Information
              </h2>
              <div class="row list-settings">
                <div class="col-lg-7">
                  <b-input-group prepend="Username">
                    <b-form-input></b-form-input>
                  </b-input-group>
                </div>
                <div class="col-lg-7">
                  <b-input-group prepend="Something with dropdown">
                    <b-form-input></b-form-input>
                    <b-dropdown text="Dropdown" variant="outline-secondary" slot="append">
                      <b-dropdown-item>Action A</b-dropdown-item>
                      <b-dropdown-item>Action B</b-dropdown-item>
                    </b-dropdown>
                  </b-input-group>
                </div>
                <div class="col-lg-7">
                  <b-input-group prepend="Something else">
                    <b-form-input></b-form-input>
                  </b-input-group>
                </div>
                <div class="col-lg-7">
                  <b-input-group prepend="Something">
                    <b-form-input></b-form-input>
                  </b-input-group>
                </div>
                <div class="col-lg-7">
                  <b-form-group label="Radio buttons example">
                    <b-form-radio-group v-model="selected" plain>
                      <b-form-radio value="first">First</b-form-radio>
                      <b-form-radio value="second">Second</b-form-radio>
                      <b-form-radio value="third" disabled>Disabled</b-form-radio>
                      <b-form-radio value="fourth">Fourth</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
                <div class="col-lg-7">
                  <b-form-group label="Stacked radio buttons example">
                    <b-form-radio-group v-model="selected" plain stacked>
                      <b-form-radio value="first">First</b-form-radio>
                      <b-form-radio value="second">Second</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                </div>
                <div class="col-lg-7">
                  <b-form-group label="Inline checkboxes (default)">
                    <b-form-checkbox-group plain>
                      <b-form-checkbox value="first">First</b-form-checkbox>
                      <b-form-checkbox value="second">Second</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                </div>
                <div class="col-lg-7">
                  <b-form-group label="Stacked  checkboxes">
                    <b-form-checkbox-group stacked plain>
                      <b-form-checkbox value="first">Radio</b-form-checkbox>
                      <b-form-checkbox value="second">Second</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-form-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content row">
      <div class="col-sm-12">
        <div class="row admin-table-header">
          <div class="col-sm-4">
            <div class="header-row">
              {{users.length}} Members – <a href="#" class="header-link">Prune</a>
              <div class="float-right header-row-search">
                <input class="search-input" type="text" v-model="search" placeholder="Search" @keyup.enter="fetchUsers "/>
                <button class="search-button" v-on:click="fetchUsers">
                  <img src="../../assets/images/search.png" alt="Search" title="Search" />
                </button>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="header-row">
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
          <thead>
            <tr >
              <th>
              </th>
              <th>
               Name
              </th>
              <th>
                Teams
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, uidx) in users" :key="'users-' + uidx">
              <td class="table-avatar">
                <img src="../../assets/images/no_image.png" />
              </td>
              <td class="table-details table-column-short">
                <a href="#">{{user.name}}</a>
                <a href="#">{{user.email}}</a>
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

<style scoped lang="scss">
  @import '@/assets/sass/_0.commons.scss';
  @import '@/assets/sass/menu-layer.scss';

.list-users {
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

</style>
