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
              :avaliable-functions="filterAvaliableFunctionsByKind(step.kind)"
              @addFunction="onAddFunction"
            />
            <c-function
              :func="getSelectedFunction()"
              @updateFunction="onUpdateFunction"
            />
          </div>
          <c-functions-table
            class="w-60 ml-5"
            :avaliable-functions="filterAvaliableFunctionsByKind(step.kind)"
            :functions="filterSelectedFunctionsByKind(step.kind)"
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
    }
  },

  computed: {
    disabled () {
      // return !this.steps.find(step => step.functions.length > 0)
      return !this.functions.length
    },
  },

  created () {
    this.avaliableFunctions = this.getAvaliableFunctionsStatic()
  },

  methods: {
    onAddFunction (func) {
      if (!this.functions.find(f => f.ref === func.ref)) {
        this.functions.push({ ...func })
      }
      this.selectedFunction = { ...func }
    },
    onUpdateFunction (func) {
      this.functions[this.functions.findIndex(f => f.ref === func.ref)] = { ...func }
    },
    onRemoveFunction (func) {
      if (func.functionID) {
        this.deletedFunctions.push(func.functionID)
      }
      this.functions.splice(this.functions.findIndex(f => f.ref === func.ref), 1)
    },

    onFunctionSelect (func = {}) {
      this.selectedFunction = { ...func }
    },

    getSelectedFunction () {
      return this.selectedFunction ? this.selectedFunction : null
    },

    filterAvaliableFunctionsByKind (kind) {
      return (this.avaliableFunctions || []).filter(f => {
        return f.kind === kind
      })
    },

    filterSelectedFunctionsByKind (kind) {
      return (this.functions || []).filter(f => {
        return f.kind === kind
      })
    },

    onActivateTab (index) {
      this.selectedFunction = (this.functions || []).some(f => f.step === index) ? this.functions.find(f => f.step === index) : null
    },

    getAvaliableFunctionsStatic () {
      return [
        {
          'ref': 'verifierQueryParam',
          'kind': 'verifier',
          'step': 0,
          'label': 'Verifier Query Param',
          'scope': [
            {
              'type': 'string',
              'label': 'query',
              'example': "query.testParamFromUrl = 'static value'",
            },
          ],
          'params': [
            {
              'label': 'expr',
              'type': 'expr',
              'options': {},
            },
          ],
        },
        {
          'ref': 'verifierOrigin',
          'kind': 'verifier',
          'step': 0,
          'label': 'Verifier Origin',
          'scope': [
            {
              'type': 'string',
              'label': 'request',
              'example': "request.origin = '192.168.0.1'",
            },
          ],
          'params': [
            {
              'label': 'expr',
              'type': 'expr',
              'options': {},
            },
          ],
        },
        {
          'ref': 'verifierOauth2Token',
          'kind': 'verifier',
          'step': 0,
          'label': 'OAUTH2 token matcher',
          'params': [
            {
              'label': 'expr',
              'type': 'expr',
              'options': {},
            },
          ],
        },
        {
          'ref': 'verifierAuthHeader',
          'kind': 'verifier',
          'step': 0,
          'label': 'Verifier Auth Header',
          'scope': [
            {
              'type': 'string',
              'label': 'request',
              'example': "request.authHeader = 'base64(user:pass)'",
            },
          ],
          'params': [
            {
              'label': 'expr',
              'type': 'expr',
              'options': {},
            },
          ],
        },
        {
          'ref': 'validatorRateLimit',
          'kind': 'validator',
          'step': 1,
          'scope': [
            {
              'type': 'string',
              'label': 'request',
              'example': 'request.limit = 1',
            },
          ],
          'label': 'Rate limiting validator',
          'params': [
            {
              'label': 'expr',
              'type': 'expr',
              'options': {},
            },
          ],
        },
        {
          'ref': 'validatorSchema',
          'kind': 'validator',
          'step': 1,
          'label': 'Schema validator',
          'params': [
            {
              'label': 'schema',
              'type': 'textarea',
              'options': {
                'rteSettingsExample': '',
              },
            },
          ],
        },
        {
          'ref': 'validatorContentLength',
          'kind': 'validator',
          'step': 1,
          'label': 'Content length validator',
          'scope': [
            {
              'type': 'string',
              'label': 'request',
              'example': 'request.length > 1024',
            },
          ],
          'params': [
            {
              'label': 'expr',
              'type': 'expr',
              'options': {
                'placeholder': 'expression placeholder here...',
              },
            },
          ],
        },
        {
          'ref': 'processerWorkflow',
          'kind': 'processer',
          'step': 2,
          'label': 'Workflow processer',
          'params': [
            {
              'label': 'workflow',
              'type': 'workflow',
              'options': {
                'options': [],
              },
            },
          ],
        },
        {
          'ref': 'expediterRedirection',
          'kind': 'expediter',
          'step': 3,
          'label': 'Redirection expediter',
          'params': [
            {
              'label': 'location',
              'type': 'string',
              'options': [],
            },
            {
              'label': 'status',
              'type': 'status',
              'options': {
                'options': [
                  'http 500',
                  'http 404',
                ],
              },
            },
          ],
        },
        {
          'ref': 'expediterJsonEncoder - TODO',
          'kind': 'expediter',
          'step': 3,
          'label': 'Json encoder expediter',
        },
        {
          'ref': 'expediterCompresser',
          'kind': 'expediter',
          'step': 3,
          'label': 'Gzip compresser expediter',
          'params': [
            {
              'label': 'setHeaders',
              'type': 'bool',
            },
            {
              'label': 'level',
              'type': 'int',
            },
          ],
        },
      ]
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
    },
    decodeParams (params) {
      return Object.entries(params).map(p => {
        return { label: p[0], value: p[1], type: 'string' }
      })
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
