import { debounce } from 'lodash'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      totalItems: 0,

      /**
       * Placeholder, if component does not define own filter
       */
      filter: {},

      paging: {
        perPage: 30,
        page: 1,
      },

      sorting: {
        sortBy: 'id',
        sortDesc: true,
      },
    }
  },

  created () {
    let qp = { ...this.$route.query }

    this.paging.page = parseInt(qp.page) || this.paging.page
    this.paging.perPage = parseInt(qp.perPage) || this.paging.perPage

    this.sorting.sortBy = qp.sortBy || this.sorting.sortBy
    this.sorting.sortDesc = qp.sortDesc === 'false'

    for (let k in qp) {
      if (this.filter[k] !== undefined) {
        this.filter[k] = qp[k]
      }
    }
  },

  methods: {
    ...mapActions({
      incLoader: 'ui/incLoader',
      decLoader: 'ui/decLoader',
    }),

    filterList: debounce(function () {
      // reset paging when filtering changes
      //
      // we want to prevent situations with page is preset to a number that
      // exceeds the number of pages of a filtered results
      this.paging.page = 1

      // notify b-table about the change
      //
      // this effectively calls items()/procListResults()
      this.$root.$emit('bv::refresh::table', 'resource-list')
    }, 300),

    /**
     * Encode list params
     * @returns {{perPage: *, page: *, sort: (string|*)}}
     */
    encodeListParams () {
      const { sortBy, sortDesc } = this.sorting

      return {
        ...this.filter,
        ...this.paging,
        sort: sortBy ? `${sortBy} ${sortDesc ? 'DESC' : 'ASC'}` : undefined,
      }
    },

    encodeRouteParams () {
      return {
        query: {
          ...this.paging,
          ...this.sorting,
          ...this.filter,
        },
      }
    },

    /**
     *
     * @param p {Promise}
     * @returns {Promise}
     */
    procListResults (p) {
      this.incLoader()

      // Push new router/params to cause URL change
      //
      // We want this because in case when user refreshes or shares URL
      // he needs to land on the same page with the same parameters
      this.$router.push(this.encodeRouteParams())

      //
      return p.then(({ set, filter } = {}) => {
        // Update total items counter
        this.totalItems = filter.count
        return set
      }).catch((error) => {
        this.$store.dispatch('ui/appendAlert', error)
      }).finally(() => {
        this.decLoader()
      })
    },
  },
}
