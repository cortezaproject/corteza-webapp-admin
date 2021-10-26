<template>
  <div>
    <b-form-group
      v-if="filter.params.length"
      class="w-100 mb-0"
    >
      <template
        v-for="(param, index) in filter.params"
      >
        <b-form-group
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
            <b-input-group v-else>
              <b-input-group-prepend
                v-if="param.label === 'expr'"
              >
                <b-button
                  variant="dark"
                >
                  ƒ
                </b-button>
              </b-input-group-prepend>
              <b-form-input
                v-model="param.value"
                @change="onUpdate"
              />
            </b-input-group>
          </template>
          <template
            v-if="filter.ref === 'header'"
            #description
          >
            {{ $t('filters.headerExamples.first') }}
            <br>
            {{ $t('filters.headerExamples.second') }}
            <b-button
              variant="link"
              size="sm"
              class="d-flex p-0"
              @click="openExpressionsHelp()"
            >
              {{ $t('filters.headerExamples.more') }}
            </b-button>
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
    filter: {
      type: Object,
      default: () => ({}),
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
    if (this.filter.params.some(({ label = '' }) => label === 'workflow')) {
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

    openExpressionsHelp () {
      const helpRoute = this.$router.resolve({ name: 'field.expressions.help' })
      window.open(`${helpRoute.href}#valueExpressions`, '_blank',
        `toolbar=no,
                                    location=no,
                                    status=no,
                                    menubar=no,
                                    scrollbars=yes,
                                    resizable=yes,
                                    width=960px,
                                    height=1080px`)
    },
  },
}
</script>
