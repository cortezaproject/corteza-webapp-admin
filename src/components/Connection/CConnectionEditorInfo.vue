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
            :label="$t('info.handle')"
            class="mb-3 text-primary"
          >
            <b-form-input
              v-model="connection.handle"
              :disabled="isPrimary"
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
            :label="$t('info.ownership')"
            class="mb-3 text-primary"
          >
            <b-form-input
              v-model="connection.ownership"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group>
            <label
              class="d-flex align-items-center text-primary"
            >
              {{ $t('info.location') }}
              <c-location
                v-model="locationCoordinates"
                editable
                class="ml-1"
              />
            </label>

            <b-form-input
              v-model="locationName"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group
        :label="$t('info.url')"
        class="mb-3 text-primary"
      >
        <b-form-input
          v-model="url"
          type="url"
          :disabled="isPrimary"
        />
      </b-form-group>

      <b-form-group>
        <b-checkbox
          v-model="connection.sensitivityLevel"
          value="1"
          unchecked-value="0"
        >
          {{ $t('info.sensitiveData.text') }}
        </b-checkbox>
      </b-form-group>

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
        v-if="connection && connection.connectionID && !isPrimary"
        @confirmed="$emit('delete')"
      >
        {{ deleteStatus }}
      </confirmation-toggle>
    </template>
  </b-card>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'
import CLocation from 'corteza-webapp-admin/src/components/CLocation'

export default {
  i18nOptions: {
    namespaces: 'system.connections',
    keyPrefix: 'external',
  },

  components: {
    ConfirmationToggle,
    CSubmitButton,
    CLocation,
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
    isPrimary () {
      return this.connection.type === 'corteza::system:primary_dal_connection'
    },

    locationCoordinates: {
      get () {
        return this.connection.location.geometry.coordinates || []
      },

      set (coordinates) {
        this.connection.location.geometry.coordinates = coordinates
      },
    },

    locationName: {
      get () {
        return this.connection.location.properties.name
      },

      set (name) {
        this.connection.location.properties.name = name
      },
    },

    url: {
      get () {
        const { connection } = this.connection.config
        const { params = {} } = connection
        return (params || {}).dsn
      },

      set (url) {
        this.connection.config.connection.params.dsn = url
      },
    },

    deleteStatus () {
      return this.connection.deletedAt ? this.$t('general:label.undelete') : this.$t('general:label.delete')
    },
  },
}
</script>
