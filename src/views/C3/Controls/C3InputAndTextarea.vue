<template>
  <b-form-input
    :value="typeof controls.value === 'function' ? controls.value(currentProps) : controls.value"
    @update="controls.handle(currentProps, $event)"
  />
</template>

<script>
export default {
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
}
</script>
