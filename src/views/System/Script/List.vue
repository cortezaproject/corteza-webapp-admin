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
          :to="{ name: 'system.script.new' }"
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
      primary-key="scriptID"
      edit-route="system.script.edit"
      :loading-text="$t('loading')"
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
    namespaces: [ 'system.scripts' ],
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'automationScripts',

      filter: {
        query: '',
      },

      fields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'handle',
          sortable: true,
        },
        {
          key: 'createdAt',
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
      return this.procListResults(this.$SystemAPI.automationScriptList(this.encodeListParams()))
    },
  },
}
</script>
