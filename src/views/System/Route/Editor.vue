<template>
  <b-container class="py-3">
    <c-content-header :title="$t('title')">
      <span class="text-nowrap">
        <b-button
          v-if="routeID && canCreate"
          variant="primary"
          :to="{ name: 'system.route.new' }"
        >
          {{ $t("new") }}
        </b-button>
        <c-permissions-button
          v-if="routeID && canGrant"
          :title="route.endpoint"
          :target="route.endpoint"
          :resource="'corteza::system:apigw-route/'+routeID"
          button-variant="light"
          class="ml-2"
        >
          <font-awesome-icon :icon="['fas', 'lock']" />
          {{ $t("permissions") }}
        </c-permissions-button>
      </span>
    </c-content-header>

    <c-route-editor-info
      :route="route"
      :processing="info.processing"
      :success="info.success"
      :can-create="canCreate"
      @submit="onInfoSubmit"
      @delete="onInfoDelete"
    />
    <c-functions-stepper
      v-if="routeID"
      ref="stepper"
      :processing="stepper.processing"
      :success="stepper.success"
      :functions.sync="functions"
      :functions-to-delete.sync="functionsToDelete"
      :available-functions="availableFunctions"
      :steps="steps"
      @submit="onFunctionsSubmit"
    />
  </b-container>
</template>
<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CRouteEditorInfo from 'corteza-webapp-admin/src/components/Route/CRouteEditorInfo'
import CFunctionsStepper from 'corteza-webapp-admin/src/components/Route/CFunctionsStepper'
import { mapGetters } from 'vuex'

export default {
  components: {
    CRouteEditorInfo,
    CFunctionsStepper,
  },

  i18nOptions: {
    namespaces: ['system.routes'],
    keyPrefix: 'editor',
  },

  mixins: [editorHelpers],

  props: {
    routeID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      route: {},

      info: {
        processing: false,
        success: false,
      },
      stepper: {
        processing: false,
        success: false,
      },
      functionsToDelete: [],
      functions: [],
      availableFunctions: [],
      steps: [],
    }
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),
    canCreate () {
      return true
    },
    canGrant () {
      return true
    },
    canPin () {
      return true
    },
  },

  watch: {
    routeID: {
      immediate: true,
      handler () {
        if (this.routeID) {
          this.fetchSteps()
          this.fetchRoute()
          this.fetchAllAvailableFunctions()
          this.fetchFunctions()
        } else {
          this.route = {}
        }
      },
    },
  },
  methods: {
    fetchRoute () {
      this.incLoader()

      this.$SystemAPI
        .apigwRouteRead({ routeID: this.routeID, incFlags: 1 })
        .then((api) => {
          this.route = api
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onInfoSubmit (route) {
      this.info.processing = true
      if (this.routeID) {
        this.$SystemAPI
          .apigwRouteUpdate(route)
          .then(() => {
            this.animateSuccess('info')
            this.fetchRoute()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$SystemAPI
          .apigwRouteCreate(route)
          .then(({ routeID }) => {
            this.animateSuccess('info')
            this.$router.push({
              name: 'system.route.edit',
              params: { routeID },
            })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },
    onFunctionsSubmit () {
      if (this.functionsToDelete.length) {
        this.deleteFunctions(this.functionsToDelete)
      }
      if (this.routeID) {
        this.functions.forEach(({ ...func }, index) => {
          this.stepper.processing = true
          func.params = this.encodeParams(func.params)
          func.weight = func.weight.toString()
          if (func.updated) {
            if (func.functionID) {
              this.updateFunction(func, index)
            } else {
              this.createFunction(func, index)
            }
          }
        })
      }
    },

    createFunction (func, index) {
      this.$SystemAPI
        .apigwFunctionCreate({ ...func, routeID: this.routeID })
        .then(({ functionID }) => {
          this.animateSuccess('stepper')
          this.functions[index].updated = false
          this.functions[index].functionID = functionID
        })
        .catch(this.stdReject)
        .finally(() => {
          this.stepper.processing = false
        })
    },

    updateFunction (func, index) {
      this.$SystemAPI
        .apigwFunctionUpdate({ ...func, routeID: this.routeID })
        .then(() => {
          this.animateSuccess('stepper')
          this.functions[index].updated = false
        })
        .catch(this.stdReject)
        .finally(() => {
          this.stepper.processing = false
        })
    },

    deleteFunctions (functionsToDelete) {
      functionsToDelete.forEach((functionID, index) => {
        this.$SystemAPI
          .apigwFunctionDelete({ functionID: functionID })
          .then(() => {
            this.animateSuccess('stepper')
            this.functionsToDelete.splice(index, 1)
          })
          .catch(this.stdReject)
          .finally(() => {
            this.stepper.processing = false
          })
      })
    },

    fetchFunctions () {
      this.incLoader()
      this.$SystemAPI
        .apigwFunctionList({ routeID: this.routeID })
        .then((api) => {
          this.setRouteFunctions(api.set)
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    setRouteFunctions (routeFunctions = []) {
      this.functions = (routeFunctions || []).map((func) => {
        const f = { ...this.availableFunctions.find((af) => af.ref === func.ref) }
        f.params = this.decodeParams({ ...func.params })
        f.weight = parseInt(func.weight)
        f.functionID = func.functionID
        return { ...f }
      })
      this.$nextTick(() => {
        this.$refs.stepper.selectFirstOrDefaultFunction()
      })
    },

    decodeParams (params) {
      return Object.entries(params).map((p) => {
        return { label: p[0], value: p[1], type: 'string' }
      })
    },

    encodeParams (params) {
      return params.reduce(function (result, p) {
        result[p.label] = p.value
        return result
      }, {})
    },

    fetchAllAvailableFunctions () {
      this.incLoader()
      this.$SystemAPI
        .apigwFunctionDefinitions()
        .then((api) => {
          this.availableFunctions = api.map((f) => {
            return { name, ...f, ref: f.name }
          })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onInfoDelete () {
      this.incLoader()

      if (this.route.deletedAt) {
        this.$SystemAPI
          .apigwRouteUndelete({ routeID: this.routeID })
          .then(() => {
            this.fetchRoute()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI
          .apigwRouteDelete({ routeID: this.routeID })
          .then(() => {
            this.fetchRoute()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },

    fetchSteps () {
      this.incLoader()
      this.steps = ['verifier', 'validator', 'processer', 'expediter']
    },
  },
}
</script>
