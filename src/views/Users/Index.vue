<template>
  <section id="users">
    <header>
      <h2 class="header-title">Manage Users ({{users.length}})</h2>
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
                <li v-for="u in users" :key="u.ID">
                  <router-link :to="{ name: 'users.user', params: { userID: u.userID } }">{{u.name || u.username || u.email}}</router-link>
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
      users: [],
    }
  },

  created () {
    this.fetchUsers()
  },

  methods: {
    fetchUsers () {
      this.$system.userList({ query: this.query.toLowerCase() }).then(uu => {
        this.users = uu
      })
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
