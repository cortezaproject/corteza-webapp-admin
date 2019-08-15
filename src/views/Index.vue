<template>
  <div id="app" class="app" v-if="loaded">
    <div class="panel border-right bg-white flex-grow-1">
      <template v-if="$auth.is()">
        <ul class="list-group">
          <router-link class="list-group-item text-dark p-2" :to="{ name: 'auth-settings' }">{{ $t('navigation.auth-settings') }}</router-link>
          <router-link class="list-group-item text-dark p-2" :to="{ name: 'applications' }">{{ $t('navigation.app') }}</router-link>
          <router-link class="list-group-item text-dark p-2" :to="{ name: 'users' }">{{ $t('navigation.user') }}</router-link>
          <router-link class="list-group-item text-dark p-2" :to="{ name: 'roles' }">{{ $t('navigation.role') }}</router-link>
          <router-link class="list-group-item text-dark p-2" :to="{ name: 'permissions' }">{{ $t('navigation.permission') }}</router-link>
        </ul>
      </template>
      <template v-else>
        <p>{{ $t('auth.notSignedIn') }}</p>
      </template>
    </div>
    <div class="flex-grow-1">
      <transition name="slide">
        <router-view class="view"></router-view>
      </transition>
      <permissions-modal />
    </div>
  </div>
  <div class="loader" v-else>
    <div class="error text-danger bg-white" v-if="error">{{ error }}</div>
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
    z-index: 1;
    max-width: 200px;
    padding-top: 55px;
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
  font-size: 24px;
  width: 100vw;
  height: 20vh;
  padding: 60px;
  position: absolute;
  top: 40vh;
  text-align: center;
}

</style>
