<template>
  <b-dropdown
    :text="$t('filters.addFilter')"
    class="min-content"
    variant="primary"
  >
    <template v-if="filterList.length">
      <b-dropdown-item
        v-for="(func, index) in filterList"
        :key="index"
        :disabled="func.disabled"
        href="#"
        @click="onAddFilter(func)"
      >
        {{ func.label }}
      </b-dropdown-item>
    </template>
    <b-dropdown-item
      v-else
      disabled
      href="#"
    >
      <span class="text-danger">
        {{ $t('filters.filterListEmpty') }}
      </span>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  props: {
    availableFilters: {
      type: Array,
      required: true,
    },
    filters: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filterList () {
      return this.availableFilters.map(f => {
        return { ...f, disabled: !!(this.filters || []).some(func => func.ref === f.ref) }
      })
    },
  },
  methods: {
    onAddFilter (func) {
      const add = { ...func, params: [] }
      for (const p of func.params) {
        add.params.push({ ...p, options: { ...p.options } })
      }

      this.$emit('addFilter', add)
    },
  },
}
</script>

<style scoped>
.min-content{
    max-width: min-content;
}
</style>
