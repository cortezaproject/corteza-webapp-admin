<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <b-card
      class="mb-1"
    >
      <b-form
        @submit.prevent="search"
      >
        <b-form-group
          label-cols-lg="2"
          :label="$t('filter.from')"
        >
          <b-input-group>
            <b-form-datepicker
              v-model="from.date"
              today-button
              reset-button
              close-button
              locale="en"
            />

            <b-form-timepicker
              v-model="from.time"
              now-button
              reset-button
              locale="en"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group
          label-cols-lg="2"
          :label="$t('filter.to')"
        >
          <b-input-group>
            <b-form-datepicker
              v-model="to.date"
              today-button
              reset-button
              close-button
              :max="new Date()"
              locale="en"
            />

            <b-form-timepicker
              v-model="to.time"
              now-button
              reset-button
              locale="en"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group
          label-cols-lg="2"
          :label="$t('filter.resource')"
        >
          <b-form-input
            v-model="filter.resource"
            size="sm"
          />
        </b-form-group>
        <b-form-group
          label-cols-lg="2"
          :label="$t('filter.action')"
        >
          <b-form-input
            v-model="filter.action"
            size="sm"
          />
        </b-form-group>
        <b-form-group
          label-cols-lg="2"
          :label="$t('filter.actor')"
        >
          <b-form-input
            v-model="filter.actorID"
            size="sm"
          />
        </b-form-group>
        <b-form-group
          label-cols-lg="2"
        >
          <b-button type="submit">
            {{ $t('filter.search') }}
          </b-button>
        </b-form-group>
      </b-form>
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
          @row-clicked="item=>$set(item, '_showDetails', !item._showDetails)"
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
            <router-link
              v-if="a.actorID && a.actorID !== '0'"
              :to="drillDownLink({ actorID: a.actorID })"
            >
              {{ a.actor || a.actorID }}
            </router-link>
          </template>
          <template #cell(resource)="{ item: a }">
            <router-link
              :to="drillDownLink({ resource: a.resource })"
            >
              {{ a.resource }}
            </router-link>
          </template>
          <template #cell(action)="{ item: a }">
            <router-link
              :to="drillDownLink({ action: a.action })"
            >
              {{ a.action }}
            </router-link>
          </template>
          <template #row-details="{ item: a, toggleDetails }">
            <b-card-group class="m-3 mb-5">
              <b-card :header="$t('details.header')">
                <b-row>
                  <b-col cols="4">
                    ID
                  </b-col>
                  <b-col cols="8">
                    {{ a.actionID }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.timestamp') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.timestamp }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.requestOrigin') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.requestOrigin }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.requestID') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.requestID }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.actorIPAddr') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.actorIPAddr }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.actor') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.actor }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.actorID') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.actorID }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.severity') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.severity | severityLabel }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.resource') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.resource }}
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.action') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.action }}
                  </b-col>
                </b-row>
              </b-card>
              <b-card :header="$t('details.headerAdditional')">
                <b-row>
                  <b-col cols="4">
                    {{ $t('details.description') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.description }}
                  </b-col>
                </b-row>
                <b-row v-if="a.error">
                  <b-col cols="4">
                    {{ $t('details.error') }}
                  </b-col>
                  <b-col cols="8">
                    {{ a.error }}
                  </b-col>
                </b-row>
                <hr>
                <b-row
                  v-for="(val, key) in a.meta"
                  :key="key"
                >
                  <b-col cols="4">
                    <code>{{ key }}</code>
                  </b-col>
                  <b-col cols="8">
                    <code>{{ val }}</code>
                  </b-col>
                </b-row>
              </b-card>
            </b-card-group>
          </template>
        </b-table>
      </b-card-body>
      <b-card-footer class="p-3 text-center">
        <button
          @click.stop="load()"
        >
          {{ $t('loadOlder') }}
        </button>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'

const defSeverity = 6
const severity = [
  { label: 'emergency',
    class: 'text-danger' },
  { label: 'alert',
    class: 'text-danger' },
  { label: 'critical',
    class: 'text-danger' },
  { label: 'error',
    class: 'text-danger' },
  { label: 'warning',
    class: 'text-warning' },
  { label: 'notice',
    class: 'text-success' },
  { label: 'info',
    class: 'text-success' },
  { label: 'debug',
    class: '' },
]

export default {
  filters: {
    severityLabel (s) {
      return severity[s].label
    },
  },

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

      from: {
        date: undefined,
        time: undefined,
      },

      to: {
        date: undefined,
        time: undefined,
      },

      filter: {
        beforeActionID: undefined,
        actorID: undefined,
        resource: undefined,
        action: undefined,
      },

      paging: {
        limit: 10,
      },

      fields: [
        {
          key: 'timestamp',
          tdClass: 'text-nowrap',
          // formatter: (v) => moment(v).fromNow(),
        },
        {
          key: 'actor',
        },
        {
          key: 'requestOrigin',
        },
        {
          key: 'resource',
        },
        {
          key: 'action',
        },
        {
          key: 'description',
        },
        {
          key: 'severity',
          label: '',
          tdClass: (v, k, item) => ['text-right', severity[item.severity].class],
          formatter: (v) => severity[v].label,
        },
      ].map(c => ({
        // Generate column label translation key
        label: this.$t(`columns.${c.key}`),
        ...c,
      })),

      items: [],
    }
  },

  computed: {
    fromDateTime () {
      return this.getDateTime(this.from)
    },

    toDateTime () {
      return this.getDateTime(this.to)
    },
  },

  watch: {
    'from.time': {
      handler (time) {
        if (time && !this.from.date) {
          this.from.date = new Date().toISOString().split('T')[0]
        }
      },
    },

    'to.time': {
      handler (time) {
        if (time && !this.to.date) {
          this.to.date = new Date().toISOString().split('T')[0]
        }
      },
    },
  },

  mounted () {
    this.load()
  },

  methods: {
    search () {
      // Do a complete search, not just beforeActionID
      this.load(true)
    },

    load (reset = false) {
      if (reset) {
        this.items.length = 0
        this.paging.beforeActionID = undefined
      } else {
        const len = this.items.length
        if (len > 0) {
          this.paging.beforeActionID = (this.items[len - 1] || {}).actionID
        }
      }

      this.filter.from = this.fromDateTime
      this.filter.to = this.toDateTime

      this.procListResults(this.$SystemAPI.actionlogList({ ...this.filter, ...this.paging }), false)
        .then(rr => {
          this.items.push(...rr)
        })
    },

    trClass (item, type) {
      if (type === 'row') {
        const { severity: s = defSeverity } = item
        return severity[s].tdClass
      }
    },

    // Resets paging & sorting and adds filtering params for drill-down
    drillDownLink (query = {}) {
      return {
        name: 'system.actionlog',
        query: {
          ...this.$route.query,
          ...query,
          sort: undefined,
        },
      }
    },

    getDateTime ({ date, time }) {
      const datetime = date && time ? `${date} ${time}` : date || time
      return datetime ? new Date(datetime).toISOString() : undefined
    },
  },
}
</script>
