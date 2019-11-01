<template>
  <main>
    <h1>
      {{ $t('label') }}
      <b-badge>
        {{ totalItems }}
      </b-badge>
    </h1>
    <b-card-group>
      <b-card>
        <b-card-title>
          {{ $t('intro.title') }}
        </b-card-title>
        <b-card-body>
          {{ $t('intro.text') }}
        </b-card-body>
      </b-card>
      <b-card>
        <b-card-title>
          {{ $t('quickAdd.title') }}
        </b-card-title>
        <b-card-body>
          <b-form>
            <b-form-group
              :label="$t('quickAdd.form.name.label')"
              :description="$t('quickAdd.form.name.description')"
            >
              <b-input-group>
                <b-form-input />
                <b-button>&raquo;</b-button>
              </b-input-group>
            </b-form-group>
          </b-form>
        </b-card-body>
      </b-card>
    </b-card-group>
    <b-card
      no-body
      class="shadow border-0 m-5"
    >
      <b-table
        id="applications"
        hover
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

        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            :to="{ name: 'applications.editor', params: { applicationID: row.item.applicationID } }"
          >
            E
          </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="params.page"
        :total-rows="totalItems"
        :disabled="totalItems===0"
        :per-page.sync="params.perPage"
        limit="10"
        align="right"
        aria-controls="applications"
      />
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
