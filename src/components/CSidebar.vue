<template>
  <aside
    class="bg-light"
    :class="mainStyleClasses"
  >
    <b-list-group>
      <b-list-group-item
        class="p-2 border-0 bg-dark text-white switcher position-absolute"
        :class="switcherClasses"
        @click="minified=!minified"
      >
        <font-awesome-icon
          :icon="['fas', 'angle-double-' + orientation]"
        />
      </b-list-group-item>
    </b-list-group>
    <slot />
  </aside>
</template>

<script>
export default {
  name: 'CSidebar',

  props: {
    orientation: {
      type: String,
      default: 'left',
    },
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
        [this.orientation]: true,
      }
    },

    switcherClasses () {
      return {
        [this.orientation]: true,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.sidebar {
  width: $sidebar-width;
  min-width: $sidebar-width;
  transition: all 0.3s ease;
  z-index: 10;
}

.switcher {
  bottom: 0;
  cursor: pointer;

  &.right {
    right: 0;
  }
}

.minified {
  .switcher {
    transform: rotate(180deg);
  }

  &.left {
    width: 35px;
    min-width: 35px;

    /deep/ .label {
      opacity: 0;
      transition: all 0.5s ease;
    }
  }

  &.right {
    margin-right: -($sidebar-width);
  }
}
</style>
