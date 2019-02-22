<template>
    <b-form-group>
      <b-form-radio-group buttons
                          v-model="selected"
                          :disabled="!enabled"
                          :button-variant="variant"
                          :options="permissionOptions" />
    </b-form-group>
</template>

<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },

    value: {
      type: String,
      required: false,
    },

    current: {
      type: String,
      required: false,
    },
  },

  computed: {
    isChanged () {
      return this.selected !== this.current
    },

    variant () {
      return this.isChanged ? 'outline-warning' : 'outline-info'
    },

    selected: {
      get () {
        return this.value
      },

      set (sel) {
        if (this.value !== sel) {
          this.$emit('change', sel)
        }

        this.$emit('update:value', sel)
      },
    },
  },

  data () {
    return {
      permissionOptions: [
        { text: 'Allow', value: 'allow' },
        { text: 'Inherit', value: 'inherit' },
        { text: 'Deny', value: 'deny' },
      ],
    }
  },
}
</script>
