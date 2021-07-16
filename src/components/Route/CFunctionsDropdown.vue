<template>
  <b-dropdown
    :text="$t('functions.addFunction')"
    class="mt-3 dropdown-function min-content"
    variant="light"
  >
    <b-dropdown-item
      v-for="(func, index) in availableFunctions"
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
    availableFunctions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onAddFunction (func) {
      this.$emit('functionSelect', func)
    },
  },
}
</script>

<style scoped>
.min-content{
    max-width: min-content;
}
</style>
