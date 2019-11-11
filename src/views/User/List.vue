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
      :params="params"
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
              v-model.trim="params.query"
              :placeholder="$t('searchForm.query.placeholder')"
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
  name: 'UserList',

  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'users' ],
    keyPrefix: 'list',
  },

  data () {
    return {
      id: 'users',

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
      ],
    }
  },

  methods: {
    items (ctx) {
      const params = {
        query: this.params.query,
        ...this.stdPagingParams(ctx),
      }

      return this.$SystemAPI.userList(params).then(({ set, filter } = {}) => {
        // Push new router/params
        this.$router.push({ name: 'user.list', query: this.params })

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
