<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <template #header>
      <h3 class="d-flex justify-content-between m-0">
        {{ $t('title') }}

        <b-button
          v-if="connection"
          size="sm"
          variant="link"
          :to="{ name: 'system.connection.edit', params: { connectionID: (connection || {}).connectionID } }"
        >
          <font-awesome-icon
            :icon="['fas', 'pen']"
          />
        </b-button>
      </h3>
    </template>

    <template
      v-if="connection"
    >
      <b-form-group>
        <label
          class="d-flex align-items-center text-primary"
        >
          {{ $t('location') }}
          <c-location
            v-model="locationCoordinates"
            class="ml-1"
          />
        </label>

        {{ locationName }}
      </b-form-group>

      <b-form-group
        :label="$t('ownership')"
        label-class="text-primary"
        class="mb-0"
      >
        {{ connection.ownership }}
      </b-form-group>
    </template>
  </b-card>
</template>

<script>
import CLocation from 'corteza-webapp-admin/src/components/CLocation'

export default {
  components: {
    CLocation,
  },

  i18nOptions: {
    namespaces: 'system.connections',
    keyPrefix: 'editor.info',
  },

  data () {
    return {
      processing: false,

      connection: undefined,
    }
  },

  computed: {
    locationCoordinates () {
      return this.connection.location.geometry.coordinates || []
    },

    locationName () {
      return this.connection.location.properties.name || 'Unnamed location'
    },
  },

  created () {
    this.fetchPrimaryConnection()
  },

  methods: {
    fetchPrimaryConnection () {
      this.processing = true

      return this.$SystemAPI.dalConnectionList({ type: 'corteza::system:primary_dal_connection' }).then(({ set = [] }) => {
        this.connection = set.find(({ type }) => type === 'corteza::system:primary_dal_connection')
      }).catch(this.toastErrorHandler(this.$t('notification:fetch.error')))
        .finally(async () => {
          this.processing = false
        })
    },
  },
}
</script>
