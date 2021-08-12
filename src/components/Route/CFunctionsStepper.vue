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
          :title="$t(`functions.step_title.${step}`)"
          @click="onActivateTab(index)"
        >
          <b-row class="d-flex flex-column w-100 m-0">
            <div class="d-flex p-3">
              <c-functions-dropdown
                class="h-fit-content"
                :available-functions="getAvailableFunctionsByStep"
                :functions="getSelectedFunctionsByStep"
                @addFunction="onAddFunction"
                @functionSelect="onFunctionSelect"
              />
              <b-button
                ref="deleteButton"
                :disabled="disabledRemoveButton"
                class="ml-2"
                variant="light"
                @click="onRemoveCheckedFunctions()"
              >
                {{ $t('functions.list.remove') }}
              </b-button>
            </div>
            <c-functions-table
              ref="functionTable"
              :functions="getSelectedFunctionsByStep"
              :selected-row="step.selectedRow"
              :step="index"
              @functionSelect="onFunctionSelect"
              @removeFunction="onRemoveFunction"
              @sortFunctions="onSortFunctions"
              @updateFunction="onUpdateFunction"
            />
          </b-row>
        </b-tab>
      </b-tabs>
    </b-form>
    <template #header>
      <h3 class="m-0">
        {{ $t('functions.title') }}
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
import CFunctionsTable from 'corteza-webapp-admin/src/components/Route/CFunctionsTable'
import CFunctionsDropdown from 'corteza-webapp-admin/src/components/Route/CFunctionsDropdown'

export default {
  components: {
    CSubmitButton,
    CFunctionsTable,
    CFunctionsDropdown,
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
    functions: {
      type: Array,
      required: true,
    },
    functionsToDelete: {
      type: Array,
      required: true,
    },
    availableFunctions: {
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
      selectedFunction: null,
      selectedTab: 0,
    }
  },

  computed: {
    disabled () {
      return !(this.functions.some(f => f.updated === true) || this.functionsToDelete.length)
    },

    getSelectedFunction () {
      return this.selectedFunction ? this.selectedFunction : null
    },

    getAvailableFunctionsByStep () {
      return (this.availableFunctions || []).filter((f) => {
        return f.step === this.selectedTab
      })
    },

    getSelectedFunctionsByStep () {
      return (this.functions || []).filter((f) => {
        return f.step === this.selectedTab
      }).sort((a, b) => a.weight - b.weight)
    },

    disabledRemoveButton () {
      return !this.functions.some(f => f.options.checked === true)
    },
  },

  methods: {
    onAddFunction (func) {
      if (!this.functions.find((f) => f.ref === func.ref)) {
        this.functions.push({ ...func, weight: this.getSelectedFunctionsByStep.length })
      }
      this.selectedFunction = { ...func }
      this.$refs.functionTable[this.selectedTab].onSelectLastRow()
    },

    onUpdateFunction (func) {
      const index = this.functions.findIndex((f) => f.ref === func.ref)
      if (index >= 0) {
        this.$set(this.functions[index], 'params', func.params)
        this.$set(this.functions[index], 'updated', true)
      }
    },

    onSortFunctions (sortedFunctions) {
      this.functions.forEach(func => {
        func.weight = sortedFunctions.findIndex((f) => f.ref === func.ref)
        func.updated = true
      })
      this.functions.sort((a, b) => a.weight - b.weight)
    },

    onRemoveFunction (func) {
      if (func.functionID) {
        this.functionsToDelete.push(func.functionID)
      }
      this.functions.splice(this.functions.findIndex((f) => f.ref === func.ref), 1)
      this.selectFirstOrDefaultFunction()
    },

    onRemoveCheckedFunctions () {
      this.functions.slice().reverse().forEach(f => {
        if (f.options.checked) {
          this.onRemoveFunction(f)
        }
      })
    },

    onFunctionSelect (func = {}) {
      this.selectedFunction = { ...func }
    },

    selectFirstOrDefaultFunction () {
      this.selectedFunction = this.getSelectedFunctionsByStep.length
        ? this.getSelectedFunctionsByStep[0]
        : null
      this.$refs.functionTable[this.selectedTab].onSelectFirstRow()
    },

    onActivateTab (index) {
      this.selectedTab = index
      this.selectFirstOrDefaultFunction()
    },

    isFunctionAlreadyAdded () {
      return (this.functions || []).some(
        (f) => f.ref === this.selectedFunction.ref
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
