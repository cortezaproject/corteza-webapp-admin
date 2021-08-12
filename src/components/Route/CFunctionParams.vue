<template>
  <div>
    <b-form-group
      class="w-100 mt-3 mb-0 font-weight-bold"
    >
      <template
        v-for="(param, index) in params"
      >
        <b-form-group
          :key="index"
          :label="$t(`functions.labels.${param.label}`)"
        >
          <!-- TODO create multi field component-->
          <b-form-checkbox
            v-if="param.type==='bool'"
            v-model="param.value"
            @change="paramsUpdated()"
          />
          <b-form-input
            v-else
            v-model="param.value"
            @change="paramsUpdated()"
          />
        </b-form-group>
      </template>
    </b-form-group>
  </div>
</template>

<script>
export default {
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
  methods: {
    paramsUpdated () {
      this.$emit('paramsUpdated')
    },
  },
}
</script>
