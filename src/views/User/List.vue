<template>
  <main class="px-3 py-5">
    <c-header
      :title="$t('label')"
      :badge="totalItems"
    >
      <c-user-toolbar />
    </c-header>

    <c-error :error="error" />

    <c-resource-list
      primary-key="userID"
      edit-route="user.edit"
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
  </main>
</template>

<script>
import * as moment from 'moment'
import CUserToolbar from 'corteza-webapp-admin/src/components/CUserToolbar'
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'

export default {
  components: {
    CUserToolbar,
  },

  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'users' ],
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
      this.error = null
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
        this.error = error
      })
    },
  },
}
</script>
