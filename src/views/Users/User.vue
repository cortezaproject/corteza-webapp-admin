<template>
  <div class="user-form">
    <b-form @submit.prevent="onUserSubmit">
      <div class="header">
        <router-link :to="{ name: 'users' }" class="float-right"><b-button-close></b-button-close></router-link>
        <h2 class="header-subtitle header-row">
          {{ $t('user.information') }}
        </h2>
      </div>
      <div class="user">
        <b-form-group :label="$t('user.email')" label-cols="3">
          <b-form-input v-model="user.email" required type="email" />
        </b-form-group>

        <b-form-group :label="$t('user.fullName')" label-cols="3">
          <b-form-input v-model="user.name" required />
        </b-form-group>

        <b-form-group :label="$t('user.handle')" label-cols="3">
          <b-form-input v-model="user.handle" />
        </b-form-group>

        <b-form-group :label="$t('user.kind')" horizontal v-if="false">
          <b-form-text>{{ user.kind }}</b-form-text>
        </b-form-group>

        <b-form-group v-if="userID" label-cols="3">
          <permissions-button :title="user.name" :resource="'system:user:'+user.userID">{{ $t('user.manage-id-permissions') }}</permissions-button>
        </b-form-group>

        <b-form-group :label="$t('general.label.lastUpdate')" label-cols="3" v-if="userID && user.updatedAt">
          <b-form-text>{{ user.updatedAt }}</b-form-text>
        </b-form-group>

        <b-form-group :label="$t('general.label.created')" label-cols="3" v-if="userID">
          <b-form-text>{{ user.createdAt }}</b-form-text>
        </b-form-group>

        <b-form-group :label="$t('user.suspendedAt')" label-cols="3" v-if="userID && user.suspendedAt">
          <b-form-text>{{ user.suspendedAt }}</b-form-text>
        </b-form-group>
      </div>
      <div class="footer">
        <confirmation-toggle v-if="userID" :disabled="processing" @confirmed="onDelete">{{ $t('user.delete') }}</confirmation-toggle>
        <confirmation-toggle v-if="userID" :disabled="processing" @confirmed="onStatusChange" ctaClass="secondary">{{ statusButtonTitle }}</confirmation-toggle>
        <b-button type="submit" variant="primary" :disabled="processing" class="ml-3">{{ $t('general.label.submit') }}</b-button>
      </div>
    </b-form>

    <b-form v-if="userID" @submit.prevent="onPasswordSubmit">
      <h2 class="header-subtitle header-row">
        {{ $t('user.password.change') }}
      </h2>
      <b-form-group :label="$t('user.password.new')" label-cols="3">
        <b-form-input v-model="user.password" required type="password" />
      </b-form-group>

      <b-form-group :label="$t('user.password.confirm')" label-cols="3">
        <b-form-input v-model="user.confirmPassword" required type="password" />
      </b-form-group>
      <div class="footer">
        <span class="mr-5" v-if="user.confirmPassword && user.password !== user.confirmPassword">
          {{ $t('user.password.missmatch') }}
        </span>
        <b-button v-if="userID" type="submit" variant="primary" :disabled="processing || user.password !== user.confirmPassword" class="ml-10">
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>

    <b-form v-if="userID" @submit.prevent="onRoleSubmit">
      <h2 class="header-subtitle header-row">
        {{ $t('user.roles.manage') }}
      </h2>

      <user-roles v-if="userID" :current-roles.sync="userRoles"/>

      <div class="footer">
        <b-button v-if="userID" type="submit" variant="primary" :disabled="processing" class="ml-10">
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import ConfirmationToggle from '@/components/ConfirmationToggle'
import UserRoles from '@/components/UserRoles'

export default {
  components: {
    ConfirmationToggle,
    UserRoles,
  },

  props: {
    userID: {
      type: String,
      required: false,
    },
  },

  data () {
    return {
      processing: false,
      user: {},
      userRoles: [],
      userStatus: false,
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
      this.processing = true
      this.$SystemAPI.userRead({ userID: this.userID }).then(user => {
        this.user = user
      })
        .catch(this.stdReject)
        .finally(() => {
          this.processing = false
        })
    },

    fetchUserRoles () {
      this.processing = true
      this.userRoles = []
      const userID = this.userID
      this.$SystemAPI.roleList().then(roles => {
        this.$SystemAPI.userMembershipList({ userID }).then(m => {
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
    },

    onDelete () {
      this.processing = true
      this.$SystemAPI.userDelete({ userID: this.userID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'users' })
        })
        .catch(this.stdReject)
    },

    onUserSubmit () {
      this.processing = true
      const payload = { ...this.user }
      if (this.userID) {
        this.$SystemAPI.userUpdate(payload)
          .then(this.handler)
          .catch(this.stdReject)
      } else {
        this.$SystemAPI.userCreate(payload)
          .then(this.handler)
          .then(({ userID }) => {
            this.$router.push({ name: 'users.user', params: { userID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.processing = false
          })
      }
    },

    onRoleSubmit () {
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
      })).then(() => {
        this.fetchUserRoles()
      })
    },

    onStatusChange () {
      this.processing = true
      const userID = this.userID
      if (this.user.suspendedAt) {
        this.$SystemAPI.userUnsuspend({ userID })
          .catch(this.stdReject)
          .finally(() => {
            this.fetchUser()
          })
      } else {
        this.$SystemAPI.userSuspend({ userID })
          .catch(this.stdReject)
          .finally(() => {
            this.fetchUser()
          })
      }
    },

    onPasswordSubmit () {
      this.processing = true
      const { userID, password } = this.user
      this.$SystemAPI.userSetPassword({ userID, password })
        .catch(this.stdReject)
        .finally(() => {
          this.user.password = ''
          this.user.confirmPassword = ''
          this.processing = false
        })
    },

    stdReject ({ message = null } = {}) {
      this.error = message
      this.processing = false
      // TODO create alerts
    },

    handler (user) {
      this.processing = false

      // Inform parent component about user changes
      // @todo solve this with vuex
      this.$emit('update')
      if (user) {
        this.user = user
      }
      return Promise.resolve(user)
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
