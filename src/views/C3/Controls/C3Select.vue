<template>
  <!-- <b-form-select
    v-model="current.props.queue.consumer"
    // array of consumers
    :options="current.props.consumers"
    // currently selected consumer
    :value="current.props.queue.consumer"
  /> -->
  <b-form-group
    :label="label"
  >
    <b-form-select
      :options="value"
    />
  </b-form-group>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
      type: String,
    },
    value: {
      default: () => [],
      type: Array,
    },
  },
}
</script>
