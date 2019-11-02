<template>
  <b-container fluid>
    <b-row class="m-0">
      <h1>
        {{ title }}
        <b-badge
          v-if="total"
          class="rounded-pill"
        >
          {{ total }}
        </b-badge>
      </h1>
    </b-row>
    <b-row class="m-0">
      <slot />
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'CHeader',

  props: {
    title: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style scoped>

</style>
