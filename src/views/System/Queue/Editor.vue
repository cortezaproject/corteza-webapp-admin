<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="title"
    >
      <span
        class="text-nowrap"
      >
        <b-button
          v-if="queueID && canCreate"
          variant="primary"
          class="mr-2"
          :to="{ name: 'system.queue.new' }"
        >
          {{ $t('new') }}
        </b-button>
      </span>
    </c-content-header>

    <c-queue-editor-info
      :queue="queue"
      :processing="info.processing"
      :success="info.success"
      :can-create="canCreate"
      :consumers="consumers"
      @delete="onDelete"
      @submit="onSubmit"
    />
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CQueueEditorInfo from 'corteza-webapp-admin/src/components/Queues/CQueueEditorInfo'

export default {
  components: {
    CQueueEditorInfo,
  },

  i18nOptions: {
    namespaces: [ 'system.queues' ],
    keyPrefix: 'editor',
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    queueID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      queue: {},

      consumers: [],

      canCreate: false,

      info: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    title () {
      return this.queue.queueID ? this.$t('title.edit') : this.$t('title.new')
    },
  },

  watch: {
    queueID: {
      immediate: true,
      handler () {
        this.fetchEffective()
        this.fetchQueueConsumers()

        if (this.queueID) {
          this.fetchQueue()
        } else {
          this.queue = {
            meta: {
              poll_delay: '',
              dispatch_events: false,
            },
          }
        }
      },
    },
  },

  methods: {
    fetchQueue () {
      this.incLoader()

      this.$SystemAPI.queuesRead({ queueID: this.queueID })
        .then(q => { this.queue = q })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    fetchQueueConsumers () {
      this.incLoader()

      this.consumers = [
        { value: 'store', text: 'Store' },
        { value: 'eventbus', text: 'Eventbus' },
        { value: 'corteza', text: 'Corteza' },
        { value: 'redis', text: 'Redis' },
      ]

      this.decLoader()
    },

    fetchEffective () {
      this.incLoader()

      this.$SystemAPI.permissionsEffective()
        .then(rules => {
          this.canCreate = rules.find(({ resource, operation }) => resource === 'system' && operation === 'messagebus-queue.create').allow
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onSubmit (queue) {
      this.incLoader()
      if (this.queueID) {
        this.$SystemAPI.queuesUpdate(queue)
          .then(queue => {
            this.animateSuccess('info')
            this.queue = queue
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.queuesCreate(queue)
          .then(({ queueID }) => {
            this.animateSuccess('info')
            this.$router.push({ name: 'system.queue.edit', params: { queueID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },

    onDelete () {
      this.incLoader()
      let method = this.queue.deletedAt ? 'queuesUndelete' : 'queuesDelete'

      this.$SystemAPI[method]({ queueID: this.queueID })
        .then(() => {
          this.fetchQueue()
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },
  },
}
</script>
