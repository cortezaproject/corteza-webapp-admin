<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />
    <b-card
      no-body
      class="shadow-sm"
      header-bg-variant="white"
      footer-bg-variant="white"
    >
      <b-card-body
        class="p-0"
      >
        <b-table
          id="resource-list"
          hover
          responsive
          class="mb-0"
          head-variant="light"
          :items="items"
          :fields="fields"
          no-sort-reset
        >
          <template #table-busy>
            <div class="text-center m-5">
              <div>
                <b-spinner
                  small
                  class="align-middle m-2"
                />
              </div>
              <div>{{ loadingText }}</div>
            </div>
          </template>
          <template #cell(events)="row">
            {{ events(row.item.triggers).join(', ') }}
          </template>
        </b-table>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'

export default {
  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'system.automation' ],
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'automation',

      filter: {
        query: '',
      },

      fields: [
        {
          key: 'label',
          sortable: true,
        },
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'events',
        },
      ].map(c => ({
        // Generate column label translation key
        label: this.$t(`columns.${c.key}`),
        ...c,
      })),
    }
  },

  methods: {
    items () {
      return this.procListResults(this.$SystemAPI.automationList(this.encodeListParams()))
    },

    events (tt) {
      const ee = []

      if (!Array.isArray(tt) || tt.length === 0) {
        return ee
      }

      tt.forEach(({ events }) => ee.push(...events))
      return ee.filter((v, i) => ee.indexOf(v) === i)
    },
  },
}
</script>
