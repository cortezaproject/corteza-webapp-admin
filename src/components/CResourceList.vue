<template>
  <b-card
    no-body
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-card-body
      class="p-0"
    >
      <b-table
        id="resource-list"
        hover
        responsive
        class="mb-0"
        head-variant="light"
        :primary-key="primaryKey"
        :sort-by.sync="sorting.sortBy"
        :sort-desc.sync="sorting.sortDesc"
        :per-page="paging.perPage"
        :current-page.sync="paging.page"
        :items="items"
        :fields="fields"
        no-sort-reset
      >
        <template #table-busy>
          <div class="text-center m-5">
            <div>
              <b-spinner
                small
                class="align-middle m-2"
              />
            </div>
            <div>{{ loadingText }}</div>
          </div>
        </template>
        <template #cell(actions)="row">
          <b-button
            size="sm"
            variant="link"
            :to="{ name: editRoute, params: { [primaryKey]: row.item[primaryKey] } }"
          >
            <font-awesome-icon
              :icon="['fas', 'pen']"
            />
          </b-button>
        </template>
      </b-table>
    </b-card-body>

    <!--
      Card header
    -->
    <template #header>
      <b-container
        class="p-0"
        fluid
      >
        <b-row
          align-v="end"
        >
          <b-col
            lg="9"
          >
            <slot
              name="filter"
            />
          </b-col>
          <b-col
            lg="3"
            class="text-right align-text-bottom text-secondary"
            v-html="totalText"
          />
        </b-row>
      </b-container>
    </template>

    <!--
      Card footer
    -->
    <template #footer>
      <b-pagination-nav
        v-model="paging.page"
        use-router
        align="right"
        aria-controls="resource-list"
        class="m-0 overflow-auto"
        :number-of-pages="numberOfPages"
        :link-gen="paginationLinkGenerator"
        :disabled="paginationDisabled"
      />
    </template>
  </b-card>
</template>
<script>

export default {
  name: 'CResourceList',

  props: {
    loadingText: {
      type: String,
      default: 'Loading',
    },

    totalText: {
      type: String,
      default: '',
    },

    editRoute: {
      type: String,
      required: true,
    },

    primaryKey: {
      type: String,
      required: true,
    },

    sorting: {
      type: Object,
      required: true,
    },

    paging: {
      type: Object,
      required: true,
    },

    fields: {
      type: Array,
      required: true,
    },

    totalItems: {
      type: Number,
      required: true,
    },

    bottomPaginationMinItems: {
      type: Number,
      default: 5,
    },

    items: {
      type: Function,
      required: true,
    },
  },

  computed: {
    /**
     * Disable pagination when there we have less items than we show per-page
     *
     * @returns {boolean}
     */
    paginationDisabled () {
      return this.totalItems < this.paging.perPage
    },

    /**
     * Calculate number of pages
     *
     * Never returns value lower than 1
     *
     * @returns {number}
     */
    numberOfPages () {
      const n = Math.ceil(this.totalItems / this.paging.perPage)
      return n > 0 ? n : 1
    },
  },

  methods: {
    /**
     * Returns (partial) router params, combined with existing query parameters
     * @param page
     * @returns {{query: {page: *}}}
     */
    paginationLinkGenerator (page) {
      return {
        query: {
          ...this.$route.query,
          page,
        },
      }
    },
  },
}
</script>
