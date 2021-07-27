<template>
  <b-list-group-item
    tag="li"
    class="p-2 border-0 text-nowrap bg-transparent"
  >
    <router-link
      :to="to"
      class="w-100 text-left text-dark text-decoration-none p-0"
      active-class="nav-active"
    >
      <font-awesome-icon
        :icon="icon"
        class="icon"
      />
      <span
        class="label"
        v-html="label"
      />
    </router-link>
  </b-list-group-item>
</template>

<script>
export default {
  name: 'MainNavItem',
  props: {
    label: {
      type: String,
      required: true,
    },
    to: {
      type: Object,
      required: true,
    },
    icon: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.svg-inline--fa {
  width: 30px;
}

.nav-active {
  .label {
    font-family: $semibold;
  }

  .icon {
    color: $primary;
  }
}
</style>
