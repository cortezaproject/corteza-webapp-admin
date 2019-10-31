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
          <b-list-group-item
            :to="{ name: 'applications' }"
            active-class="active"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'th-large']" />
            <span>Applications</span>
          </b-list-group-item>
          <b-list-group-item
            :to="{ name: 'users' }"
            active-class="active"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'users']" />
            <span>Users</span>
          </b-list-group-item>
          <b-list-group-item
            :to="{ name: 'roles' }"
            active-class="active"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'hat-cowboy']" />
            <span>Roles</span>
          </b-list-group-item>
          <b-list-group-item
            :to="{ name: 'permissions' }"
            active-class="active"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'lock']" />
            <span>Permissions</span>
          </b-list-group-item>
          <b-list-group-item
            :to="{ name: 'automation' }"
            active-class="active"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'magic']" />
            <span>Automation</span>
          </b-list-group-item>
          <b-list-group-item
            :to="{ name: 'settings' }"
            active-class="active"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'cogs']" />
            <span>{{ $t('navigation.settings') }}</span>
          </b-list-group-item>
          <b-list-group-item
            class="p-2 border-0 bg-dark text-white position-absolute left-switcher"
            @click="showLeftSidebar=!showLeftSidebar"
          >
            <font-awesome-icon :icon="['fas', 'angle-double-left']" />
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
          <font-awesome-icon :icon="['fas', 'angle-double-right']" />
        </div>
      </div>
    </b-row>
  </b-container>
</template>

<script>

export default {
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
    span {
      opacity: 0;
      transition: all 0.5s ease;
    }
    .left-switcher {
      transform: rotate(180deg);
    }
  }
}
.svg-inline--fa {
  width: 30px;
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
