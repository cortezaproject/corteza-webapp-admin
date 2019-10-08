<template>
  <div id="app" class="app" v-if="loaded">
    <div class="panel">
      <template v-if="$auth.is()">
        <ul class="menu-layer">
          <li><router-link :to="{ name: 'applications' }">{{ $t('navigation.app') }}</router-link></li>
          <li><router-link :to="{ name: 'users' }">{{ $t('navigation.user') }}</router-link></li>
          <li><router-link :to="{ name: 'roles' }">{{ $t('navigation.role') }}</router-link></li>
          <li><router-link :to="{ name: 'permissions' }">{{ $t('navigation.permission') }}</router-link></li>
          <li><router-link :to="{ name: 'automation' }">{{ $t('navigation.automation') }}</router-link></li>
          <li><router-link :to="{ name: 'settings' }">{{ $t('navigation.settings') }}</router-link></li>
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
      <permissions-modal />
    </div>
  </div>
  <div class="loader" v-else>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { PermissionsModal } from 'corteza-webapp-common/components'

export default {
  components: {
    PermissionsModal,
  },

  data () {
    return {
      loaded: false,
      error: null,
    }
  },

  created () {
    this.$auth.check(this.$SystemAPI)
      .then(this.checkPermissions)
      .catch(() => {
        this.$auth.open()
      })
  },

  methods: {
    checkPermissions () {
      this.$SystemAPI.permissionsEffective().then((ep = []) => {
        // Quick & dirty permission check for admin access:
        if (!(ep.find(p => p.resource === 'system' && p.operation === 'access' && p.allow))) {
          this.error = this.$t('auth.noAccess')
        } else {
          this.loaded = true
        }
      }).catch(({ message }) => {
        this.error = message
      })
    },
  },
}
</script>
<style scoped lang="scss">
.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: row;

  .panel {
    flex: 1;
    z-index: 1;
    background: $white;
    max-width: 200px;
    border-right: 2px solid $light;
    padding-top: 55px;
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

.error {
  color: $danger;
  font-size: 24px;
  background-color: $white;
  width: 100vw;
  height: 20vh;
  padding: 60px;
  position: absolute;
  top: 40vh;
  text-align: center;
}

</style>
