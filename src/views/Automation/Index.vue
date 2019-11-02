<template>
  <main class="px-3 py-5">
    <c-header
      :title="$t('label')"
      :total="totalItems"
    >
      <c-automation-script-toolbar />
    </c-header>

    <b-card
      no-body
      class="shadow-sm border-0 m-2"
    >
      <b-card-body
        class="p-0 m-0"
      >
        <b-table
          :id="id"
          hover
          head-variant="light"
          primary-key="automationScriptID"
          :sort-by.sync="params.sortBy"
          :sort-desc.sync="params.sortDesc"
          :per-page="params.perPage"
          :current-page.sync="params.page"
          :items="items"
          :fields="fields"
        >
          <template v-slot:table-busy>
            <div class="text-center m-5">
              <b-spinner class="align-middle" />
              <strong>Loading...</strong>
            </div>
          </template>
          >

          <template v-slot:cell(enabled)="row">
            {{ row.value ? '&checkmark;' : '' }}
          </template>

          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              variant="link"
              :to="{ name: 'automationScripts.editor', params: { automationScriptID: row.item.automationScriptID } }"
            >
              <font-awesome-icon
                :icon="['fas', 'pen']"
              />
            </b-button>
          </template>
        </b-table>
      </b-card-body>

      <template v-slot:header>
        <div class="d-flex flex-columns">
          <b-form-group
            :label="$t('list.searchForm.query.label')"
          >
            <b-input-group>
              <b-form-input
                v-model.trim="params.query"
                :placeholder="$t('list.searchForm.query.placeholder')"
                @keyup="search"
              />
            </b-input-group>
          </b-form-group>

          <b-pagination
            v-model="params.page"
            class="flex-fill"
            :total-rows="totalItems"
            :disabled="totalItems===0"
            :per-page.sync="params.perPage"
            limit="10"
            align="right"
            aria-controls="automationScripts"
          />
        </div>
      </template>
    </b-card>
  </main>
</template>

<script>
import * as moment from 'moment'
import _ from 'lodash'
import CAutomationScriptToolbar from '../../components/CAutomationScriptToolbar'
import CHeader from '../../components/CHeader'

export default {
  components: { CHeader, CAutomationScriptToolbar },
  i18nOptions: {
    namespaces: [ 'automationScripts' ],
  },

  data () {
    return {
      id: 'automationScripts',

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
    // Pull params from route query
    const { query, perPage, page, sortBy, sortDesc } = this.$route.query
    this.params = {
      query: query || this.params.query,
      perPage: parseInt(perPage) || this.params.perPage,
      page: parseInt(page) || this.params.page,
      sortBy,
      sortDesc: sortDesc === 'false',
    }
  },

  methods: {
    search: _.debounce(function () {
      this.$root.$emit('bv::refresh::table', this.id)
    }, 300),

    items (ctx) {
      const params = {
        query: this.params.query,
        perPage: ctx.perPage,
        page: ctx.currentPage,
        sort: ctx.sortBy ? `${ctx.sortBy} ${ctx.sortDesc ? 'DESC' : 'ASC'}` : undefined,
      }

      return this.$SystemAPI.automationScriptList(params).then(({ set, filter } = {}) => {
        // Push new router/params
        this.$router.push({ name: 'automation-scripts', query: this.params })

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
