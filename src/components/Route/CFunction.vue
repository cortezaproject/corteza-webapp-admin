<template>
  <div v-if="func">
    <div
      class="form d-flex flex-column"
    >
      <c-function-params
        :params="func.params"
        @paramsUpdated="onParamsUpdated"
      />
    </div>
  </div>
</template>
<script>
import CFunctionParams from 'corteza-webapp-admin/src/components/Route/CFunctionParams'

export default {
  components: {
    CFunctionParams,
  },
  props: {
    func: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
    }
  },
  methods: {
    onParamsUpdated () {
      this.$emit('updateFunction', { ...this.func, updated: true })
    },
  },
}
</script>
