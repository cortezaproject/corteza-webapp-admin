<template>
  <b-button
    type="submit"
    variant="primary"
    :disabled="disabled || processing || success"
    class="submit"
    @click.prevent="$emit('submit')"
  >
    <b-spinner
      v-if="processing"
      small
      type="grow"
    />
    <font-awesome-icon
      v-else-if="success"
      :icon="['fas', 'check']"
      class="text-white h3 mb-0"
    />
    <span
      v-else
    >
      <slot>{{ $t('submit') }}</slot>
    </span>
  </b-button>
</template>

<script>
export default {
  name: 'CSubmitButton',

  props: {
    processing: {
      type: Boolean,
      value: false,
    },

    success: {
      type: Boolean,
      value: false,
    },

    disabled: {
      type: Boolean,
      value: false,
    },
  },
}
</script>

<style>
.submit {
  min-width: 75px;
  min-height: 35px;
}
</style>
