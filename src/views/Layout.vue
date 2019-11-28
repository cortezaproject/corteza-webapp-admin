<template>
  <div
    class="d-flex flex-column vh-100 bg-light"
  >
    <small
      class="p-1 text-secondary position-absolute version"
    >
      {{ frontendVersion }}
    </small>

    <c-the-header />

    <!-- do not show the main section if user is not authenticated -->
    <div
      v-if="$auth.is()"
      class="d-flex flex-row overflow-hidden"
    >
      <c-the-main-nav
        :access="access"
      />

      <main
        class="flex-fill overflow-auto pb-5"
      >
        <c-the-alert-container />
        <router-view />
        <permissions-modal />
      </main>
    </div>
    <div
      v-else
      class="loader"
    >
      <div
        v-if="error"
        class="error text-danger h1 text-center vw-100"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>
<script>
import CTheAlertContainer from 'corteza-webapp-admin/src/components/CTheAlertContainer'
import CTheHeader from 'corteza-webapp-admin/src/components/CTheHeader'
import CTheMainNav from 'corteza-webapp-admin/src/components/CTheMainNav'
import { PermissionsModal } from 'corteza-webapp-common/components'

export default {
  components: {
    PermissionsModal,
    CTheAlertContainer,
    CTheHeader,
    CTheMainNav,
  },

  data () {
    return {
      error: null,
      access: [],
    }
  },

  computed: {
    frontendVersion () {
      /* eslint-disable no-undef */
      return VERSION
    },
  },

  /**
   * This is the base admin layout
   *
   * Redirect to /auth if user is not authenticated
   */
  beforeCreate () {
    this.$store.dispatch('ui/incLoader')

    this.$auth.check(this.$SystemAPI)
      .then(() => {
        this.$SystemAPI.permissionsEffective()
          .then(rules => {
            this.access = rules
            if (!rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'access' && allow)) {
              this.error = this.$t('auth.noAccess')
            }
            this.$ComposeAPI.permissionsEffective()
              .then(rules => {
                this.access = this.access.concat(rules)
                this.$MessagingAPI.permissionsEffective()
                  .then(rules => {
                    this.access = this.access.concat(rules)
                  })
              })
          })
      }).catch((e) => {
        this.$auth.open()
      }).finally(() => {
        this.$store.dispatch('ui/decLoader')
      })
  },
}
</script>
<style lang="scss" scoped>
.version {
  bottom: 0;
  right: 0;
}
.error {
  position: absolute;
  top: 50vh;
}
</style>
