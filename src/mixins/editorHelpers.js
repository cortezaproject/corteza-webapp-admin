import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      incLoader: 'ui/incLoader',
      decLoader: 'ui/decLoader',
    }),

    stdReject (error) {
      this.$store.dispatch('ui/appendAlert', error)
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
