<template>
  <div
    class="form d-flex flex-column"
  >
    <c-function-params
      :params="func.params"
      :label="func.label"
      @paramsUpdated="onParamsUpdated"
    />
    <b-button
      variant="light"
      :disabled="added"
      class="mb-2 d-flex mr-auto align-items-center"
      size="md"
      @click="onFunctionAdd"
    >
      <span>
        <font-awesome-icon
          :icon="['fas', 'plus']"
          size="sm"
          class="mr-1"
        />
        {{ $t('functions.add') }} {{ func.label }}
      </span>
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
    added: {
      type: Boolean,
      value: false,
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
    onFunctionAdd () {
      this.$emit('addFunction', { ...this.func, updated: true })
    },
  },
}
</script>
