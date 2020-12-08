export default {
  methods: {
    canPairNodes () {
      return !!(this.access.find(({ resource, operation }) => resource === 'federation' && operation === 'pair') || {}).allow
    },
  },
}
