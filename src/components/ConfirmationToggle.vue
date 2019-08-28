<template>
  <div class="d-inline">
    <b-button v-if="!inConfirmation"
              class="mr-1"
              :variant="ctaClass"
              @click.prevent="onPrompt"
              :disabled="disabled"><slot></slot></b-button>
    <div v-if="inConfirmation" class="d-inline">
      <b-button :variant="confirmationClass" @click.prevent="onConfirmation()">{{ $t('general.label.yes') }}</b-button>
      <b-button variant="secondary" @click.prevent="inConfirmation=false">{{ $t('general.label.no') }}</b-button>
    </div>
  </div>
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
