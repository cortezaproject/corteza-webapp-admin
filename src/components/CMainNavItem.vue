<template>
  <b-list-group-item
    tag="li"
    class="p-2 border-0 text-nowrap bg-transparent"
  >
    <router-link
      :to="to"
      class="nav-item"
      active-class="text-primary"
    >
      <font-awesome-icon
        :icon="icon"
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

.nav-item {
  color: black;
}
</style>
