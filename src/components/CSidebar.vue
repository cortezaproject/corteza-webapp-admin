<template>
  <div
    class="overflow-auto h-100 pb-5"
    :class="mainStyleClasses"
  >
    <slot />
    <b-list-group>
      <b-list-group-item
        class="p-2 border-0 bg-dark text-white position-absolute switcher"
        :class="switcherClasses"
        @click="minified=!minified"
      >
        {{ minified }}
        <font-awesome-icon
          :icon="['fas', 'angle-double-' + orientation]"
        />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'CSidebar',

  props: {
    orientation: {
      type: String,
      default: 'left',
    },

    // minified: {
    //   type: Boolean,
    //   value: false,
    // }
  },

  data () {
    return {
      minified: false,
    }
  },

  computed: {
    mainStyleClasses () {
      return {
        minified: this.minified,
        [this.orientation + '-sidebar']: true,
      }
    },

    switcherClasses () {
      return {
        [this.orientation + '-switcher']: true,
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
  &.minified {
    margin-right: -($sidebar-width);
    .right-switcher {
      transform: rotate(180deg);
    }
  }
}
.switcher {
  bottom: 0;
  cursor: pointer;
}

.right-switcher {
  right: 0;
}
</style>
