<template>
  <main class="px-3 py-5">
    <c-header
      :title="$t('label')"
      :total="totalItems"
    >
      <c-application-toolbar />
    </c-header>

    <c-error :error="error" />

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
  </main>
</template>

<script>
import * as moment from 'moment'
import CApplicationToolbar from 'corteza-webapp-admin/src/components/CApplicationToolbar'
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'

export default {
  components: {
    CApplicationToolbar,
  },

  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'applications' ],
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
      const params = {
        query: this.params.query,
        ...this.stdPagingParams(ctx),
      }

      return this.$SystemAPI.applicationList(params).then(({ set, filter } = {}) => {
        // Push new router/params
        this.$router.push({ name: 'application.list', query: this.params })

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
