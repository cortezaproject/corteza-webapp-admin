<template>
  <header
    v-if="!framed"
    class="d-flex py-2 px-3 bg-primary text-light align-items-center"
  >
    <h1 class="m-0">
      {{ appName }}
    </h1>
    <div
      class="flex-fill text-center"
    >
      <b-spinner
        v-if="isLoading"
        variant="light"
        type="grow"
        small
      />
    </div>

    <div
      class="text-right ml-auto"
    >
      <p class="m-0 d-inline">
        {{ userLabel }}
      </p>
      <a
        href="/auth/logout"
        class="text-white ml-3 h5"
      >
        <font-awesome-icon
          :icon="['fas', 'power-off']"
        />
      </a>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoading: 'ui/isLoading',
    }),

    /**
     * Are we inside a (i)frame?
     *
     * @returns {boolean}
     */
    framed () {
      try {
        return window.self !== window.top
      } catch (e) {
        return true
      }
    },

    userLabel () {
      return this.$auth.user.name || this.$auth.user.handle || this.$auth.user.email
    },

    appName () {
      /* eslint-disable no-undef */
      return WEBAPP
    },
  },
}
</script>
