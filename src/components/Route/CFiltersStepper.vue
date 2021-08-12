<template>
  <b-card
    class="apigw shadow-sm mt-3"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit', route)"
    >
      <b-tabs
        active-nav-item-class="active-tab border-0 text-primary bg-white"
        class="border-0 text-primary font-weight-bold"
        content-class="border-bottom"
      >
        <b-tab
          v-for="(step, index) in steps"
          :key="index"
          class="border-0"
          :title="$t(`filters.step_title.${step}`)"
          @click="onActivateTab(index)"
        >
          <b-row class="d-flex flex-column w-100 m-0">
            <div class="d-flex p-3">
              <c-filters-dropdown
                class="h-fit-content"
                :available-filters="getAvailableFiltersByStep"
                :filters="getSelectedFiltersByStep"
                @addFilter="onAddFilter"
                @filterSelect="onFilterSelect"
              />
              <b-button
                ref="deleteButton"
                :disabled="disabledRemoveButton"
                class="ml-2"
                variant="light"
                @click="onRemoveCheckedFilters()"
              >
                {{ $t('filters.list.remove') }}
              </b-button>
            </div>
            <c-filters-table
              ref="filterTable"
              :filters="getSelectedFiltersByStep"
              :selected-row="step.selectedRow"
              :step="index"
              @filterSelect="onFilterSelect"
              @removeFilter="onRemoveFilter"
              @sortFilters="onSortFilters"
              @updateFilter="onUpdateFilter"
            />
          </b-row>
        </b-tab>
      </b-tabs>
    </b-form>
    <template #header>
      <h3 class="m-0">
        {{ $t('filters.title') }}
      </h3>
    </template>
    <c-submit-button
      class="float-right mt-3"
      :processing="processing"
      :success="success"
      :disabled="disabled"
      @submit="$emit('submit')"
    />
  </b-card>
</template>
<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import CFiltersTable from 'corteza-webapp-admin/src/components/Route/CFiltersTable'
import CFiltersDropdown from 'corteza-webapp-admin/src/components/Route/CFiltersDropdown'

const mapKindToStep = {
  prefilter: 0,
  processer: 1,
  postfilter: 2,
}

export default {
  components: {
    CSubmitButton,
    CFiltersTable,
    CFiltersDropdown,
  },
  props: {
    processing: {
      type: Boolean,
      value: false,
    },
    success: {
      type: Boolean,
      value: false,
    },
    filters: {
      type: Array,
      required: true,
    },
    filtersToDelete: {
      type: Array,
      required: true,
    },
    availableFilters: {
      type: Array,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      selectedFilter: null,
      selectedTab: 0,
    }
  },

  computed: {
    disabled () {
      return false
      // return !(this.filters.some(f => f.updated === true) || this.filtersToDelete.length)
    },

    getSelectedFilter () {
      return this.selectedFilter ? this.selectedFilter : null
    },

    getAvailableFiltersByStep () {
      return (this.availableFilters || []).filter((f) => {
        return mapKindToStep[f.kind] === this.selectedTab
      })
    },

    getSelectedFiltersByStep () {
      return (this.filters || []).filter((f) => {
        return mapKindToStep[f.kind] === this.selectedTab
      }).sort((a, b) => a.weight - b.weight)
    },

    disabledRemoveButton () {
      return !this.filters.some(f => (f.options || { checked: false }).checked === true)
    },
  },

  methods: {
    onAddFilter (func) {
      if (!this.filters.find((f) => f.ref === func.ref)) {
        this.filters.push({ ...func, weight: this.getSelectedFiltersByStep.length })
      }
      this.selectedFilter = { ...func }
      this.$refs.filterTable[this.selectedTab].onSelectLastRow()
    },

    onUpdateFilter (func) {
      const index = this.filters.findIndex((f) => f.ref === func.ref)
      if (index >= 0) {
        this.$set(this.filters[index], 'params', func.params)
        this.$set(this.filters[index], 'updated', true)
      }
    },

    onSortFilters (sortedFilters) {
      this.filters.forEach(func => {
        func.weight = sortedFilters.findIndex((f) => f.ref === func.ref)
        func.updated = true
      })
      this.filters.sort((a, b) => a.weight - b.weight)
    },

    onRemoveFilter (func) {
      if (func.filterID) {
        this.filtersToDelete.push(func.filterID)
      }
      this.filters.splice(this.filters.findIndex((f) => f.ref === func.ref), 1)
      this.selectFirstOrDefaultFilter()
    },

    onRemoveCheckedFilters () {
      this.filters.slice().reverse().forEach(f => {
        if (f.options.checked) {
          this.onRemoveFilter(f)
        }
      })
    },

    onFilterSelect (func = {}) {
      this.selectedFilter = { ...func }
    },

    selectFirstOrDefaultFilter () {
      this.selectedFilter = this.getSelectedFiltersByStep.length
        ? this.getSelectedFiltersByStep[0]
        : null
      this.$refs.filterTable[this.selectedTab].onSelectFirstRow()
    },

    onActivateTab (index) {
      this.selectedTab = index
      this.selectFirstOrDefaultFilter()
    },

    isFilterAlreadyAdded () {
      return (this.filters || []).some(
        (f) => f.ref === this.selectedFilter.ref
      )
    },
  },
}
</script>
<style lang="scss" >

.apigw{
  .h-fit-content{
    height: fit-content;
  }
  .active-tab{
    border-bottom: 3px solid $primary !important;
    &:hover{
      border-bottom: 3px solid $primary !important;
      color:$primary !important;
    }
  }
  .nav-link:hover{
    color:$primary;
    border:none;
  }
}
</style>
