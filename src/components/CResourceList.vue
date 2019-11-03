<template>
  <b-card
    no-body
    class="shadow-sm m-2"
  >
    <b-card-body
      class="p-0"
    >
      <b-table
        id="resource-list"
        hover
        class="mb-0"
        head-variant="light"
        :primary-key="primaryKey"
        :sort-by.sync="params.sortBy"
        :sort-desc.sync="params.sortDesc"
        :per-page="params.perPage"
        :current-page.sync="params.page"
        :items="items"
        :fields="fields"
      >
        <template v-slot:table-busy>
          <!-- set bust=true to enable/test this -->
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
        >

        <template v-slot:cell(actions)="row">
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

    <template v-slot:header>
      <b-container class="p-0">
        <b-row no-gutters>
          <b-col lg="6">
            <slot
              name="filter"
            />
          </b-col>
          <b-col lg="6">
            <b-pagination
              v-model="params.page"
              class="flex-fill m-0 align-self-end"
              :total-rows="totalItems"
              :disabled="totalItems===0"
              :per-page.sync="params.perPage"
              limit="10"
              align="right"
              aria-controls="resource-list"
            />
          </b-col>
        </b-row>
      </b-container>
    </template>

    <!--
      Show bottom paging when min-items > 0 && items > min-items
    -->
    <template v-slot:footer>
      <b-container class="p-0">
        <b-row no-gutters>
          <b-col lg="6">
            <span class="text-secondary">
              {{ totalItems }} record(s) found.
            </span>
          </b-col>
          <b-col lg="6">
            <b-pagination
              v-model="params.page"
              class="flex-fill m-0 align-self-end"
              :total-rows="totalItems"
              :disabled="totalItems===0"
              :per-page.sync="params.perPage"
              limit="10"
              align="right"
              aria-controls="resource-list"
            />
          </b-col>
        </b-row>
      </b-container>
    </template>
  </b-card>
</template>
<script>

export function loadQueryParams (qp = {}, p = {}) {
  return {
    query: qp.query || p.query,
    perPage: parseInt(qp.perPage) || p.perPage,
    page: parseInt(qp.page) || p.page,
    sortBy: qp.sortBy,
    sortDesc: qp.sortDesc === 'false',
  }
}

export function stdPagingParams (ctx) {
  return {
    perPage: ctx.perPage,
    page: ctx.currentPage,
    sort: ctx.sortBy ? `${ctx.sortBy} ${ctx.sortDesc ? 'DESC' : 'ASC'}` : undefined,
  }
}

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

    params: {
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
}
</script>
