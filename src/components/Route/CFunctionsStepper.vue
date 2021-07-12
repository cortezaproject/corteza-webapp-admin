<template>
  <b-card
    class="shadow-sm mt-3"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-tabs
      content-class="border-bottom"
    >
      <b-tab
        v-for="(step, index) in steps"
        :key="index"
        :title="step.title"
        @click="onActivateTab(index)"
      >
        <section class="d-flex w-100">
          <div class="d-flex flex-column w-35">
            <c-functions-dropdown
              :avaliable-functions="getAvaliableFunctionsByStep"
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
          </div>
          <c-functions-table
            ref="functionTable"
            class="w-60 ml-5"
            :avaliable-functions="getAvaliableFunctionsByStep"
            :functions="getSelectedFunctionsByStep"
            :selected-row="step.selectedRow"
            @functionSelect="onFunctionSelect"
            @removeFunction="onRemoveFunction"
          />
        </section>
      </b-tab>
    </b-tabs>
    <c-submit-button
      class="float-right mt-3"
      :processing="processing"
      :success="success"
      :disabled="disabled"
      @submit="$emit('submit', [...functions], deletedFunctions)"
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

  },
  data () {
    return {
      route: {},
      steps: [
        {
          title: 'Access control',
          kind: 'verifier',
        },
        {
          title: 'Validation',
          kind: 'validator',
        },
        {
          title: 'Processing',
          kind: 'processer',
        },
        {
          title: 'Expediting',
          kind: 'expediter',
        },
      ],
      selectedFunction: null,
      avaliableFunctions: [],
      deletedFunctions: [],
      functions: [],
      selectedTab: 0,
    }
  },

  computed: {
    disabled () {
      return !this.functions.length
    },

    getSelectedFunction () {
      return this.selectedFunction ? this.selectedFunction : null
    },

    getAvaliableFunctionsByStep () {
      return (this.avaliableFunctions || []).filter(f => {
        return f.step === this.selectedTab
      })
    },

    getSelectedFunctionsByStep () {
      return (this.functions || []).filter(f => {
        return f.step === this.selectedTab
      })
    },
  },

  methods: {
    onAddFunction (func) {
      if (!this.functions.find(f => f.ref === func.ref)) {
        this.functions.push({ ...func })
      }
      this.selectedFunction = { ...func }
      this.$refs.functionTable[this.selectedTab].onSelectLastRow()
    },

    onUpdateFunction (func) {
      this.functions[this.functions.findIndex(f => f.ref === func.ref)] = { ...func }
    },

    onRemoveFunction (func) {
      if (func.functionID) {
        this.deletedFunctions.push(func.functionID)
      }
      this.functions.splice(this.functions.findIndex(f => f.ref === func.ref), 1)
      this.selectFirstOrDefaultFunction()
    },

    onFunctionSelect (func = {}) {
      this.selectedFunction = { ...func }
    },

    selectFirstOrDefaultFunction () {
      this.selectedFunction = this.getSelectedFunctionsByStep.length ? this.getSelectedFunctionsByStep[0] : null
      this.$refs.functionTable[this.selectedTab].onSelectFirstRow()
    },

    onActivateTab (index) {
      this.selectedTab = index
      this.selectFirstOrDefaultFunction()
    },

    setAvaliableFunctions (functions) {
      this.avaliableFunctions = functions.map(f => {
        return { name, ...f, ref: f.name }
      })
    },

    setRouteFunctions (routeFunctions = []) {
      this.functions = (routeFunctions || []).map(func => {
        const f = this.avaliableFunctions.find(af => af.ref === func.ref)
        f.params = this.decodeParams({ ...func.params })
        f.functionID = func.functionID
        return { ...f }
      })
      this.selectFirstOrDefaultFunction()
    },

    decodeParams (params) {
      return Object.entries(params).map(p => {
        return { label: p[0], value: p[1], type: 'string' }
      })
    },

    isFunctionAlreadyAdded () {
      return (this.functions || []).some(f => f.ref === this.selectedFunction.ref)
    },
  },
}
</script>

<style scoped>
.w-35{
  width: 35%;
}
.w-60{
  width: 60%;
}
</style>
