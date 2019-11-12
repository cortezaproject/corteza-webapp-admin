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
      :processing="processing || info.processing"
      :success="info.success"
      @submit="onInfoSubmit"
      @delete="onDelete"
      @status="onStatusChange"
    />
    <c-user-editor-password
      v-if="user && user.userID"
      :processing="processing || password.processing"
      :success="password.success"
      @submit="onPasswordSubmit"
    />
    <c-user-editor-roles
      v-if="user && user.userID"
      :processing="processing || roles.processing"
      :success="roles.success"
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
      user: {},
      userRoles: [],

      info: {
        processing: false,
        success: false,
      },
      password: {
        processing: false,
        success: false,
      },
      roles: {
        processing: false,
        success: false,
      },

      processing: false,
      error: null,
    }
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
      this.info.processing = true

      const payload = { ...user }

      if (payload.userID) {
        // On update, reset the user obj
        this.$SystemAPI.userUpdate(payload)
          .then(u => {
            this.user = u
            this.toggleSuccess('info')
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        // On creation, redirect to edit page
        this.$SystemAPI.userCreate(payload)
          .then(({ userID }) => {
            this.$router.push({ name: 'user.edit', params: { userID } })
            this.toggleSuccess('info')
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
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
        .then(() => {
          this.$router.push({ name: 'user.list' })
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
      this.password.processing = true

      this.$SystemAPI.userSetPassword({ userID: this.userID, password })
        .then(() => {
          this.toggleSuccess('password')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.password.processing = false
        })
    },

    /**
     * Handles user role submit event, calls membership add or remove API endpoint
     * and handles response & errors
     */
    onRoleSubmit () {
      this.error = null
      this.roles.processing = true

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
        .then(() => {
          this.fetchUserRoles()
          this.toggleSuccess('roles')
        })
        .catch(this.stdReject)
        .finally(() => {
          this.roles.processing = false
        })
    },

    onStatusChange () {
      this.error = null
      this.info.processing = true

      const userID = this.userID
      if (this.user.suspendedAt) {
        this.$SystemAPI.userUnsuspend({ userID })
          .then(() => {
            this.fetchUser()
            this.toggleSuccess('info')
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$SystemAPI.userSuspend({ userID })
          .then(() => {
            this.fetchUser()
            this.toggleSuccess('info')
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },

    stdReject (error) {
      this.$store.dispatch('ui/appendAlert', error)
    },

    toggleSuccess (key) {
      this[key].success = true
      setTimeout(() => {
        this[key].success = false
      }, 2000)
    },

    finalize () {
      this.processing = false
    },
  },
}
</script>
