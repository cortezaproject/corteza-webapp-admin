<template>
  <div class="user-form">
    <b-form @submit.prevent="onSubmit">
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

        <b-form-group :label="$t('user.status')" label-cols="3" v-if="userID">
          <b-form-checkbox
            id="status"
            v-if="userID"
            v-model="userStatus"
            name="status"
            value="suspended">
            {{ $t('user.suspended') }}
          </b-form-checkbox>
        </b-form-group>

        <b-form-group :label="$t('user.suspendedAt')" label-cols="3" v-if="userID && user.suspendedAt">
          <b-form-text>{{ user.suspendedAt }}</b-form-text>
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
        <user-roles v-if="userID" :current-roles.sync="userRoles" class="roles"></user-roles>
      </div>
      <div class="footer">
        <confirmation-toggle v-if="userID" @confirmed="onDelete">{{ $t('user.delete') }}</confirmation-toggle>
        <b-button type="submit" variant="primary" :disabled="processing" class="ml-3">{{ $t('general.label.submit') }}</b-button>
      </div>
    </b-form>

    <b-form v-if="userID" @submit.prevent="onPasswordChange" class="mt-4">
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
  </div>
</template>

<script>
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'
import UserRoles from '@/components/UserRoles'

const systemRoles = [
  '1', // Everyone
]

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

  watch: {
    userID: {
      immediate: true,
      handler () {
        if (this.userID) {
          this.fetchUser()
        }
      },
    },
  },

  methods: {
    fetchUser () {
      this.processing = true
      this.$SystemAPI.userRead({ userID: this.userID }).then(user => {
        this.user = user
        this.userStatus = this.user.suspendedAt ? 'suspended' : false
      }).then(this.fetchUserRoles())
        .catch(this.stdReject)
    },

    fetchUserRoles () {
      this.processing = true
      this.userRoles = []
      this.$SystemAPI.roleList()
        .then(rr => rr.filter(r => systemRoles.indexOf(r.roleID) === -1))
        .then(roles => {
          // Get user roles
          roles.forEach(r => {
            this.$SystemAPI.roleRead({ roleID: r.roleID }).then(r => {
              this.$SystemAPI.roleMemberList(r).then(rl => {
                let status = ''
                if (rl.indexOf(this.userID) > -1) {
                  status = 'member'
                }
                this.userRoles.push({ ...r, status: status })
              })
            })
          })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.processing = false
        })
    },

    onDelete () {
      this.processing = true
      this.$SystemAPI.userDelete({ userID: this.userID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'users' })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.processing = false
        })
    },

    async onSubmit () {
      this.processing = true

      const payload = { ...this.user }

      if (this.userID) {
        const userID = this.userID

        // Suspend/unsuspend user
        if (this.userStatus) {
          this.$SystemAPI.userSuspend({ userID })
            .catch(this.stdReject)
        } else {
          this.$SystemAPI.userUnsuspend({ userID })
            .catch(this.stdReject)
        }

        // Update changed roles
        for (let role of this.userRoles) {
          if (['add', 'member-remove'].indexOf(role.status) > -1) {
            let payload = ''
            let members = await this.$SystemAPI.roleMemberList(role)
            if (role.status === 'add') {
              members.push(userID)
              payload = { ...role, members }
            } else if (role.status === 'member-remove') {
              payload = { ...role, members: members.filter(m => m !== userID) }
            }
            await this.$SystemAPI.roleUpdate(payload)
          }
        }

        // Finally update user
        this.$SystemAPI.userUpdate(payload)
          .catch(this.stdReject)
          .finally(this.fetchUser())
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

    onPasswordChange () {
      this.processing = true
      const { userID, password } = this.user
      this.$SystemAPI.userSetPassword({ userID, password })
        .catch(this.stdReject)
        .finally(() => {
          this.fetchUser()
          this.processing = false
        })
    },

    stdReject ({ message = null } = {}) {
      this.error = message
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
  margin-bottom: 10px;

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

    .roles {
      min-height: 130px;
    }
  }
}

</style>
