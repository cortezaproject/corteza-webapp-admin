<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <b-button-group>
        <b-button
          variant="link"
          :to="{ name: 'user.new' }"
        >
          New &blk14;
        </b-button>
      </b-button-group>
      <b-button-group>
        <permissions-button
          title="Users"
          resource="system:users:*"
          button-variant="link"
        >
          Permissions &blk14;
        </permissions-button>
      </b-button-group>
      <b-dropdown
        v-if="false"
        variant="link"
        right
        menu-class="shadow-sm"
        text="Export"
      >
        <b-dropdown-item-button variant="link">
          YAML  &blk14;
        </b-dropdown-item-button>
      </b-dropdown>
    </c-content-header>

    <c-resource-list
      primary-key="userID"
      edit-route="user.edit"
      :loading-text="$t('loading')"
      :total-text="$t('numFound', [ totalItems ])"
      :paging="paging"
      :sorting="sorting"
      :items="items"
      :fields="fields"
      :total-items="totalItems"
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
        </b-form-group>
        <b-row
          class="mt-2 mb-0 p-0"
        >
          <c-resource-list-status-filter
            v-model="filter.deleted"
            :label="$t('filterForm.deleted.label')"
            :excluded-label="$t('filterForm.excluded.label')"
            :inclusive-label="$t('filterForm.inclusive.label')"
            :exclusive-label="$t('filterForm.exclusive.label')"
            @change="filterList"
          />
          <c-resource-list-status-filter
            v-model="filter.suspended"
            :label="$t('filterForm.suspended.label')"
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
  name: 'UserList',
  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'system.users' ],
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'users',

      filter: {
        query: '',
        suspended: 0,
        deleted: 0,
      },

      fields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'email',
          sortable: true,
        },
        {
          key: 'handle',
          sortable: true,
        },
        {
          key: 'createdAt',
          label: 'Created',
          sortable: true,
          formatter: (v) => moment(v).fromNow(),
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

  methods: {
    items () {
      return this.procListResults(this.$SystemAPI.userList(this.encodeListParams()))
    },
  },
}
</script>
