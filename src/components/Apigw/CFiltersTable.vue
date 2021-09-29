<template>
  <div>
    <b-table-simple
      class="filter-table"
      hover
    >
      <b-thead>
        <b-tr>
          <b-th>{{ $t('filters.list.filters') }}</b-th>
          <b-th>{{ $t('filters.list.status') }}</b-th>
          <b-th />
        </b-tr>
      </b-thead>

      <draggable
        v-model="sortableFilters"
        tag="b-tbody"
        @end="checkMove"
      >
        <b-tr
          v-for="(func, index) in sortableFilters"
          :key="index"
          class="pointer"
          :class="[selectedRow===index ? 'row-selected' : 'row-not-selected']"
          @click.stop="onRowClick(func,index)"
        >
          <b-td class="align-baseline">
            {{ func.label }}
          </b-td>
          <b-td class="align-baseline">
            {{ $t('filters.list.active') }}
          </b-td>
          <b-td class="text-right align-baseline">
            <b-button
              variant="danger"
              class="my-1"
              size="sm"
              @click.stop="onRemoveFilter(func)"
            >
              {{ $t('filters.list.remove') }}
            </b-button>
          </b-td>
        </b-tr>
      </draggable>
    </b-table-simple>
    <h6
      v-if="!sortableFilters.length"
      class="d-flex justify-content-center align-items-center mb-3"
    >
      {{ $t('filters.list.noFilters') }}
    </h6>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  props: {
    filters: {
      type: Array,
      required: true,
    },
    step: {
      type: Number,
      default: () => 0,
    },
  },

  data () {
    return {
      selectedRow: 0,
      selectedFilter: {},
    }
  },
  computed: {
    sortableFilters: {
      get: function () {
        return this.filters
      },
      set: function (v) {
        this.$emit('sortFilters', v)
      },
    },
    checkAll: {
      get: function () {
        return this.filters.every(f => f.options.checked === true)
      },
      set: function () {
      },
    },
  },
  methods: {
    onAddFilter (func) {
      if (!this.filters.find(f => f.ref === func.ref)) {
        this.filters.push({ ...func })
      }
      if (this.filters.length === 1) {
        this.$emit('filterSelect', this.filters[0])
      }
    },
    onRemoveFilter (func) {
      this.$emit('removeFilter', func)
    },
    onRowClick (func, index) {
      this.selectedRow = index
      this.$emit('filterSelect', func)
      this.selectedFilter = func
    },
    checkMove (evt) {
      this.selectedRow = evt.newDraggableIndex
      this.$emit('filterSelect', this.sortableFilters[evt.newDraggableIndex])
    },
  },
}
</script>

<style lang="scss">
.filter-table .row-selected{
  background: #F3F3F5;
}
.cursor-default{
  cursor: default;
}
</style>
