<template>
  <div
    class="form d-flex flex-column"
  >
    <c-filter-params
      :params="func.params"
      :label="func.label"
      @paramsUpdated="onParamsUpdated"
    />
    <b-button
      variant="light"
      :disabled="added"
      class="mb-2 d-flex mr-auto align-items-center"
      size="md"
      @click="onFilterAdd"
    >
      <span>
        <font-awesome-icon
          :icon="['fas', 'plus']"
          size="sm"
          class="mr-1"
        />
        {{ $t('filters.add') }}
      </span>
    </b-button>
  </div>
</template>
<script>
import CFilterParams from 'corteza-webapp-admin/src/components/Route/CFilterParams'

export default {
  components: {
    CFilterParams,
  },
  props: {
    func: {
      type: Object,
      default: () => ({}),
    },
    added: {
      type: Boolean,
      value: false,
    },
  },
  data () {
    return {
    }
  },
  methods: {
    onParamsUpdated () {
      this.$emit('updateFilter', { ...this.func, updated: true })
    },
    onFilterAdd () {
      this.$emit('addFilter', { ...this.func, updated: true })
    },
  },
}
</script>
