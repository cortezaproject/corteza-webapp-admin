<template>
  <div>
    <b-form-group
      label="Params"
      class="w-100 mt-3 mb-0 font-weight-bold"
    >
      <template
        v-for="(param, index) in params"
      >
        <b-form-group
          :key="index"
          :label="param.label"
          label-cols="4"
        >
          <!-- TODO create multi field component-->
          <b-form-checkbox
            v-if="param.type==='bool'"
            v-model="param.value"
          />
          <b-form-input
            v-else
            v-model="param.value"
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
  watch: {
    params: {
      handler () {
        this.$emit('paramsUpdated')
      },
      deep: true,
    },
  },
}
</script>
