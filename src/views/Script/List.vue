<template>
  <main class="px-3 py-5">
    <c-header
      :title="$t('label')"
      :total="totalItems"
    >
      <c-script-toolbar />
    </c-header>

    <c-error :error="error" />

    <c-resource-list
      primary-key="scriptID"
      edit-route="script.edit"
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
import CScriptToolbar from 'corteza-webapp-admin/src/components/CScriptToolbar'
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'

export default {
  components: {
    CScriptToolbar,
  },

  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'scripts' ],
  },

  data () {
    return {
      id: 'automationScripts',

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

      return this.$SystemAPI.automationScriptList(params).then(({ set, filter } = {}) => {
        // Push new router/params
        this.$router.push({ name: 'script.list', query: this.params })

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
