<template>
  <div>
    <c3-input-and-textarea
      v-if="controls.type === 'b-form-input' || controls.type === 'b-form-textarea'"
      :current-props="currentProps"
      :controls="controls"
      v-bind="currentProps"
    />
    <c3-checkbox
      v-if="controls.type === 'b-form-checkbox'"
      :current-props="currentProps"
      :controls="controls"
    />
    <!-- <c3-select
      v-if="controls.type === 'b-form-select'"
      :current-props="currentProps"
      :controls="controls"
    />
    <c3-radio
      v-if="controls.type === 'b-form-radio'"
      :current-props="currentProps"
      :controls="controls"
    /> -->
  </div>
</template>

<script>
import C3InputAndTextarea from './C3InputAndTextarea.vue'
import C3Checkbox from './C3Checkbox.vue'
// import C3Radio from './C3Radio.vue'
// import C3Select from './C3Select.vue'

export default {
  components: {
    C3InputAndTextarea,
    C3Checkbox,
    // C3Radio,
    // C3Select,
  },
  props: {
    controls: {
      required: true,
      type: Object,
    },
    currentProps: {
      required: true,
      type: Object,
    },
  },
  mounted () {
    // console.log(this.controls)
  },
}
</script>
