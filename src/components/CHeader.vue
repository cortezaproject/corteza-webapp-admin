<template>
  <b-container fluid>
    <b-row class="m-0">
      <h1>
        {{ title }}
        <b-badge
          v-if="badge"
          class="rounded-pill"
        >
          {{ badge }}
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

    badge: {
      type: [String, Number],
      default: 0,
    },
  },
}
</script>

<style scoped>

</style>
