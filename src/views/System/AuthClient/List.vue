<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <span
        class="text-nowrap"
      >
        <b-button
          v-if="canCreate"
          variant="primary"
          class="mr-2"
          :to="{ name: 'system.authclient.new' }"
        >
          {{ $t('new') }}
        </b-button>
        <c-permissions-button
          v-if="canGrant"
          :title="$t('title')"
          resource="system:auth-client:*"
          button-variant="light"
        >
          <font-awesome-icon :icon="['fas', 'lock']" />
          {{ $t('permissions') }}
        </c-permissions-button>
      </span>
    </c-content-header>
    <c-resource-list
      primary-key="authClientID"
      edit-route="system.authclient.edit"
      :loading-text="$t('loading')"
      :paging="paging"
      :sorting="sorting"
      :items="items"
      :fields="fields"
    >
      <template #filter>
        <b-row
          no-gutters
        >
          <c-resource-list-status-filter
            v-model="filter.deleted"
            class="mb-1 mb-lg-0"
            :label="$t('filterForm.deleted.label')"
            :excluded-label="$t('filterForm.excluded.label')"
            :inclusive-label="$t('filterForm.inclusive.label')"
            :exclusive-label="$t('filterForm.exclusive.label')"
            @change="filterList"
          />
        </b-row>
      </template>
    </c-resource-list>
  </b-container>
</template>

<script>
import * as moment from 'moment'
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'

export default {
  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'system.authclients' ],
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'authclient',

      canCreate: false,
      canGrant: false,

      filter: {
        query: '',
        deleted: 0,
      },

      fields: [
        {
          key: 'meta.name',
          sortable: false,
        },
        {
          key: 'handle',
          sortable: true,
        },
        {
          key: 'enabled',
          formatter: (v) => v ? 'Yes' : 'No',
        },
        {
          key: 'createdAt',
          sortable: true,
          formatter: (v) => moment(v).fromNow(),
        },
        {
          key: 'actions',
          tdClass: 'text-right',
        },
      ].map(c => ({
        ...c,
        // Generate column label translation key
        label: this.$t(`columns.${c.key}`),
      })),
    }
  },

  created () {
    this.fetchEffective()
  },

  methods: {
    items () {
      return this.procListResults(this.$SystemAPI.authClientList(this.encodeListParams()))
    },

    fetchEffective () {
      this.incLoader()

      this.$SystemAPI.permissionsEffective()
        .then(rules => {
          this.canCreate = rules.find(({ resource, operation }) => resource === 'system' && operation === 'client.create').allow
          this.canGrant = rules.find(({ resource, operation }) => resource === 'system' && operation === 'grant').allow
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },
  },
}
</script>
