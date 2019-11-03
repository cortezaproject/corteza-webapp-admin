<template>
  <b-alert
    v-if="!!error"
    show
    variant="danger"
    class="m-2"
  >
    {{ error.message }}
  </b-alert>
</template>

<script>
export default {
  name: 'CAlert',

  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
