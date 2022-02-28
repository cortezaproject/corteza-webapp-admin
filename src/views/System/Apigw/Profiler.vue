<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <span
        class="text-nowrap"
      />
    </c-content-header>
    <c-resource-list
      primary-key="routeID"
      edit-route="system.apigw.profiler.route.list"
      :loading-text="$t('loading')"
      :paging="paging"
      :sorting="sorting"
      :items="items"
      :fields="fields"
    >
      <template #filter>
        <b-form-group
          class="p-0 m-0"
        >
          <b-input-group>
            <b-form-input
              v-model.trim="filter.query"
              :placeholder="$t('filterForm.query.placeholder')"
              @keyup="filterList"
            />
          </b-input-group>
          <b-button
            variant="primary"
            @click="refresh"
          >
            Refresh
          </b-button>
        </b-form-group>
      </template>
    </c-resource-list>
  </b-container>
</template>

<script>
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'
import { mapGetters } from 'vuex'

export default {
  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'system.apigw' ],
    keyPrefix: 'profiler',
  },

  data () {
    return {
      id: 'routes',

      filter: {
        query: '',
        deleted: 0,
      },

      pollDelay: 2,

      items: [],

      fields: [
        {
          key: 'path',
          sortable: true,
        },
        {
          key: 'count',
          sortable: true,
        },
        {
          key: 'size_min',
          sortable: true,
        },
        {
          key: 'size_max',
          sortable: true,
        },
        {
          key: 'size_avg',
          sortable: true,
          tdClass: 'text-right',
        },
        {
          key: 'time_min',
          sortable: true,
        },
        {
          key: 'time_max',
          sortable: true,
          // formatter: (v) => moment(v).fromNow(),
        },
        {
          key: 'time_avg',
          sortable: true,
          tdClass: 'text-right',
        },
        {
          key: 'actions',
          label: '',
          tdClass: 'text-right',
        },
      ].map(c => ({
        ...c,
        // Generate column label translation key
        label: this.$t(`columns.${c.key}`),
      })),
    }
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    canCreate () {
      return this.can('system/', 'apigw-route.create')
    },

    canGrant () {
      return this.can('system/', 'grant')
    },
  },

  mounted () {
    this.refresh()
  },

  methods: {
    async refresh () {
      const l = this.$SystemAPI.apigwProfilerList(this.encodeListParams())

      this.items = (await this.procListResults(l)).map((i) => ({ ...i, 'routeID': this.encodeRouteID(i.path) }))
    },

    encodeRouteID (r) {
      return btoa(r)
    },
  },
}
</script>
