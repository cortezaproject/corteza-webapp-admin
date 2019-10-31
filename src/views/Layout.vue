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
        <b-list-group
          flush
        >
          <b-list-group-item
            href="#"
            active
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'user-cog']" />
            <span>Authentication settings</span>
          </b-list-group-item>
          <b-list-group-item
            href="#"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'th-large']" />
            <span>Applications</span>
          </b-list-group-item>
          <b-list-group-item
            href="#"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'users']" />
            <span>Users</span>
          </b-list-group-item>
          <b-list-group-item
            href="#"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'hat-cowboy']" />
            <span>Roles</span>
          </b-list-group-item>
          <b-list-group-item
            href="#"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'lock']" />
            <span>Permissions</span>
          </b-list-group-item>
          <b-list-group-item
            href="#"
            class="p-2 border-0 text-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'magic']" />
            <span>Automation</span>
          </b-list-group-item>
          <b-list-group-item
            class="p-2 border-0 bg-dark text-white text-right switcher position-absolute"
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
        <b-spinner />
        Loading content
      </div>
      <div
        class="right-sidebar overflow-auto h-100 p-2 pb-5"
      >
        right sidebar
      </div>
    </b-row>
  </b-container>
</template>

<script>

export default {
  data () {
    return {
      showLeftSidebar: true,
    }
  },
  computed: {
    leftSidebarClass () {
      return {
        minified: this.showLeftSidebar,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.left-sidebar,
.right-sidebar {
  width: $sidebar-width;
}

.left-sidebar {
  transition: all 0.3s ease;
  &.minified {
    width: 50px;
    span {
      opacity: 0;
      transition: all 0.5s ease;
    }
    .switcher {
      width: auto;
    }
    .fa-angle-double-left {
      transform: rotate(180deg);
    }
  }
}
.svg-inline--fa {
  width: 30px;
}
.switcher {
  bottom: 0;
  cursor: pointer;
}
</style>
