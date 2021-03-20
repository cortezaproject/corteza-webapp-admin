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
      let msg = 'An error occurred'

      if (typeof error === 'object' && error.message) {
        msg = error.message
      } else {
        msg = error.toString()
      }

      // And showing the toast
      this.$bvToast.toast(msg, {
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
