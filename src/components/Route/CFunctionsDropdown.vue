<template>
  <b-dropdown
    text="Add function"
    class="mt-3 dropdown-function min-content"
    variant="light"
  >
    <b-dropdown-item
      v-for="(func, index) in avaliableFunctions"
      :key="index"
      href="#"
      @click="onAddFunction(func)"
    >
      {{ func.label }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  props: {
    avaliableFunctions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onAddFunction (func) {
      this.$emit('addFunction', func)
    },
  },
}
</script>

<style scoped>
.min-content{
    max-width: min-content;
}
</style>
