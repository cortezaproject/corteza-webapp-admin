<template>
  <span>
    <span v-if="!inConfirmation">
      <b-button :variant="ctaClass" @click.prevent="onPrompt" :disabled="disabled"><slot></slot></b-button>
    </span>
    <span v-if="inConfirmation">
      <b-button :variant="confirmationClass" @click.prevent="onConfirmation()">{{ $t('general.label.yes') }}</b-button>
      <b-button variant="secondary" @click.prevent="inConfirmation=false">{{ $t('general.label.no') }}</b-button>
    </span>
  </span>
</template>
<script>
export default {
  props: {
    ctaClass: { type: String, default: 'danger' },
    confirmationClass: { default: 'danger' },
    disabled: Boolean,
    noPrompt: Boolean,
  },

  data () {
    return {
      inConfirmation: false,
    }
  },

  methods: {
    onPrompt () {
      if (this.noPrompt) {
        this.$emit('confirmed')
      } else {
        this.inConfirmation = true
      }
    },

    onConfirmation () {
      this.inConfirmation = false
      this.$emit('confirmed')
    },
  },
}
</script>
<style scoped lang="scss">
.btn {
  margin: 0 1px;
}

.btn-url {
  color: $danger;
  text-decoration: none;

  &:hover {
    color: $danger;

    .icon-trash {
      font-weight: 900;
    }
  }
}
</style>
