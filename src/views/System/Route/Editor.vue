<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <span
        class="text-nowrap"
      >
        <b-button
          v-if="routeID && canCreate"
          variant="primary"
          :to="{ name: 'system.route.new' }"
        >
          {{ $t('new') }}
        </b-button>
        <c-permissions-button
          v-if="routeID && canGrant"
          :title="route.endpoint"
          :target="route.endpoint"
          :resource="'system:route:' + routeID"
          button-variant="light"
          class="ml-2"
        >
          <font-awesome-icon :icon="['fas', 'lock']" />
          {{ $t('permissions') }}
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
      :processing="stepper.processing"
      :success="stepper.success"
      :route-functions="routeFunctions"
      @submit="onFunctionsSubmit"
    />
  </b-container>
</template>
<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CRouteEditorInfo from 'corteza-webapp-admin/src/components/Route/CRouteEditorInfo'
import CFunctionsStepper from 'corteza-webapp-admin/src/components/Route/CFunctionsStepper'

export default {
  components: {
    CRouteEditorInfo,
    CFunctionsStepper,
  },

  i18nOptions: {
    namespaces: [ 'system.routes' ],
    keyPrefix: 'editor',
  },

  mixins: [
    editorHelpers,
  ],

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
      canCreate: false,
      canGrant: false,
      routeFunctions: [],

      info: {
        processing: false,
        success: false,
      },
      stepper: {
        processing: false,
        success: false,
      },
    }
  },

  watch: {
    routeID: {
      immediate: true,
      handler () {
        this.fetchEffective()
        if (this.routeID) {
          this.fetchRoute()
        } else {
          this.route = {}
        }
      },
    },
  },
  methods: {
    fetchRoute () {
      this.incLoader()

      this.$SystemAPI.routeRead({ routeID: this.routeID, incFlags: 1 })
        .then(api => {
          this.route = api
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    fetchEffective () {
      this.incLoader()

      this.$SystemAPI.permissionsEffective()
        .then(rules => {
          // TODO add permissions for routes
          this.canCreate = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'application.create').allow
          this.canGrant = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'grant').allow
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onInfoSubmit (route) {
      this.info.processing = true
      if (this.routeID) {
        this.$SystemAPI.routeUpdate(route)
          .then(() => {
            this.animateSuccess('info')
            this.fetchRoute()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$SystemAPI.routeCreate(route)
          .then(({ routeID }) => {
            this.animateSuccess('info')
            this.$router.push({ name: 'system.route.edit', params: { routeID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },
    onFunctionsSubmit (steps) {
      if (this.routeID) {
        steps.forEach(step => {
          step.functions.forEach(func => {
            this.stepper.processing = true
            func.params = [...func.params.map(p => {
              return { [p.label]: p.value }
            })]
            console.log(func)
            if (func) {
              this.$SystemAPI.functionCreate({ ...func, route: this.routeID })
                .then(() => {
                  this.animateSuccess('stepper')
                })
                .catch(this.stdReject)
                .finally(() => {
                  this.stepper.processing = false
                })
            }
          })
        })
      }
    },

    fetchFunctions () {
      this.incLoader()

      this.$SystemAPI.functionList({ routeID: this.routeID })
        .then(api => {
          this.routeFunctions = api
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onFunctionDelete (functionID) {
      this.incLoader()

      this.$SystemAPI.routeDelete({ functionID: functionID })
        .then(() => {
          console.log('Function deleted successfuly!')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },
    onInfoDelete () {
      this.incLoader()

      if (this.route.deletedAt) {
        this.$SystemAPI.routeUndelete({ routeID: this.routeID })
          .then(() => {
            this.fetchRoute()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.routeDelete({ routeID: this.routeID })
          .then(() => {
            this.fetchRoute()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },
  },
}
</script>
