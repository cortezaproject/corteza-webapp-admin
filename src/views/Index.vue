<template>
  <div id="app" class="app">
    <div class="panel">
      <template v-if="isAuthenticated">
        <ul>
          <li><router-link :to="{ name: 'users' }">Users</router-link></li>
          <li><router-link :to="{ name: 'roles' }">Roles</router-link></li>
          <li><router-link :to="{ name: 'permissions' }">Permissions</router-link></li>
        </ul>
      </template>
      <template v-else>
        <p>You're not signed in</p>
      </template>
    </div>
    <div class="main">
      <transition name="slide">
        <router-view class="view"></router-view>
      </transition>
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

.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: row;

  .panel {
    flex: 1;
    z-index: 1;
    background: $appwhite;
    max-width: 200px;
    padding-top: $headerHeight;
    border-right: 2px solid $appcream;
    padding-top: 50px;
  }

  .main {
    flex: 1;
  }
}

.slide-enter-active {
  transition: all .3s ease;
  opacity: 1;
}
.slide-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  opacity: 0;
}

.slide-enter {
  transform: translateX(100vw);
}

.slide-leave-to {
  transform: translateX(-100vw);
}

</style>
