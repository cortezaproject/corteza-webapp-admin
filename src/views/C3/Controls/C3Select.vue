<template>
  <!-- <b-form-select
    v-model="current.props.queue.consumer"
    :options="current.props.consumers"
    :value="current.props.queue.consumer"
  /> -->
  <div />
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
