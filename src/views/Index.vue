<template>
  <div id="app" class="main-area h-100">
    <div class="side-panel">
      <template v-if="isAuthenticated">
        <ul>
          <li>
            <router-link to="/teams">
              Teams
            </router-link>
          </li>
          <li>
            <router-link to="/users">
              Users
            </router-link>
          </li>
          <li>
            <router-link to="/permissions">
              Permissions
            </router-link>
          </li>
        </ul>
      </template>
      <template v-else>
        <p>You're not signed in</p>
      </template>
    </div>
    <div class="main-view h-100">
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
import menu from '@/api/menu'
import auth from '@/mixins/auth'

export default {
  mixins: [auth],
  data () {
    return {
      menu: menu,
    }
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';

.main-area {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: row nowrap;
}

.main-view {
  flex: 1 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .view {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}

.side-panel {
  background: $appwhite;
  width: 100%;
  max-width: 260px;
  height: 100vh;
  overflow: hidden;
  padding-top: $headerHeight;
  border-right: 2px solid $appcream;
  ul {
    padding-top: 50px;
  }
}

</style>
