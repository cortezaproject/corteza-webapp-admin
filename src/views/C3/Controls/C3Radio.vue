<template>
  <b-form-radio
    class="pl-1 form-check-input text-center"
    :value="data.value(currentProps)"
    @change="data.handle(currentProps, $event)"
  />
</template>

<script>
export default {
  props: {
    data: {
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
