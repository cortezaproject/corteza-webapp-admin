<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form @submit="$emit('submit', queue)">
      <b-form-group
        :label="$t('consumer')"
        label-cols="2"
        :class="{ 'mb-0': !queue.queueID }"
      >
        <b-form-select
          v-model="queue.consumer"
          :options="consumers"
        />
      </b-form-group>

      <b-form-group
        :label="$t('name')"
        label-cols="2"
      >
        <b-form-input
          v-model="queue.queue"
          :state="isValidSlug"
        />
      </b-form-group>

      <b-form-group
        label-cols="2"
        :label="$t('poll_delay')"
        :description="metaPollDelayDescription()"
      >
        <b-form-input
          v-model="(queue.meta || {}).poll_delay"
          class="col-xs-2 col-lg-2"
          :state="isValidDuration"
        />
      </b-form-group>

      <b-form-group
        v-if="isMetaDispatchEvents"
        :label="$t('dispatch_events')"
        :description="$t('dispatch_events_desc')"
        label-cols="2"
      >
        <b-form-checkbox
          v-model="queue.meta.dispatch_events"
          name="checkbox-1"
        >
          {{ $t("dispatch_events") }}
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
        v-if="queue.createdAt"
        :label="$t('createdAt')"
        label-cols="2"
      >
        {{ queue.createdAt }}
      </b-form-group>

      <b-form-group
        v-if="queue.updatedAt"
        :label="$t('updatedAt')"
        label-cols="2"
      >
        {{ queue.updatedAt }}
      </b-form-group>

      <b-form-group
        v-if="queue.deletedAt"
        :label="$t('deletedAt')"
        label-cols="2"
      >
        {{ queue.deletedAt }}
      </b-form-group>
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t("title") }}
      </h3>
    </template>

    <template #footer>
      <c-submit-button
        class="float-right"
        :processing="processing"
        :success="success"
        :disabled="!formValid || !canCreate"
        @submit="$emit('submit', queue)"
      />

      <confirmation-toggle
        v-if="queue && queue.queueID"
        @confirmed="$emit('delete')"
      >
        {{ getDeleteStatus }}
      </confirmation-toggle>
    </template>
  </b-card>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  name: 'CQueueEditorInfo',

  i18nOptions: {
    namespaces: 'system.queues',
    keyPrefix: 'editor.info',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
  },

  props: {
    consumers: {
      type: Array,
      required: true,
    },

    queue: {
      type: Object,
      required: true,
    },

    processing: {
      type: Boolean,
      value: false,
    },

    success: {
      type: Boolean,
      value: false,
    },

    canCreate: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    getDeleteStatus () {
      return this.queue.deletedAt ? this.$t('undelete') : this.$t('delete')
    },

    isValidDuration () {
      let pd = (this.queue.meta || {}).poll_delay || ''
      let m = pd.match(/^((\d+h)?(\d+m)?(\d+s)?)|(\s)$/g)

      if (m.length && m[0] === pd) {
        return true
      }

      return false
    },

    isValidSlug () {
      return this.queue.queue ? /^[A-Za-z][0-9A-Za-z_\-.]*[A-Za-z0-9]$/.test(this.queue.queue) : null
    },

    isValidConsumer () {
      return !!this.queue.consumer
    },

    formValid () {
      return this.isValidDuration &&
        this.isValidSlug &&
        this.isValidConsumer
    },

    isMetaPollDelay () {
      if (this.queue.queueID) {
        return ((this.queue.meta || {}).poll_delay || '') === ''
      }

      return true
    },

    isMetaDispatchEvents () {
      return ((this.queue || {}).meta || {}).dispatch_events === null
    },
  },

  methods: {
    metaPollDelayDescription () {
      return (((this.queue || {}).meta || {}).poll_delay || null)
        ? this.$t('poll_delay_set')
        : this.$t('poll_delay_empty')
    },

  },
}
</script>
