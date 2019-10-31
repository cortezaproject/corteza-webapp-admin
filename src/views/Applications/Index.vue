<template>
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
</template>

<script>
import * as moment from 'moment'

export default {
  data () {
    return {
      error: null,

      totalItems: 0,

      params: {
        perPage: 30,
        page: 4,
        sortBy: 'createdAt',
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
