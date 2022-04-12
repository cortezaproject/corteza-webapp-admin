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
        {{ $t('title.default') }}
      </h3>
    </template>

    <c-resource-list
      primary-key="dataSourceID"
      edit-route="system.dataSources.edit"
      :loading-text="$t('loading')"
      :paging="paging"
      :sorting="sorting"
      :items="items"
      :fields="fields"
    >
      <template #actions>
        <b-button
          variant="primary"
          size="md"
          class="py-2"
          :to="{ name: 'system.dataSources.create' }"
        >
          {{ $t('add-button') }}
        </b-button>
      </template>

      <template #filter>
        <b-form-group>
          <b-input-group>
            <b-form-input
              v-model.trim="filter.query"
              :placeholder="$t('filterForm.query.placeholder')"
              class="text-truncate border-right-0"
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
        </b-form-group>
      </template>
    </c-resource-list>
  </b-card>
</template>

<script>
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'

export default {
  name: 'CExternalDataSourcesList',

  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: 'system.datasources',
    keyPrefix: 'external',
  },

  data () {
    return {
      id: 'dataSources',

      fields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'url',
          label: this.$t(`columns.dsn`),
          sortable: true,
        },
        {
          key: 'location',
          sortable: true,
        },
        {
          key: 'ownership',
          sortable: true,
        },
        {
          key: 'actions',
          label: this.$t('edit'),
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
      const set = [
        { dataSourceID: '1', name: 'Primary Data Lake', url: 'dsnsdnsdnnsdnsnd', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: true },
        { dataSourceID: '2', name: 'Internal ERP', url: 'nannanananana', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: false },
        { dataSourceID: '3', name: 'ELK', url: 'batmaaaan', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: false },
      ]

      const filter = {
        count: set.length,
        limit: 10,
      }

      return this.procListResults(new Promise(resolve => setTimeout(resolve({ filter, set })), 200))
    },
  },
}
</script>
