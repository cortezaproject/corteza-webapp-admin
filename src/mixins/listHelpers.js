import _ from 'lodash'

export function loadQueryParams (qp = {}, p = {}) {
  return {
    query: qp.query || p.query,
    perPage: parseInt(qp.perPage) || p.perPage,
    page: parseInt(qp.page) || p.page,
    sortBy: qp.sortBy,
    sortDesc: qp.sortDesc === 'false',
  }
}

export function stdPagingParams (p) {
  return {
    perPage: p.perPage,
    page: p.currentPage,
    sort: p.sortBy ? `${p.sortBy} ${p.sortDesc ? 'DESC' : 'ASC'}` : undefined,
  }
}

export default {
  data () {
    return {
      error: null,

      totalItems: 0,

      params: {
        query: null,
        perPage: 30,
        page: 4,
        sortBy: 'id',
        sortDesc: true,
      },
    }
  },

  create () {
    this.params = loadQueryParams(this.$route.query, this.params)
  },

  methods: {
    search: _.debounce(function () {
      this.$root.$emit('bv::refresh::table', 'resource-list')
    }, 300),

    stdPagingParams,
  },
}
