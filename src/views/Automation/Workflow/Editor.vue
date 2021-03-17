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
          v-if="workflowID && canCreate"
          variant="primary"
          :to="{ name: 'automation.workflow.new' }"
        >
          {{ $t('new') }}
        </b-button>
        <c-permissions-button
          v-if="workflowID && canGrant"
          :title="workflow.handle"
          :target="workflow.handle"
          :resource="'automation:workflow:'+workflowID"
          button-variant="light"
          class="ml-2"
        >
          <font-awesome-icon :icon="['fas', 'lock']" />
          {{ $t('permissions') }}
        </c-permissions-button>
      </span>
    </c-content-header>

    <c-workflow-editor-info
      :workflow="workflow"
      :processing="info.processing"
      :success="info.success"
      :can-create="canCreate"
      @submit="onInfoSubmit"
      @delete="onDelete"
    />

    <c-workflow-editor-triggers
      v-if="workflowID"
      :triggers="triggers"
      :processing="info.processing"
      :success="info.success"
    />
  </b-container>
</template>
<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CWorkflowEditorInfo from 'corteza-webapp-admin/src/components/Workflow/CWorkflowEditorInfo'
import CWorkflowEditorTriggers from 'corteza-webapp-admin/src/components/Workflow/CWorkflowEditorTriggers'

export default {
  components: {
    CWorkflowEditorInfo,
    CWorkflowEditorTriggers,
  },

  i18nOptions: {
    namespaces: [ 'automation.workflows' ],
    keyPrefix: 'editor',
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    workflowID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      workflow: {},
      triggers: [],

      canCreate: false,
      canGrant: false,

      info: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    userID () {
      if (this.$auth.user) {
        return this.$auth.user.userID
      }
      return undefined
    },
  },

  watch: {
    workflowID: {
      immediate: true,
      handler () {
        this.fetchEffective()
        if (this.workflowID) {
          this.fetchWorkflow()
          this.fetchTriggers()
        } else {
          this.workflow = {
            ownedBy: this.userID,
            runAs: this.userID,
            enabled: true,
            meta: {
              name: '',
            },
          }
        }
      },
    },
  },

  methods: {
    fetchWorkflow () {
      this.incLoader()

      this.$AutomationAPI.workflowRead({ workflowID: this.workflowID })
        .then(this.prepare)
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    fetchTriggers () {
      this.incLoader()

      this.$AutomationAPI.triggerList({ workflowID: this.workflowID, disabled: 1 })
        .then(({ set = [] }) => { this.triggers = set })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    fetchEffective () {
      this.incLoader()

      this.$AutomationAPI.permissionsEffective()
        .then(rules => {
          this.canCreate = rules.find(({ resource, operation }) => resource === 'automation' && operation === 'workflow.create').allow
          this.canGrant = rules.find(({ resource, operation }) => resource === 'automation' && operation === 'grant').allow
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onInfoSubmit (workflow) {
      this.info.processing = true

      this.workflow.handle = this.workflow.meta.name.trim(' ').split(' ').map(s => {
        return s[0].toUpperCase() + s.slice(1).toLowerCase()
      }).join('')

      if (this.workflowID) {
        this.$AutomationAPI.workflowUpdate(workflow)
          .then(() => {
            this.animateSuccess('info')
            this.fetchWorkflow()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$AutomationAPI.workflowCreate(workflow)
          .then(({ workflowID }) => {
            this.animateSuccess('info')
            this.$router.push({ name: 'automation.workflow.edit', params: { workflowID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },

    onDelete () {
      this.incLoader()

      if (this.workflow.deletedAt) {
        this.$AutomationAPI.workflowUndelete({ workflowID: this.workflowID })
          .then(() => {
            this.fetchWorkflow()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$AutomationAPI.workflowDelete({ workflowID: this.workflowID })
          .then(() => {
            this.fetchWorkflow()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },

    prepare (workflow = {}) {
      this.workflow = workflow
    },
  },
}
</script>
