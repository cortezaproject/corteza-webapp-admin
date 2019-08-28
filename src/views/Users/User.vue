<template>
  <div class="user-form vh-100 overflow-auto">
    <b-form @submit.prevent="onUserSubmit" class="d-flex flex-column">
      <div class="sticky-top bg-white px-3 py-2 border-bottom">
        <h5 class="float-left">
          {{ $t('user.information') }}
        </h5>
        <span class="float-right">
          <permissions-button :title="user.name" :resource="'system:user:'+user.userID">{{ $t('user.manage-id-permissions') }}</permissions-button>
        </span>
      </div>
      <div class="user flex-grow-1 overflow-auto px-5 pt-5 pb-1">
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

        <b-form-group :label="$t('general.label.lastUpdate')" label-cols="3" v-if="userID && user.updatedAt">
          <b-form-text>{{ user.updatedAt }}</b-form-text>
        </b-form-group>

        <b-form-group :label="$t('general.label.created')" label-cols="3" v-if="userID">
          <b-form-text>{{ user.createdAt }}</b-form-text>
        </b-form-group>

        <b-form-group :label="$t('user.suspendedAt')" label-cols="3" v-if="userID && user.suspendedAt">
          <b-form-text>{{ user.suspendedAt }}</b-form-text>
        </b-form-group>
        <div class="text-right">
          <confirmation-toggle v-if="userID" :disabled="processing" @confirmed="onDelete">{{ $t('user.delete') }}</confirmation-toggle>
          <confirmation-toggle v-if="userID" :disabled="processing" @confirmed="onStatusChange" ctaClass="secondary">{{ statusButtonTitle }}</confirmation-toggle>
          <b-button type="submit" variant="primary" :disabled="processing">{{ $t('general.label.submit') }}</b-button>
        </div>
      </div>
    </b-form>

    <b-form v-if="userID" @submit.prevent="onPasswordSubmit" class="px-5 py-1 border-top">
      <h2 class="header-subtitle header-row">
        {{ $t('user.password.change') }}
      </h2>
      <b-form-group :label="$t('user.password.new')" label-cols="3">
        <b-form-input v-model="user.password"
                      autocomplete="new-password"
                      required
                      type="password" />
      </b-form-group>

      <b-form-group :label="$t('user.password.confirm')" label-cols="3">
        <b-form-input v-model="user.confirmPassword"
                      autocomplete="new-password"
                      required
                      type="password" />
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

    <b-form v-if="userID" @submit.prevent="onRoleSubmit" class="px-5 py-1 border-top mb-5">
      <h2 class="header-subtitle header-row">
        {{ $t('user.roles.manage') }}
      </h2>

      <user-roles v-if="userID" :current-roles.sync="userRoles"/>

      <div class="footer mb-5">
        <b-button v-if="userID" type="submit" variant="primary" :disabled="processing" class="ml-10">
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import UserRoles from 'corteza-webapp-admin/src/components/UserRoles'

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
      this.$SystemAPI.userRead({ userID: this.userID })
        .then(user => {
          this.user = user
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    fetchUserRoles () {
      this.processing = true
      this.userRoles = []
      const userID = this.userID
      this.$SystemAPI.roleList().then((roles = []) => {
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
      const userID = this.userID
      let endpoint
      if (this.user.suspendedAt) {
        endpoint = this.$SystemAPI.userSuspend
      } else {
        endpoint = this.$SystemAPI.userUnsuspend
      }

      endpoint({ userID })
        .then(() => {
          this.fetchUser()
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    onPasswordSubmit () {
      this.processing = true
      const { userID, password } = this.user
      this.$SystemAPI.userSetPassword({ userID, password })
        .then(() => {
          this.user.password = ''
          this.user.confirmPassword = ''
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

form {

  .footer {
    flex: 1;
    text-align: right;
    margin: 10px 0;
  }
}

</style>
