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
        v-if="func"
        class="card-body"
      >
        <c-filter-params
          :params="func.params"
          :label="func.label"
          @update="onUpdate"
        />
        <b-form-checkbox
          v-model="func.enabled"
          @change="onUpdate"
        >
          {{ $t('filters.enabled') }}
        </b-form-checkbox>
      </div>
    </b-modal>
  </div>
</template>

<script>
import CFilterParams from 'corteza-webapp-admin/src/components/Apigw/CFilterParams'

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
      updated: false,

      filteredFields: [],
    }
  },

  methods: {
    onSave () {
      this.$emit('submit', { ...this.func, updated: this.updated })
      this.updated = false
    },

    onHidden () {
      this.$emit('reset')
    },

    onUpdate () {
      this.updated = true
    },
  },
}
</script>
