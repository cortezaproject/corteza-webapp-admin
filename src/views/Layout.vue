<template>
  <b-container
    class="vh-100"
    fluid
  >
    <b-row
      class="py-2 px-3"
    >
      <h4 class="m-0">
        Admin
      </h4>
    </b-row>
    <b-row
      class="h-100"
    >
      <div
        class="left-sidebar overflow-auto h-100 pb-5"
        :class="leftSidebarClass"
      >
        <b-list-group>
          <main-nav-item
            :label="$t('navigation.applications')"
            :to="{ name: 'applications' }"
            :icon="['fas', 'th-large']"
          />

          <main-nav-item
            :label="$t('navigation.users')"
            :to="{ name: 'users' }"
            :icon="['fas', 'users']"
          />

          <main-nav-item
            :label="$t('navigation.roles')"
            :to="{ name: 'roles' }"
            :icon="['fas', 'hat-cowboy']"
          />

          <main-nav-item
            :label="$t('navigation.permissions')"
            :to="{ name: 'permissions' }"
            :icon="['fas', 'lock']"
          />

          <main-nav-item
            :label="$t('navigation.automation')"
            :to="{ name: 'automation' }"
            :icon="['fas', 'magic']"
          />

          <main-nav-item
            :label="$t('navigation.settings')"
            :to="{ name: 'settings' }"
            :icon="['fas', 'cogs']"
          />
        </b-list-group>
        <b-list-group>
          <b-list-group-item
            class="p-2 border-0 bg-dark text-white position-absolute left-switcher"
            @click="showLeftSidebar=!showLeftSidebar"
          >
            <font-awesome-icon
              :icon="['fas', 'angle-double-left']"
            />
          </b-list-group-item>
        </b-list-group>
      </div>
      <div
        class="bg-light flex-grow-1 overflow-auto h-100 p-2 pb-5"
      >
        <router-view class="view" />
      </div>
      <div
        class="right-sidebar overflow-auto h-100 p-2 pb-5"
        :class="rightSidebarClass"
      >
        right sidebar
        <div
          class="p-2 bg-dark text-white position-absolute right-switcher"
          @click="showRightSidebar=!showRightSidebar"
        >
          <font-awesome-icon
            :icon="['fas', 'angle-double-right']"
          />
        </div>
      </div>
    </b-row>
  </b-container>
</template>
<script>
import MainNavItem from '../components/MainNavItem'

export default {
  components: {
    MainNavItem,
  },

  data () {
    return {
      showLeftSidebar: true,
      showRightSidebar: true,
    }
  },
  computed: {
    leftSidebarClass () {
      return {
        minified: !this.showLeftSidebar,
      }
    },
    rightSidebarClass () {
      return {
        hidden: this.showRightSidebar,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.left-sidebar,
.right-sidebar {
  width: $sidebar-width;
  transition: all 0.3s ease;
}

.left-sidebar {
  &.minified {
    width: 50px;
    /deep/ .label {
      opacity: 0;
      transition: all 0.5s ease;
    }
    .left-switcher {
      transform: rotate(180deg);
    }
  }
}
.right-sidebar {
  &.hidden {
    margin-right: -($sidebar-width);
    .right-switcher {
      transform: rotate(180deg);
    }
  }
}
.left-switcher,
.right-switcher {
  bottom: 0;
  cursor: pointer;
}
.right-switcher {
  right: 0;
}
</style>
