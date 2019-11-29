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

  watch: {
    /**
     * When fullPath for this component changes, we most likely should update our
     * filters.
     * @todo make this.filter reactive
     */
    '$route.fullPath': {
      handler: function () {
        this.handleQueryParams()
      },
    },
  },

  created () {
    this.handleQueryParams()
  },

  methods: {
    ...mapActions({
      incLoader: 'ui/incLoader',
      decLoader: 'ui/decLoader',
    }),

    /**
     * Parses query params into list filtering params.
     */
    handleQueryParams () {
      // Paging
      const { perPage = this.paging.perPage, page = this.paging.page, ...r1 } = this.$route.query
      this.paging = { perPage, page }

      // Sorting
      const { sortBy = this.sorting.sortBy, sortDesc = this.sorting.sortDesc, ...r2 } = r1
      this.sorting = { sortBy, sortDesc: sortDesc === true || sortDesc === 'true' }

      // Filtering
      this.filter = { ...this.filter, ...r2 }
    },

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

    stdReject (error) {
      this.$store.dispatch('ui/appendAlert', error)
    },
  },
}
