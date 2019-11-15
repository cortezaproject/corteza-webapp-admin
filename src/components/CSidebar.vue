<template>
  <aside
    class="sidebar bv-d-sm-down-none"
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

  .switcher {
    z-index: 9999;
    bottom: 0;
    cursor: pointer;
  }

  &.minified {
    width: 35px;
    min-width: 35px;

    /deep/ .label,
    small {
      opacity: 0;
      transition: all 0.5s ease;
    }

    .switcher {
      transform: rotate(180deg);
    }
  }
}

</style>
