<template>
  <div>
    <b-modal
      :id="'filterModal'+step"
      ok-only
      size="lg"
      :title="(func || {}).label"
      :ok-title="$t('filters.modal.ok')"
      body-class="p-0"
      @ok="onSave"
    >
      <div
        class="card-body"
      >
        <b-row>
          <b-col
            cols="6"
          >
            <b-form-group
              label="Filter name"
            >
              <b-form-input
                v-model="(func || {}).label"
                class="w-100"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="6"
          >
            <b-form-group
              label="Status"
            >
              <b-form-select
                v-model="(func || {}).status"
                class="w-100"
                :options="statusList"
                @change="onUpdated"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <c-filter-params
          :params="(func || {}).params"
          :label="(func || {}).label"
          @paramsUpdated="onParamsUpdated"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import CFilterParams from 'corteza-webapp-admin/src/components/Route/CFilterParams'

export default {
  components: {
    CFilterParams,
  },

  props: {

    func: {
      type: Object,
      default: () => {},
    },
    step: {
      type: Number,
      default: () => 0,
    },
  },
  data () {
    return {
      filteredFields: [],
      statusList: [
        {
          value: 'Active',
          text: 'Active',
        },
        {
          value: 'Disabled',
          text: 'Disabled',
        },
      ],
      updated: false,
    }
  },
  created () {

  },
  methods: {
    onSave () {
      if (this.updated) {
        this.$emit('updateFilter', { ...this.func, updated: true })
      }
      this.showModal = false
    },
    onParamsUpdated () {
      this.onUpdated()
    },
    onUpdated () {
      this.updated = true
    },
  },
}
</script>
