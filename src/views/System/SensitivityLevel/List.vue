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
          :to="{ name: 'system.sensitivityLevel.new' }"
        >
          {{ $t('new') }}
        </b-button>
      </span>
    </c-content-header>
    <c-resource-list
      primary-key="sensitivityLevelID"
      edit-route="system.sensitivityLevel.edit"
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
import { mapGetters } from 'vuex'

export default {
  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: 'system.sensitivityLevel',
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'sensitivityLevel',

      filter: {
        query: '',
        deleted: 0,
      },

      fields: [
        {
          key: 'meta.name',
        },
        {
          key: 'level',
          sortable: true,
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

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    canCreate () {
      return this.can('system/', 'dal-sensitivity-level.manage')
    },
  },

  methods: {
    items () {
      return this.procListResults(this.$SystemAPI.dalSensitivityLevelList(this.encodeListParams()))
    },
  },
}
</script>
