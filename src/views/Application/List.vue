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
      primary-key="applicationID"
      edit-route="application.edit"
      :loading-text="$t('loading')"
      :params="params"
      :items="items"
      :fields="fields"
      :total-items="totalItems"
    >
      <template v-slot:filter>
        <b-form-group
          class="p-0 m-0 col-6"
        >
          <b-input-group>
            <b-form-input
              v-model.trim="params.query"
              :placeholder="$t('list.searchForm.query.placeholder')"
              @keyup="search"
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
    namespaces: [ 'applications' ],
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'applications',

      fields: [
        {
          key: 'name',
          sortable: true,
        },
        {
          key: 'enabled',
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
        label: this.$t(`list.columns.${c.key}`),
      })),
    }
  },

  methods: {
    items (ctx) {
      // Push new router/params
      this.$router.push({ query: this.params })

      const params = {
        query: this.params.query,
        ...this.stdPagingParams(ctx),
      }

      return this.$SystemAPI.applicationList(params).then(({ set, filter } = {}) => {
        // Update total items counter
        this.totalItems = filter.count

        return set
      }).catch((error) => {
        this.$store.dispatch('ui/appendAlert', error)
      })
    },
  },
}
</script>
