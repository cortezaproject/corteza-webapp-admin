<template>
  <b-form @submit.prevent="onSubmit">
    <div class="header">
      <router-link :to="{ name: 'roles' }" class="float-right"><b-button-close></b-button-close></router-link>
      <h2 class="header-subtitle header-row">
        {{ $t('role.information') }}
      </h2>
    </div>
    <div class="role">
      <b-form-group :label="$t('general.label.name')" label-cols="3">
        <b-form-input v-model="role.name" />
      </b-form-group>

      <b-form-group label-cols="3">
        <permissions-button :title="role.name" :resource="'system:role:'+roleID" :roleID="roleID">{{ $t('role.manage-id-permissions') }}</permissions-button>
      </b-form-group>

      <b-form-group :label="$t('general.label.lastUpdate')" label-cols="3">
        <b-form-text>{{ role.updatedAt }}</b-form-text>
      </b-form-group>

      <b-form-group :label="$t('general.label.created')" label-cols="3">
        <b-form-text>{{ role.createdAt }}</b-form-text>
      </b-form-group>
      <role-members :current-members.sync="members"></role-members>
    </div>

    <div class="footer">
      <confirmation-toggle @confirmed="onDelete">{{ $t('role.delete') }}</confirmation-toggle>
      <b-button type="submit" variant="primary" :disabled="processing">{{ $t('general.label.submit') }}</b-button>
    </div>
  </b-form>
</template>

<script>
import RoleMembers from 'corteza-webapp-admin/src/components/RoleMembers'
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'

export default {
  components: {
    ConfirmationToggle,
    RoleMembers,
  },

  props: {
    roleID: {
      type: String,
      required: false,
    },
  },

  data () {
    return {
      processing: false,
      error: null,
      role: {},
      members: [],
    }
  },

  watch: {
    roleID: {
      immediate: true,
      handler () {
        if (this.roleID) {
          this.fetchRole()
        }
      },
    },
  },

  methods: {
    fetchRole () {
      this.processing = true
      this.$SystemAPI.roleRead({ roleID: this.roleID })
        .then(r => {
          this.role = r
          return this.$SystemAPI.roleMemberList(r)
        })
        .then((mm) => { this.members = mm })
        .catch(this.stdReject)
        .finally(() => {
          this.processing = false
        })
    },

    onDelete () {
      this.processing = true
      this.$SystemAPI.roleDelete({ roleID: this.roleID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'roles' })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.processing = false
        })
    },

    onSubmit () {
      this.processing = true

      const payload = { ...this.role, members: this.members }

      if (this.roleID) {
        this.$SystemAPI.roleUpdate(payload)
          .then(this.handler)
          .catch(this.stdReject)
          .finally(() => {
            this.processing = false
          })
      } else {
        this.$SystemAPI.roleCreate(payload)
          .then(this.handler)
          .then(({ roleID }) => {
            this.$router.push({ name: 'roles.role', params: { roleID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.processing = false
          })
      }
    },

    stdReject ({ message = null } = {}) {
      this.error = message
    },

    handler (role) {
      // Inform parent component about role changes
      // @todo solve this with vuex
      this.$emit('update')
      this.role = role

      return Promise.resolve(role)
    },
  },
}
</script>
<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);

  .header {
    flex: 1;
    height: 150px;
  }

  .footer {
    flex: 1;
    text-align: right;
    height: 150px;
  }

  .role {
    flex: 1;
    flex-grow: 100;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 2px;
  }
}

</style>
