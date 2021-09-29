<template>
  <div>
    <b-form-group
      v-if="params.length"
      class="w-100 mt-3 mb-0 font-weight-bold"
    >
      <template
        v-for="(param, index) in params"
      >
        <b-form-group
          :key="index"
          :label="$t(`filters.labels.${param.label}`)"
        >
          <!-- TODO create multi field component-->
          <b-form-checkbox
            v-if="param.type === 'bool'"
            v-model="param.value"
            @change="paramsUpdated()"
          />
          <vue-select
            v-else-if="param.type === 'workflow'"
            v-model="params.value"
            :options="workflows"
            :reduce="wf => wf.workflowID"
            :placeholder="$t('filters.placeholders.workflow')"
            @input="paramsUpdated()"
          />
          <template v-else>
            <b-form-textarea
              v-if="param.label === 'jsfunc'"
              v-model="param.value"
              max-rows="6"
              @change="paramsUpdated()"
            />
            <b-form-input
              v-else
              v-model="param.value"
              @change="paramsUpdated()"
            />
          </template>
        </b-form-group>
      </template>
    </b-form-group>
  </div>
</template>

<script>
import { VueSelect } from 'vue-select'

export default {
  components: {
    VueSelect,
  },

  props: {
    params: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: () => '',
    },
  },

  data () {
    return {
      workflows: [],
    }
  },

  created () {
    if (this.params.some(({ type = '' }) => type === 'workflow')) {
      this.$AutomationAPI.workflowList()
        .then(({ set: workflows = [] }) => {
          this.workflows = workflows.map(({ workflowID, handle, meta }) => {
            return { label: meta.name || handle, workflowID }
          })
        })
    }
  },

  methods: {
    paramsUpdated () {
      this.$emit('paramsUpdated')
    },
  },
}
</script>
