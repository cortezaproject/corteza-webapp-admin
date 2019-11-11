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
      :processing="processingInfo"
      @submit="onInfoSubmit"
    />
    <c-user-editor-password
      v-if="user && user.userID"
      :user-i-d="user.userID"
    />
    <c-user-editor-roles
      v-if="user && user.userID"
      :user-i-d="user.userID"
      :current-roles.sync="userRoles"
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
      processingInfo: false,

      user: {},
      userRoles: [],
      userStatus: false,

      password: '',
      confirmPassword: '',

      error: null,
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

      this.$SystemAPI.userRead({ userID: this.userID })
        .then(user => {
          this.user = user
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchUserRoles () {
      this.error = null

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

    onDelete () {
      this.error = null

      this.$SystemAPI.userDelete({ userID: this.userID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'users' })
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    /**
     * Handles user info submit event, calls user update or create API endpoint
     * and handles response & errors
     *
     * @param user {Object}
     */
    onInfoSubmit (user) {
      this.procesingInfo = true

      const payload = { ...user }

      if (payload.userID) {
        // On update, reset the user obj
        this.$SystemAPI.userUpdate(payload)
          .then(u => {
            this.user = u
            this.procesingInfo = false
          })
          .catch(this.stdReject)
      } else {
        // On creation, redirect to edit page
        this.$SystemAPI.userCreate(payload)
          .then(({ userID }) => {
            this.procesingInfo = false
            this.$router.push({ name: 'users.user', params: { userID } })
          })
          .catch(this.stdReject)
      }
    },

    onRoleSubmit () {
      this.error = null

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

    onPasswordSubmit () {
      this.error = null

      const { userID } = this.user
      this.$SystemAPI.userSetPassword({ userID, password: this.password })
        .then(() => {
          this.password = ''
          this.confirmPassword = ''
        })
        .catch(this.stdReject)
        .finally(this.finalize)
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
    },
  },
}
</script>
