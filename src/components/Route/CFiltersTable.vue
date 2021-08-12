<template>
  <div>
    <b-table-simple
      class="filter-table"
      hover
    >
      <b-thead>
        <b-tr>
          <b-th>
            <b-form-checkbox
              v-model="checkAll"
              class="light"
              @change="filterCheckAll()"
            />
          </b-th>
          <b-th>{{ $t('filters.list.filters') }}</b-th>
          <b-th>{{ $t('filters.list.status') }}</b-th>
          <b-th>{{ $t('filters.list.actions') }}</b-th>
        </b-tr>
      </b-thead>

      <draggable
        v-if="sortableFilters.length"
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
          <b-td
            class="cursor-default"
            @click.stop
          >
            <b-form-checkbox
              v-model="func.options.checked"
              class="light"
              @change.stop="filterChecked(index)"
            />
          </b-td>
          <b-td>
            {{ func.label }}
          </b-td>
          <b-td>{{ $t('filters.list.active') }}</b-td>
          <b-td>
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
      <b-tbody v-else>
        <b-tr class="mt-2 text-danger">
          {{ $t('filters.list.noFiltersMsg') }}
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <c-filter-modal
      :func="selectedFilter"
      :step="step"
      @addFilter="onAddFilter"
      @updateFilter="onUpdateFilter"
    />
  </div>
</template>

<script>
import CFilterModal from 'corteza-webapp-admin/src/components/Route/CFilterModal'
import draggable from 'vuedraggable'
export default {
  components: {
    CFilterModal,
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

    onUpdateFilter (func) {
      this.$emit('updateFilter', func)
    },
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
      this.$bvModal.show('filterModal' + this.step)
    },
    onSelectLastRow () {
      this.selectedRow = this.filters.length
    },
    onSelectFirstRow () {
      this.selectedRow = 0
    },
    checkMove (evt) {
      this.selectedRow = evt.newDraggableIndex
      this.$emit('filterSelect', this.sortableFilters[evt.newDraggableIndex])
    },
    filterChecked (index) {
      this.filters[index].options.checked = !this.filters[index].options.checked
    },
    filterCheckAll () {
      if (this.checkAll) {
        this.filters.forEach(f => { f.options.checked = false })
      } else {
        this.filters.forEach(f => { f.options.checked = true })
      }
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
