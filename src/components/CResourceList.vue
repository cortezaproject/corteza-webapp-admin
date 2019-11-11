<template>
  <b-card
    no-body
    class="shadow-sm"
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
        :sort-by.sync="params.sortBy"
        :sort-desc.sync="params.sortDesc"
        :per-page="params.perPage"
        :current-page.sync="params.page"
        :items="items"
        :fields="fields"
      >
        <template v-slot:table-busy>
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

    <!--
      Card header
    -->
    <template v-slot:header>
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
    <template v-slot:footer>
      <b-pagination
        v-model="params.page"
        class="m-0 overflow-auto"
        :total-rows="totalItems"
        :disabled="paginationDisabled"
        :per-page.sync="params.perPage"
        limit="7"
        align="right"
        aria-controls="resource-list"
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

  computed: {
    paginationDisabled () {
      return this.totalItems < this.params.perPage
    },
  },
}
</script>
