<template>
  <b-form-checkbox
    class="pl-1 form-check-input text-center"
    :checked="controls.value(currentProps)"
    @change="controls.handle(currentProps, $event)"
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
