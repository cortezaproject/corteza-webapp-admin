<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <b-card
      v-if="false"
    >
      // filter
    </b-card>

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
          responsive
          hover
          class="mb-0 small"
          head-variant="light"
          :items="items"
          :fields="fields"
          :tbody-tr-class="trClass"
        >
          <template #table-busy>
            <div class="text-center m-5">
              <div>
                <b-spinner
                  small
                  class="align-middle m-2"
                />
              </div>
              <div>{{ $t('loading') }}</div>
            </div>
          </template>
          <template #cell(timestamp)="{ item: a }">
            {{ a.timestamp | locLongDate }}
          </template>
          <template #cell(actor)="{ item: a }">
            <span v-if="a.actorID && a.actorID != '0'">
              {{ a.actor || a.actorID }}
            </span>
          </template>
        </b-table>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'

const defSeverity = 6
const severity = [
  { label: 'emergency',
    class: 'bg-danger text-light' },
  { label: 'alert',
    class: 'bg-danger text-light' },
  { label: 'critical',
    class: 'bg-danger text-light' },
  { label: 'error',
    class: 'bg-danger text-light' },
  { label: 'warning',
    class: 'bg-warning' },
  { label: 'notice',
    class: 'bg-success' },
  { label: 'info',
    class: 'bg-success text-light' },
  { label: 'debug',
    class: '' },
]

export default {
  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'system.actionlog' ],
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'actionlog',

      filter: {
        query: '',
      },

      paging: {
        perPage: 100,
      },

      fields: [
        {
          key: 'timestamp',
          tdClass: 'text-nowrap',
          // formatter: (v) => moment(v).fromNow(),
        },
        {
          key: 'resource',
        },
        {
          key: 'action',
        },
        {
          key: 'actor',
        },
        {
          key: 'description',
        },
        {
          key: 'severity',
          label: '',
          tdClass: (v, k, item) => severity[item.severity].class,
          formatter: (v) => severity[v].label,
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
      return this.procListResults(this.$SystemAPI.actionlogList(this.encodeListParams()))
    },

    trClass (item, type) {
      if (type === 'row') {
        const { severity: s = defSeverity } = item
        return severity[s].tdClass
      }
    },
  },
}
</script>
