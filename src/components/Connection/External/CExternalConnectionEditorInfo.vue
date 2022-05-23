<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <template #header>
      <h3 class="mb-0">
        {{ $t('title.basic-info') }}
      </h3>
    </template>

    <b-form
      @submit.prevent="$emit('submit', connection)"
    >
      <b-row>
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            :label="$t('info.name')"
            class="mb-3 text-primary"
          >
            <b-form-input
              v-model="connection.name"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            :label="$t('info.location')"
            class="mb-3 text-primary"
          >
            <b-form-input
              v-model="connection.location"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            :label="$t('info.url')"
            class="mb-3 text-primary"
          >
            <b-form-input
              v-model="connection.dsn"
              type="url"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            :label="$t('info.ownership')"
            class="mb-3 text-primary"
          >
            <b-form-input
              v-model="connection.ownership"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            :label="$t('info.sensitiveData.label')"
          >
            <b-checkbox
              v-model="connection.sensitiveData"
            >
              {{ $t('info.sensitiveData.text') }}
            </b-checkbox>
          </b-form-group>
        </b-col>
      </b-row>

      <!--
        include hidden input to enable
        trigger submit event w/ ENTER
      -->
      <input
        type="submit"
        class="d-none"
      >
    </b-form>

    <template #footer>
      <c-submit-button
        class="float-right"
        :processing="processing"
        :success="success"
        @submit="$emit('submit', connection)"
      />

      <confirmation-toggle
        v-if="connection && connection.connectionID"
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
  name: 'CExternalSourcesEditorInfo',

  i18nOptions: {
    namespaces: 'system.connections',
    keyPrefix: 'external',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
  },

  props: {
    connection: {
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
  },

  computed: {
    getDeleteStatus () {
      return this.connection.deletedAt ? this.$t('general:label.undelete') : this.$t('general:label.delete')
    },
  },
}
</script>
