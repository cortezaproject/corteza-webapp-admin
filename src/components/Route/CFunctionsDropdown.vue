<template>
  <b-dropdown
    :text="$t('functions.addFunction')"
    class="min-content"
    variant="light"
  >
    <template v-if="functionList.length">
      <b-dropdown-item
        v-for="(func, index) in functionList"
        :key="index"
        :disabled="func.disabled"
        href="#"
        @click="onAddFunction(func)"
      >
        {{ func.label }}
      </b-dropdown-item>
    </template>
    <b-dropdown-item
      v-else
      disabled="true"
      href="#"
    >
      <span class="text-danger">
        {{ $t('functions.functionListEmpty') }}
      </span>
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
    functions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    functionList () {
      return this.availableFunctions.map(f => {
        return { ...f, disabled: !!(this.functions || []).some(func => func.ref === f.ref) }
      })
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
