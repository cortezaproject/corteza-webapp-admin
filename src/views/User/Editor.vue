<template>
  <main class="px-3 py-5">
    <c-header
      :title="$t('label')"
    >
      <c-user-toolbar />
    </c-header>
    <b-container
      class="p-0"
    >
      {{ user }}
      <b-row no-gutters>
        <b-col cols="6">
          <c-user-editor-info
            :user.sync="user"
          />
          <c-user-editor-password
            :user-i-d="user.id"
          />
        </b-col>
        <b-col cols="6">
          <c-user-editor-roles
            v-if="userID"
            :current-roles.sync="userRoles"
          />
        </b-col>
      </b-row>

      <permissions-button
        :title="user.name"
        :resource="'system:user:'+user.userID"
      >
        {{ $t('user.manage-id-permissions') }}
      </permissions-button>
    </b-container>
  </main>
</template>

<script>
import CUserToolbar from 'corteza-webapp-admin/src/components/CUserToolbar'
import CHeader from 'corteza-webapp-admin/src/components/CHeader'
import CUserEditorInfo from 'corteza-webapp-admin/src/components/CUserEditorInfo'
import CUserEditorPassword from 'corteza-webapp-admin/src/components/CUserEditorPassword'
import CUserEditorRoles from 'corteza-webapp-admin/src/components/CUserEditorRoles'

/**
 * @todo find a way to get this number from the backend
 * @type {number}
 */
const minPasswordLength = 4

export default {
  components: {
    CUserEditorRoles,
    CUserEditorPassword,
    CUserEditorInfo,
    CHeader,
    CUserToolbar,
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

    passwordState () {
      if (this.password.length > 0) {
        return this.password.length > minPasswordLength
      }

      return null
    },

    confirmPasswordState () {
      if (this.password.length > 0) {
        return this.password === this.confirmPassword
      }

      return null
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
      this.processing = true
      this.error = null

      this.$SystemAPI.userRead({ userID: this.userID })
        .then(user => {
          this.user = user
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchUserRoles () {
      this.processing = true
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
          this.processing = false
        }).catch(this.stdReject)
      }).catch(this.stdReject)
        .finally(this.finalize)
    },

    onDelete () {
      this.processing = true
      this.error = null

      this.$SystemAPI.userDelete({ userID: this.userID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'users' })
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    onUserSubmit () {
      this.processing = true
      this.error = null

      const payload = { ...this.user }
      if (this.userID) {
        this.$SystemAPI.userUpdate(payload)
          .then(this.handler)
          .catch(this.stdReject)
          .finally(this.finalize)
      } else {
        this.$SystemAPI.userCreate(payload)
          .then(this.handler)
          .then(({ userID }) => {
            this.$router.push({ name: 'users.user', params: { userID } })
          })
          .catch(this.stdReject)
          .finally(this.finalize)
      }
    },

    onRoleSubmit () {
      this.processing = true
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
      this.processing = true
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
      this.processing = true
      this.error = null

      const { userID } = this.user
      this.$SystemAPI.userSetPassword({ userID, password: this.password })
        .then(() => {
          this.password = ''
          this.confirmPassword = ''
          this.processing = false
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    stdReject ({ message = null } = {}) {
      this.error = message
      // TODO create alerts
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
<style scoped lang="scss">

.user-form {
  height: 95vh;
  overflow-y: auto;
}

form {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #F3F3F5;

  .header {
    flex: 1;
  }

  .footer {
    flex: 1;
    text-align: right;
    margin: 10px 0;
  }

  .user {
    flex: 1;
    flex-grow: 100;
    overflow-x: hidden;
    padding-top: 2px;
  }

  .status {
    flex: 1;
    align-items: center;
  }
}

</style>
