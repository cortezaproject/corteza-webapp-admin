<template>
  <b-form-group
    :label="label"
  >
    <b-form-input
      :value="value"
      @update="$emit('update', $event)"
    />
  </b-form-group>
</template>

<script>
// <b-form-input
//   :value="typeof controls.value === 'function' ? controls.value(currentProps) : controls.value"
//   @update="controls.handle(currentProps, $event)"
// />
export default {
  props: {
    label: {
      required: true,
      type: String,
    },
    value: {
      type: String,
      default: () => '',
    },
  },
}
</script>
