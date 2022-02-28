<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form>
      <b-form-group
        :label="$t('columns.id')"
        label-cols="2"
      >
        <b-form-input
          v-model="hit.ID"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.method')"
        label-cols="2"
      >
        <b-form-input
          v-model="hit.request.Method"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.url_path')"
        label-cols="2"
      >
        <b-form-input
          v-model="hit.request.URL.Path"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.header')"
        label-cols="2"
      >
        <b-form-textarea
          v-model="hit.request.Header"
          plaintext
          disabled
          rows="10"
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.content_length')"
        label-cols="2"
      >
        <b-form-input
          v-model="hit.request.ContentLength"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.host')"
        label-cols="2"
      >
        <b-form-input
          v-model="hit.request.Host"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.remote_addr')"
        label-cols="2"
      >
        <b-form-input
          v-model="hit.request.RemoteAddr"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.time_start')"
        label-cols="2"
      >
        <b-form-input
          v-model="hit.time_start"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.time_finish')"
        label-cols="2"
      >
        <b-form-input
          v-model="hit.time_finish"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.time_duration')"
        label-cols="2"
      >
        <b-form-input
          v-model="hit.time_duration"
          plaintext
          disabled
        />
      </b-form-group>

      <b-form-group
        :label="$t('columns.body')"
        label-cols="2"
      >
        <b-form-textarea
          :value="body"
          plaintext
          disabled
          rows="10"
        />
      </b-form-group>

      <!-- <b-form-group
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
      </b-form-group> -->
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t("hit.title") }}
      </h3>
    </template>

    <!-- <template #footer>
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
    </template> -->
  </b-card>
</template>

<script>
export default {
  name: 'CProfilerHitInfo',

  i18nOptions: {
    namespaces: [ 'system.apigw' ],
    keyPrefix: 'profiler',
  },

  props: {
    hit: {
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
    body () {
      return atob(this.hit.body)
    },
  },
}
</script>
