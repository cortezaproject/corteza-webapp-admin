<template>
  <div v-if="func">
    <div
      class="form d-flex flex-column"
    >
      <c-function-params
        :params="func.params"
      />
    </div>
    <b-button
      variant="primary"
      class="mb-2 d-flex ml-auto"
      size="sm"
      @click="onSingleFunctionSubmit"
    >
      Submit function
    </b-button>
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
    // Currently for testing purposes of single function only
    onSingleFunctionSubmit (func) {
      console.log(func)
      this.$SystemAPI.functionCreate({ ...func, route: '12345' })
        .then(() => {
          console.log('Sucess')
        })
        .catch(this.stdReject)
        .finally(() => {
          console.log('Finally')
        })
    },
  },
}
</script>
