<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="title"
    >
      <!-- // :title="$t('title')" -->
      <span
        class="text-nowrap"
      >
        <c-permissions-button
          v-if="canGrant"
          resource="corteza::system:apigw-route/*"
          button-variant="light"
        >
          <font-awesome-icon :icon="['fas', 'lock']" />
          {{ $t('permissions') }}
        </c-permissions-button>
      </span>
    </c-content-header>
    <c-resource-list
      primary-key="hitID"
      edit-route="system.apigw.profiler.hit.list"
      :loading-text="$t('loading')"
      :paging="paging"
      :sorting="sorting"
      :items="hits"
      :fields="fields"
    >
      <template #filter>
        <b-form-group
          class="p-0 m-0"
        >
          <b-input-group>
            <b-button
              variant="primary"
              @click="refresh"
            >
              Refresh
            </b-button>
          </b-input-group>
        </b-form-group>
      </template>
    </c-resource-list>
  </b-container>
</template>

<script>
import * as moment from 'moment'
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
        routeID: '',
        query: '',
        deleted: 0,
      },

      pollDelay: 2,

      hits: [],

      fields: [
        {
          key: 'time_start',
          sortable: true,
          formatter: (v) => moment(v).toISOString(),
        },
        {
          key: 'time_finish',
          sortable: true,
          formatter: (v) => moment(v).toISOString(),
        },
        {
          key: 'request.ContentLength',
          sortable: true,
        },
        {
          key: 'time_duration',
          sortable: true,
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
    route () {
      return atob(this.$route.params.routeID)
    },
  },

  watch: {
    '$route.params.routeID': {
      immediate: true,
      handler () {
        this.title = `${this.$t('title')} - ${this.route}`
      },
    },
  },

  mounted () {
    this.refresh()
  },

  methods: {
    async refresh () {
      const l = this.$SystemAPI.apigwProfilerRoute({ ...this.encodeListParams(), routeID: this.$route.params.routeID })
      this.hits = (await this.procListResults(l)).map((i) => ({ ...i, 'hitID': i.ID }))
    },
  },
}
</script>
