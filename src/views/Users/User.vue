<template>
  <div class="user-form">
    <b-form @submit.prevent="onUserSubmit">
      <div class="header">
        <router-link
          :to="{ name: 'users' }"
          class="float-right"
        >
          <b-button-close />
        </router-link>
        <h2 class="header-subtitle header-row">
          {{ $t('user.information') }}
        </h2>
      </div>

      <div
        v-if="error"
        class="bg-danger alert text-white"
      >
        {{ error }}
      </div>

      <div class="user">
        <b-form-group
          :label="$t('user.email')"
          label-cols="2"
        >
          <b-form-input
            v-model="user.email"
            required
            type="email"
          />
        </b-form-group>

        <b-form-group
          :label="$t('user.fullName')"
          label-cols="2"
        >
          <b-form-input
            v-model="user.name"
            required
          />
        </b-form-group>

        <b-form-group
          :label="$t('user.handle')"
          label-cols="2"
        >
          <b-form-input v-model="user.handle" />
        </b-form-group>

        <b-form-group
          v-if="false"
          :label="$t('user.kind')"
          horizontal
        >
          <b-form-text>{{ user.kind }}</b-form-text>
        </b-form-group>

        <b-form-group
          v-if="userID"
          label-cols="2"
        >
          <permissions-button
            :title="user.name"
            :resource="'system:user:'+user.userID"
          >
            {{ $t('user.manage-id-permissions') }}
          </permissions-button>
        </b-form-group>

        <b-form-group
          v-if="userID && user.updatedAt"
          :label="$t('general.label.lastUpdate')"
          label-cols="2"
        >
          <b-form-text>{{ user.updatedAt }}</b-form-text>
        </b-form-group>

        <b-form-group
          v-if="userID"
          :label="$t('general.label.created')"
          label-cols="2"
        >
          <b-form-text>{{ user.createdAt }}</b-form-text>
        </b-form-group>

        <b-form-group
          v-if="userID && user.suspendedAt"
          :label="$t('user.suspendedAt')"
          label-cols="2"
        >
          <b-form-text>{{ user.suspendedAt }}</b-form-text>
        </b-form-group>
      </div>
      <div class="footer">
        <confirmation-toggle
          v-if="userID"
          :disabled="processing"
          @confirmed="onDelete"
        >
          {{ $t('user.delete') }}
        </confirmation-toggle>
        <confirmation-toggle
          v-if="userID"
          :disabled="processing"
          cta-class="secondary"
          @confirmed="onStatusChange"
        >
          {{ statusButtonTitle }}
        </confirmation-toggle>
        <b-button
          :disabled="processing"
          type="submit"
          variant="primary"
          class="ml-3"
        >
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>

    <b-form
      v-if="userID"
      @submit.prevent="onPasswordSubmit"
    >
      <h2 class="header-subtitle header-row">
        {{ $t('user.password.change') }}
      </h2>
      <b-form-group
        :label="$t('user.password.new')"
        label-cols="2"
      >
        <b-form-input
          v-model="password"
          :state="passwordState"
          autocomplete="new-password"
          required
          type="password"
        />
      </b-form-group>

      <b-form-group
        :label="$t('user.password.confirm')"
        label-cols="2"
      >
        <b-form-input
          v-model="confirmPassword"
          :state="confirmPasswordState"
          autocomplete="new-password"
          required
          type="password"
        />
      </b-form-group>
      <div class="footer">
        <span
          v-if="confirmPasswordState === false"
          class="mr-5"
        >
          {{ $t('user.password.missmatch') }}
        </span>
        <b-button
          v-if="userID"
          :disabled="processing || user.password !== user.confirmPassword"
          type="submit"
          variant="primary"
          class="ml-10"
        >
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>

    <b-form
      v-if="userID"
      @submit.prevent="onRoleSubmit"
    >
      <h2 class="header-subtitle header-row">
        {{ $t('user.roles.manage') }}
      </h2>

      <user-roles
        v-if="userID"
        :current-roles.sync="userRoles"
      />

      <div class="footer">
        <b-button
          v-if="userID"
          :disabled="processing"
          type="submit"
          variant="primary"
          class="ml-10"
        >
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import UserRoles from 'corteza-webapp-admin/src/components/UserRoles'

/**
 * @todo find a way to get this number from the backend
 * @type {number}
 */
const minPasswordLength = 4

export default {
  components: {
    ConfirmationToggle,
    UserRoles,
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
