<template>
  <b-card
    class="shadow-sm"
    body-class="p-0"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <template
      #header
    >
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>

    <c-resource-list
      primary-key="connectionID"
      edit-route="system.connection.edit"
      :loading-text="$t('loading')"
      :paging="paging"
      :sorting="sorting"
      :items="items"
      :fields="fields"
      class="h-100"
    >
      <template #actions>
        <b-button
          variant="primary"
          size="lg"
          :to="{ name: 'system.connection.new' }"
        >
          {{ $t('add-button') }}
        </b-button>
      </template>

      <template #filter>
        <b-input-group
          class="h-100"
        >
          <b-form-input
            v-model.trim="filter.query"
            :placeholder="$t('filter-form.query.placeholder')"
            class="text-truncate border-right-0 mb-0 h-100"
            @keyup="filterList"
          />
          <b-input-group-append>
            <b-input-group-text class="text-primary bg-white">
              <font-awesome-icon
                :icon="['fas', 'search']"
              />
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </template>
    </c-resource-list>
  </b-card>
</template>

<script>
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'
import moment from 'moment'

export default {
  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: 'system.connections',
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'connections',

      filter: {
        type: 'corteza::system:dal-connection',
        deleted: 0,
      },

      fields: [
        {
          key: 'name',
          sortable: true,
          formatter: (value, col, conn) => conn.meta.name || conn.handle,
        },
        {
          key: 'location',
          sortable: true,
          formatter: (value, col, conn) => conn.meta.location.properties.name,
        },
        {
          key: 'ownership',
          sortable: true,
        },
        {
          key: 'createdAt',
          sortable: true,
          formatter: (v) => moment(v).fromNow(),
        },
        {
          key: 'actions',
          label: '',
          class: 'text-right',
        },
      ].map(c => ({
        ...c,
        // Generate column label translation key
        label: c.label || this.$t(`columns.${c.key}`),
      })),
    }
  },

  methods: {
    items () {
      return this.procListResults(this.$SystemAPI.dalConnectionList(this.encodeListParams()))
    },
  },
}
</script>
