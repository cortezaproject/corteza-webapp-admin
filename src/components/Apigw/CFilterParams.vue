<template>
  <div>
    <b-form-group
      v-if="params.length"
      class="w-100 mb-0"
    >
      <template
        v-for="(param, index) in params"
      >
        <c-headers
          v-if="label === 'Header'"
          :key="index"
          :params="params"
          @update="onUpdate"
        />
        <b-form-group
          v-else
          :key="index"
          :label="$t(`filters.labels.${param.label}`)"
        >
          <!-- TODO create multi field component-->
          <b-form-checkbox
            v-if="param.type === 'bool'"
            v-model="param.value"
            @change="onUpdate"
          />
          <vue-select
            v-else-if="param.label === 'workflow'"
            v-model="param.value"
            :options="workflows"
            :reduce="wf => wf.workflowID"
            :placeholder="$t('filters.placeholders.workflow')"
            @input="onUpdate"
          />
          <b-form-select
            v-else-if="param.label === 'status'"
            v-model="param.value"
            :options="httpStatusOptions"
            @change="onUpdate"
          >
            <template #first>
              <b-form-select-option
                :value="undefined"
              >
                {{ $t('filters.httpStatus.none') }}
              </b-form-select-option>
            </template>
          </b-form-select>
          <template v-else>
            <b-form-textarea
              v-if="param.label === 'jsfunc'"
              v-model="param.value"
              max-rows="6"
              @change="onUpdate"
            />
            <b-form-input
              v-else
              v-model="param.value"
              @change="onUpdate"
            />
          </template>
        </b-form-group>
      </template>
    </b-form-group>
  </div>
</template>

<script>
import { VueSelect } from 'vue-select'
import CHeaders from 'corteza-webapp-admin/src/components/Apigw/CHeaders'

export default {
  components: {
    VueSelect,
    CHeaders,
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

      httpStatusOptions: [
        { value: 300, text: this.$t('filters.httpStatus.300') },
        { value: 301, text: this.$t('filters.httpStatus.301') },
        { value: 302, text: this.$t('filters.httpStatus.302') },
        { value: 303, text: this.$t('filters.httpStatus.303') },
        { value: 304, text: this.$t('filters.httpStatus.304') },
        { value: 307, text: this.$t('filters.httpStatus.307') },
        { value: 308, text: this.$t('filters.httpStatus.308') },
      ],
    }
  },

  created () {
    if (this.params.some(({ label = '' }) => label === 'workflow')) {
      this.$AutomationAPI.workflowList()
        .then(({ set: workflows = [] }) => {
          this.workflows = workflows.map(({ workflowID, handle, meta }) => {
            return { label: meta.name || handle, workflowID }
          })
        })
    }
  },

  methods: {
    onUpdate () {
      this.$emit('update')
    },
  },
}
</script>
