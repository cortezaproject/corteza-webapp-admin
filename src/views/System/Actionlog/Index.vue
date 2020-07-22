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
          <b-form-input
            v-model="filter.from"
            lazy-formatter
            size="sm"
            placeholder="YYYY-MM-DDTHH:MM:SS"
            :formatter="isoDateFormatter"
          />
          <template #description>
            <b-button
              variant="link"
              class="my-0 py-0"
              @click.prevent="moveFromFilter(-2)"
            >
              &lt;&lt;
            </b-button>
            <b-button
              variant="link"
              class="my-0 py-0"
              @click.prevent="moveFromFilter(-1)"
            >
              &lt;
            </b-button>
            <b-button
              variant="link"
              class="my-0 py-0"
              @click.prevent="moveFromFilter(0)"
            >
              {{ $t('filter.today') }}
            </b-button>
            <b-button
              variant="link"
              class="my-0 py-0"
              @click.prevent="moveFromFilter(1)"
            >
              &gt;
            </b-button>
            <b-button
              variant="link"
              class="my-0 py-0"
              @click.prevent="moveFromFilter(2)"
            >
              &gt;&gt;
            </b-button>
          </template>
        </b-form-group>
        <b-form-group
          label-cols-lg="2"
          :label="$t('filter.to')"
        >
          <b-form-input
            v-model="filter.to"
            lazy-formatter
            size="sm"
            placeholder="YYYY-MM-DDTHH:MM:SS"
            :formatter="isoDateFormatter"
          />
          <template #description>
            <b-button
              variant="link"
              class="small my-0 py-0"
              @click.prevent="moveToFilter(-2)"
            >
              &lt;&lt;
            </b-button>
            <b-button
              variant="link"
              class="small my-0 py-0"
              @click.prevent="moveToFilter(-1)"
            >
              &lt;
            </b-button>
            <b-button
              variant="link"
              class="small my-0 py-0"
              @click.prevent="moveToFilter(0)"
            >
              {{ $t('filter.today') }}
            </b-button>
            <b-button
              variant="link"
              class="small my-0 py-0"
              @click.prevent="moveToFilter(1)"
            >
              &gt;
            </b-button>
            <b-button
              variant="link"
              class="small my-0 py-0"
              @click.prevent="moveToFilter(2)"
            >
              &gt;&gt;
            </b-button>
          </template>
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
          @click.stop="load"
        >
          {{ $t('loadOlder') }}
        </button>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'
import moment from 'moment'

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

      filter: {
        'from': undefined,
        'to': undefined,
        actorID: undefined,
        resource: undefined,
        action: undefined,
      },

      paging: {
        page: 1,
        perPage: 100,
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

  watch: {
    $route (to, from) {
      // this.load()
    },
  },

  mounted () {
    this.load()
  },

  methods: {
    search () {
      this.items.length = 0
      this.filter.page = 1
      return this.load()
    },

    load () {
      this.procListResults(this.$SystemAPI.actionlogList(this.encodeListParams()))
        .then(rr => {
          this.items.push(...rr)
          this.paging.page++
        })
    },

    trClass (item, type) {
      if (type === 'row') {
        const { severity: s = defSeverity } = item
        return severity[s].tdClass
      }
    },

    isoDateFormatter (v) {
      return moment(v).toISOString()
    },

    moveFromFilter (s) {
      this.filter.from = this.moveTimestampFilter(this.filter.from, s).startOf('day').toISOString(true)
    },

    moveToFilter (s) {
      this.filter.to = this.moveTimestampFilter(this.filter.to, s).endOf('day').toISOString(true)
    },

    // Resets paging & sorting and adds filtering params for drill-down
    drillDownLink (query = {}) {
      return {
        name: 'system.actionlog',
        query: {
          ...this.$route.query,
          ...query,
          page: 1,
          sort: undefined,
        },
      }
    },

    moveTimestampFilter (v, s) {
      v = v ? moment(v) : moment()
      v.startOf('day')

      const a = Math.abs(s)
      const d = s / a // + or -

      switch (a) {
        case 0:
          return moment()
        case 1:
          return v.add(d, 'days')
        case 2:
          return v.add(d, 'months')
        default:
          return v
      }
    },
  },
}
</script>
