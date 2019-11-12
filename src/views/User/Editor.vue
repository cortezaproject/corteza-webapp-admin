<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <b-button-group>
        <b-button
          variant="link"
          :to="{ name: 'user.new' }"
        >
          New &blk14;
        </b-button>
      </b-button-group>
      <b-button-group>
        <permissions-button
          title="Users"
          resource="system:users:*"
          button-variant="link"
        >
          Permissions &blk14;
        </permissions-button>
      </b-button-group>
    </c-content-header>

    <c-user-editor-info
      :user="user"
      :processing="processing"
      @submit="onInfoSubmit"
      @delete="onDelete"
    />
    <c-user-editor-password
      v-if="user && user.userID"
      :user-i-d="user.userID"
      :processing="processing"
      @submit="onPasswordSubmit"
    />
    <c-user-editor-roles
      v-if="user && user.userID"
      :user-i-d="user.userID"
      :processing="processing"
      :current-roles.sync="userRoles"
      @submit="onRoleSubmit"
    />
  </b-container>
</template>

<script>
import CUserEditorInfo from 'corteza-webapp-admin/src/components/User/CUserEditorInfo'
import CUserEditorPassword from 'corteza-webapp-admin/src/components/User/CUserEditorPassword'
import CUserEditorRoles from 'corteza-webapp-admin/src/components/User/CUserEditorRoles'

export default {
  components: {
    CUserEditorRoles,
    CUserEditorPassword,
    CUserEditorInfo,
  },

  i18nOptions: {
    namespaces: [ 'users' ],
    keyPrefix: 'editor',
  },

  props: {
    userID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      processing: false,
      error: null,

      user: {},
      userRoles: [],
    }
  },

  computed: {
    statusButtonTitle () {
      return this.user.suspendedAt ? this.$t('user.activate') : this.$t('user.suspend')
    },
  },

  watch: {
    userID: {
      immediate: true,
      handler () {
        if (this.userID) {
          this.fetchUser()
          this.fetchUserRoles()
        }
      },
    },
  },

  methods: {
    fetchUser () {
      this.error = null
      this.processing = true

      this.$SystemAPI.userRead({ userID: this.userID })
        .then(user => {
          this.user = user
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchUserRoles () {
      this.error = null
      this.processing = true

      this.userRoles = []
      const userID = this.userID
      this.$SystemAPI.roleList().then(({ set: roles = [] }) => {
        this.$SystemAPI.userMembershipList({ userID }).then((m = []) => {
          let userRoles = []
          roles.forEach(r => {
            let { roleID } = r
            if (roleID !== '1') {
              let current = false
              if (m.indexOf(roleID) > -1) {
                current = true
              }
              userRoles.push({ ...r, current: current, dirty: current })
            }
          })
          this.userRoles = userRoles
        }).catch(this.stdReject)
      }).catch(this.stdReject)
        .finally(this.finalize)
    },

    /**
     * Handles user info submit event, calls user update or create API endpoint
     * and handles response & errors
     *
     * @param user {Object}
     */
    onInfoSubmit (user) {
      this.processing = true

      const payload = { ...user }

      if (payload.userID) {
        // On update, reset the user obj
        this.$SystemAPI.userUpdate(payload)
          .then(u => {
            this.user = u
            this.processing = false
          })
          .catch(this.stdReject)
          .finally(this.finalize)
      } else {
        // On creation, redirect to edit page
        this.$SystemAPI.userCreate(payload)
          .then(({ userID }) => {
            this.processing = false
            this.$router.push({ name: 'users.user', params: { userID } })
          })
          .catch(this.stdReject)
          .finally(this.finalize)
      }
    },

    /**
     * Handles user delete event, calls user delete API endpoint
     * and handles response & errors
     */
    onDelete () {
      this.error = null
      this.processing = true

      this.$SystemAPI.userDelete({ userID: this.userID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'users' })
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    /**
     * Handles user password submit event, calls set password API endpoint
     * and handles response & errors
     *
     * @param password {String}
     */
    onPasswordSubmit (password) {
      this.error = null
      this.processing = true

      this.$SystemAPI.userSetPassword({ userID: this.userID, password })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    /**
     * Handles user role submit event, calls membership add or remove API endpoint
     * and handles response & errors
     */
    onRoleSubmit () {
      this.error = null
      this.processing = true

      const userID = this.userID
      Promise.all(this.userRoles.map(async role => {
        let { roleID, current, dirty } = role
        if (dirty !== current) {
          if (dirty) {
            return this.$SystemAPI.userMembershipAdd({ roleID, userID })
          } else {
            return this.$SystemAPI.userMembershipRemove({ roleID, userID })
          }
        }
      }))
        .then(this.fetchUserRoles)
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    onStatusChange () {
      this.error = null
      this.processing = true

      const userID = this.userID
      if (this.user.suspendedAt) {
        this.$SystemAPI.userUnsuspend({ userID })
          .then(() => {
            this.fetchUser()
          })
          .catch(this.stdReject)
          .finally(this.finalize)
      } else {
        this.$SystemAPI.userSuspend({ userID })
          .then(() => {
            this.fetchUser()
          })
          .catch(this.stdReject)
          .finally(this.finalize)
      }
    },

    stdReject (error) {
      this.$store.dispatch('ui/appendAlert', error)
    },

    handler (user) {
      // Inform parent component about user changes
      // @todo solve this with vuex
      this.$emit('update')
      if (user) {
        this.user = user
      }
      return Promise.resolve(user)
    },

    finalize () {
      this.processing = false
    },
  },
}
</script>
