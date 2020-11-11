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
        </b-row>
      </b-container>
    </template>

    <!--
      Card footer
    -->
    <template #footer>
      <b-button-group
        size="sm"
        class="float-right"
      >
        <b-button
          variant="outline-secondary"
          :disabled="hasPrevPage"
          @click="goToPage()"
        >
          {{ $t('pagination.first') }}
        </b-button>
        <b-button
          :disabled="hasPrevPage"
          @click="goToPage('prevPage')"
        >
          {{ $t('pagination.prev') }}
        </b-button>
        <b-button
          :disabled="hasNextPage"
          @click="goToPage('nextPage')"
        >
          {{ $t('pagination.next') }}
        </b-button>
      </b-button-group>
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

    items: {
      type: Function,
      required: true,
    },
  },

  i18nOptions: {
    keyPrefix: 'general',
  },

  computed: {
    hasPrevPage () {
      return !this.paging.prevPage
    },

    hasNextPage () {
      return !this.paging.nextPage
    },
  },

  methods: {
    goToPage (page) {
      let pageCursor = this.paging[page] || ''
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, pageCursor } })
    },
  },
}
</script>
