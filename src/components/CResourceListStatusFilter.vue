<template>
  <b-col>
    <b-form-radio-group
      v-model="$attrs.value"
      v-bind="$attrs"
      :options="[
        { value: 0, text: $attrs['excluded-label'] || 'excluded' },
        { value: 1, text: $attrs['inclusive-label'] || 'inclusive' },
        { value: 2, text: $attrs['exclusive-label'] || 'exclusive' }
      ]"
      buttons
      button-variant="outline-secondary"
      size="sm"
      name="radio-btn-outline"
      v-on="$listeners"
    />
    {{ $attrs.label }}
  </b-col>
</template>

<script>
export default {
  name: 'CResourceListStatusFilter',
}
</script>
