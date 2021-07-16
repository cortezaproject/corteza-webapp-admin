<template>
  <b-card
    class="shadow-sm mt-3"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-tabs content-class="border-bottom">
      <b-tab
        v-for="(step, index) in steps"
        :key="index"
        :title="$t(`functions.step_title.${step}`)"
        @click="onActivateTab(index)"
      >
        <section class="d-flex w-100">
          <div class="d-flex flex-column w-35">
            <b-card
              class="shadow-sm mt-5 p-3"
            >
              <c-functions-dropdown
                :available-functions="getAvailableFunctionsByStep"
                @addFunction="onAddFunction"
                @functionSelect="onFunctionSelect"
              />
              <c-function
                v-if="getSelectedFunction"
                :func="selectedFunction"
                :added="isFunctionAlreadyAdded()"
                @addFunction="onAddFunction"
                @updateFunction="onUpdateFunction"
              />
            </b-card>
          </div>

          <div class="d-flex flex-column w-60">
            <b-card
              class="shadow-sm ml-5 mt-5"
              header-bg-variant="primary"
              footer-bg-variant="light"
            >
              <c-functions-table
                ref="functionTable"
                class="w-50"
                :functions="getSelectedFunctionsByStep"
                :selected-row="step.selectedRow"
                @functionSelect="onFunctionSelect"
                @removeFunction="onRemoveFunction"
              />
            </b-card>
          </div>
        </section>
      </b-tab>
    </b-tabs>
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
import CFunction from 'corteza-webapp-admin/src/components/Route/CFunction'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import CFunctionsTable from 'corteza-webapp-admin/src/components/Route/CFunctionsTable'
import CFunctionsDropdown from 'corteza-webapp-admin/src/components/Route/CFunctionsDropdown'

export default {
  components: {
    CFunction,
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
      })
    },
  },

  methods: {
    onAddFunction (func) {
      if (!this.functions.find((f) => f.ref === func.ref)) {
        this.functions.push({ ...func })
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

    onRemoveFunction (func) {
      if (func.functionID) {
        this.functionsToDelete.push(func.functionID)
      }
      this.functions.splice(this.functions.findIndex((f) => f.ref === func.ref), 1)
      this.selectFirstOrDefaultFunction()
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

<style scoped>
.w-35 {
  width: 35%;
}
.w-60 {
  width: 60%;
}
</style>
