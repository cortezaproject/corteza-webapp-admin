import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      incLoader: 'ui/incLoader',
      decLoader: 'ui/decLoader',
    }),

    stdReject (error) {
      // Logging the error
      console.error(error)

      // And showing the toast
      this.$bvToast.toast(error.toString(), {
        variant: 'danger',
        title: 'Failed to process request',
      })
    },

    /**
     * Animates a checkmark on a submit button when a request has successfully resolved
     * @param key {String}
     */
    animateSuccess (key) {
      this[key].success = true
      setTimeout(() => {
        this[key].success = false
      }, 2000)
    },
  },
}
