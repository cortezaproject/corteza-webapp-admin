<template>
  <main class="px-3 py-5">
    <c-header
      :title="$t('label')"
      :badge="totalItems"
    >
      <c-user-toolbar />
    </c-header>

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
import _ from 'lodash'
import CUserToolbar from 'corteza-webapp-admin/src/components/CUserToolbar'
import CHeader from 'corteza-webapp-admin/src/components/CHeader'
import { default as CResourceList, loadQueryParams, stdPagingParams } from 'corteza-webapp-admin/src/components/CResourceList'

export default {
  components: {
    CResourceList,
    CHeader,
    CUserToolbar,
  },

  i18nOptions: {
    namespaces: [ 'users' ],
  },

  data () {
    return {
      id: 'users',

      error: null,

      totalItems: 0,

      params: {
        query: null,
        perPage: 30,
        page: 4,
        sortBy: 'id',
        sortDesc: true,
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
      ],
    }
  },

  create () {
    this.params = loadQueryParams(this.$route.query, this.params)
  },

  methods: {
    search: _.debounce(function () {
      this.$root.$emit('bv::refresh::table', 'resource-list')
    }, 300),

    items (ctx) {
      const params = {
        query: this.params.query,
        ...stdPagingParams(ctx),
      }

      return this.$SystemAPI.userList(params).then(({ set, filter } = {}) => {
        // Push new router/params
        this.$router.push({ name: 'user.list', query: this.params })

        // Update total items counter
        this.totalItems = filter.count

        return set
      }).catch(({ message }) => {
        console.log(message)
      })
    },
  },
}
</script>
