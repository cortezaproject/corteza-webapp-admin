<template>
  <div>
    <b-modal
      :visible="visible"
      size="lg"
      :title="(func || {}).label"
      :ok-title="$t('filters.modal.ok')"
      body-class="p-0"
      cancel-variant="link"
      @ok="onSave"
      @hidden="onHidden"
    >
      <div
        class="card-body"
      >
        <b-row>
          <b-col>
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
      default: () => ({}),
    },

    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      filteredFields: [],
      statusList: [
        {
          value: 'Active',
          text: this.$t('filters.modal.statusActive'),
        },
        {
          value: 'Disabled',
          text: this.$t('filters.modal.statusDisabled'),
        },
      ],
      updated: false,
    }
  },

  methods: {
    onSave () {
      this.$emit('submit', { ...this.func, updated: this.updated })
    },
    onHidden () {
      this.$emit('reset')
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
