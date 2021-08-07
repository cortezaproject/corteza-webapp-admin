<template>
  <b-form-radio
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
