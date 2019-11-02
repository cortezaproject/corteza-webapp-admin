<template>
  <main class="p-3">
    <b-container fluid>
      <b-row class="m-0">
        <h1>
          {{ $t('label') }}
          <b-badge
            class="rounded-pill"
          >
            {{ totalItems }}
          </b-badge>
        </h1>
      </b-row>
      <b-row class="m-0">
        <b-button-toolbar
          class="text-right"
        >
          <b-button-group>
            <b-button variant="link">
              New
            </b-button>
          </b-button-group>
          <b-button-group>
            <b-button variant="link">
              Permissions
            </b-button>
          </b-button-group>
          <b-dropdown
            variant="link"
            right

            menu-class="shadow-sm"
            text="Export"
          >
            <b-dropdown-item-button variant="link">
              YAML
            </b-dropdown-item-button>
          </b-dropdown>
          <b-button-group>
            <b-button variant="link">
              Help
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </b-row>
    </b-container>

    <b-card
      no-body
      class="shadow-sm border-0 m-2"
    >
      <b-card-body>
        <b-form>
          <b-form-group
            :label="$t('list.searchForm.query.label')"
          >
            <b-form-input>
              <b-form-input />
            </b-form-input>
          </b-form-group>
        </b-form>
      </b-card-body>
      <b-card-body
        class="p-0 m-0"
      >
        <b-table
          id="applications"
          hover
          head-variant="dark"
          primary-key="applicationID"
          :sort-by.sync="params.sortBy"
          :sort-desc.sync="params.sortDesc"
          :per-page="params.perPage"
          :current-page.sync="params.page"
          :items="items"
          :fields="fields"
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle" />
              <strong>Loading...</strong>
            </div>
          </template>

          <template v-slot:cell(enabled)="row">
            {{ row.value ? '&checkmark;' : '' }}
          </template>

          <template v-slot:cell(actions)="row">
            <b-button
              size="sm"
              variant="link"
              :to="{ name: 'applications.editor', params: { applicationID: row.item.applicationID } }"
            >
              <font-awesome-icon
                :icon="['fas', 'pen']"
              />
            </b-button>
          </template>
        </b-table>
      </b-card-body>

      <template v-slot:footer>
        <b-pagination
          v-model="params.page"
          :total-rows="totalItems"
          :disabled="totalItems===0"
          :per-page.sync="params.perPage"
          limit="10"
          align="right"
          aria-controls="applications"
        />
      </template>
    </b-card>
  </main>
</template>

<script>
import * as moment from 'moment'

export default {
  i18nOptions: {
    namespaces: [ 'applications' ],
  },

  data () {
    return {
      error: null,

      totalItems: 0,

      params: {
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

  create () {
    // Pull params from route query
    const { perPage, page, sortBy, sortDesc } = this.$route.query
    this.params = {
      // and values from query-string
      perPage: parseInt(perPage) || this.params.perPage,
      page: parseInt(page) || this.params.page,
      sortBy,
      sortDesc: sortDesc === 'false',
    }
  },

  methods: {
    items (ctx) {
      const params = {
        query: ctx.filter,
        perPage: ctx.perPage,
        page: ctx.currentPage,
        sort: ctx.sortBy ? `${ctx.sortBy} ${ctx.sortDesc ? 'DESC' : 'ASC'}` : undefined,
      }

      this.$router.push({ name: 'applications', query: this.params })

      return this.$SystemAPI.applicationList(params).then(({ set, filter } = {}) => {
        this.totalItems = filter.count
        return set
      }).catch(({ message }) => {
        console.log(message)
      })
    },

  },
}
</script>
