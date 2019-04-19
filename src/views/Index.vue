<template>
  <div id="app" class="app" v-if="loaded">
    <div class="panel">
      <template v-if="isAuthenticated">
        <ul>
          <li><router-link :to="{ name: 'auth-settings' }">{{ $t('navigation.auth-settings') }}</router-link></li>
          <li><router-link :to="{ name: 'applications' }">{{ $t('navigation.app') }}</router-link></li>
          <li><router-link :to="{ name: 'users' }">{{ $t('navigation.user') }}</router-link></li>
          <li><router-link :to="{ name: 'roles' }">{{ $t('navigation.role') }}</router-link></li>
          <li><router-link :to="{ name: 'permissions' }">{{ $t('navigation.permission') }}</router-link></li>
        </ul>
      </template>
      <template v-else>
        <p>{{ $t('auth.notSignedIn') }}</p>
      </template>
    </div>
    <div class="main">
      <transition name="slide">
        <router-view class="view"></router-view>
      </transition>
    </div>
  </div>
  <div class="loader" v-else>
    <img :src="logo" />
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import auth from '@/mixins/auth'

export default {
  mixins: [auth],
  data () {
    return {
      logo: require('@/assets/images/crust-logo-with-tagline.png'),
      loaded: false,
      error: '',
    }
  },

  created () {
    this.checkAuthentication().then(() => {
      this.$system.permissionsEffective().then(ep => {
        // Quick & dirty permission check for admin access:
        if (!(ep.find(p => p.resource === 'system' && p.operation === 'access') || {}).allow) {
          this.error = this.$t('auth.noAccess')
        } else {
          this.loaded = true
        }
      })
    }).catch(() => {
      window.location = '/auth'
    })
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

@keyframes flickerAnimation {
  0% { opacity: 0.6; }
  50% { opacity: 0.1; }
  100% { opacity: 0.6; }
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  img {
    align-self: center;
    opacity: 0.7;
    animation: flickerAnimation 3s infinite;
  }
}

.error {
  color: $appred;
  font-size: 24px;
  background-color: $appwhite;
  width: 100vw;
  height: 20vh;
  padding: 60px;
  position: absolute;
  top: 40vh;
  text-align: center;
}

</style>
