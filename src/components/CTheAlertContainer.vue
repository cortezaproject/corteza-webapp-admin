<template>
  <b-container>
    <b-alert
      v-for="({ message }, i) in alerts"
      :key="i"
      show
      dismissible
      variant="danger shadow-sm mx-3 mt-1 p-3"
      @dismissed="remove(i)"
    >
      {{ message }}
    </b-alert>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CTheAlertContainer',

  computed: {
    ...mapGetters({
      alerts: 'ui/alerts',
    }),
  },

  methods: {
    ...mapActions({
      remove: 'ui/removeAlert',
    }),
  },
}
</script>
