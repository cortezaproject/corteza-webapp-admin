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
          :to="{ name: 'system.user.new' }"
        >
          {{ $t('new') }}
        </b-button>
      </b-button-group>
      <b-button-group>
        <permissions-button
          :title="$t('title')"
          resource="system:user:*"
          button-variant="link"
        >
          {{ $t('permissions') }}
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
          {{ $t('yaml') }}
        </b-dropdown-item-button>
      </b-dropdown>
      <c-corredor-manual-buttons
        ui-page="user/list"
        ui-slot="toolbar"
        resource-type="system"
        class="mr-1"
        @click="dispatchCortezaSystemEvent($event)"
      />
    </c-content-header>

    <c-resource-list
      primary-key="userID"
      edit-route="system.user.edit"
      :loading-text="$t('loading')"
      :total-text="$t('numFound', { count: totalItems })"
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
          no-gutters
          class="mt-3"
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
          <c-resource-list-status-filter
            v-model="filter.suspended"
            class="col-12 col-lg-6"
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
import { system } from '@cortezaproject/corteza-js'
import moment from 'moment'
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
    makeEvent () {
      return system.SystemEvent()
    },

    items () {
      return this.procListResults(this.$SystemAPI.userList(this.encodeListParams()))
    },
  },
}
</script>
