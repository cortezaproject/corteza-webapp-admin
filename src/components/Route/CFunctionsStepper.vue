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
          <c-functions-table
            class="w-60"
            :avaliable-functions="filterAvaliableFunctionsByKind(step.kind)"
            :functions="step.functions"
            @functionSelect="onFunctionSelect"
          />
          <c-function
            class="w-35 ml-5"
            :func="getSelectedFunction()"
          />
        </section>
      </b-tab>
    </b-tabs>
    <c-submit-button
      class="float-right mt-3"
      :processing="processing"
      :success="success"
      :disabled="disabled"
      @submit="$emit('submit', steps)"
    />
  </b-card>
</template>
<script>
import CFunction from 'corteza-webapp-admin/src/components/Route/CFunction'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import CFunctionsTable from 'corteza-webapp-admin/src/components/Route/CFunctionsTable'

export default {
  components: {
    CFunction,
    CSubmitButton,
    CFunctionsTable,
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

    routeFunctions: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      route: {},
      steps: [
        {
          title: 'Access control',
          kind: 'verifier',
          functions: [],
        },
        {
          title: 'Validation',
          kind: 'validator',
          functions: [],
        },
        {
          title: 'Processing',
          kind: 'processer',
          functions: [],
        },
        {
          title: 'Expediting',
          kind: 'expediter',
          functions: [],
        },
      ],
      selectedFunction: null,
      avaliableFunctions: null,
    }
  },

  computed: {
    disabled () {
      return !this.steps.find(step => step.functions.length > 0)
    },
  },

  created () {
    this.avaliableFunctions = this.getAvaliableFunctions()
  },

  methods: {
    onFunctionSelect (func = {}) {
      this.selectedFunction = { ...func }
    },
    getSelectedFunction () {
      return this.selectedFunction ? this.selectedFunction : null
    },
    filterAvaliableFunctionsByKind (kind) {
      return this.avaliableFunctions.filter(f => {
        return f.kind === kind
      })
    },
    onActivateTab (index) {
      this.selectedFunction = this.steps[index].functions.length > 0 ? this.steps[index].functions[0] : null
    },
    getAvaliableFunctions () {
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
    getRouteFunctions () {
      // Remove step functions from steps
      // Use routeFunctions

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
