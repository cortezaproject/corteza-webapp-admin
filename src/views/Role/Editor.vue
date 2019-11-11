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
    <b-form @submit.prevent="onSubmit">
      <div class="header">
        <router-link
          :to="{ name: 'roles' }"
          class="float-right"
        >
          <b-button-close />
        </router-link>
        <h2 class="header-subtitle header-row">
          {{ $t('role.information') }}
        </h2>
      </div>

      <div
        v-if="error"
        class="bg-danger alert text-white"
      >
        {{ error }}
      </div>

      <div class="role">
        <b-form-group
          :label="$t('general.label.name')"
          label-cols="2"
        >
          <b-form-input
            v-model="role.name"
            :state="checkName"
          />
        </b-form-group>

        <b-form-group
          :label="$t('role.handle')"
          label-cols="2"
        >
          <b-form-input
            v-model="role.handle"
            :state="checkHandle"
          />
        </b-form-group>

        <b-form-group label-cols="2">
          <permissions-button
            :title="role.name"
            :resource="'system:role:'+roleID"
            :role-i-d="roleID"
          >
            {{ $t('role.manage-id-permissions') }}
          </permissions-button>
        </b-form-group>

        <b-form-group
          :label="$t('general.label.lastUpdate')"
          label-cols="2"
        >
          <b-form-text>{{ role.updatedAt }}</b-form-text>
        </b-form-group>

        <b-form-group
          :label="$t('general.label.created')"
          label-cols="2"
        >
          <b-form-text>{{ role.createdAt }}</b-form-text>
        </b-form-group>
        <role-members :current-members.sync="members" />
      </div>

      <div class="footer">
        <confirmation-toggle @confirmed="onDelete">
          {{ $t('role.delete') }}
        </confirmation-toggle>
        <b-button
          :disabled="!canSubmit"
          type="submit"
          variant="primary"
        >
          {{ $t('general.label.submit') }}
        </b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import RoleMembers from 'corteza-webapp-admin/src/components/RoleMembers'
import ConfirmationToggle from 'corteza-webapp-admin/src/components/ConfirmationToggle'

export default {
  components: {
    ConfirmationToggle,
    RoleMembers,
  },

  i18nOptions: {
    namespaces: [ 'role' ],
    keyPrefix: 'editor',
  },

  props: {
    roleID: {
      type: String,
      required: false,
      default: undefined,
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

  computed: {
    // At least 1 character
    checkName () {
      return /^.+$/.test(this.role.name || '') ? null : false
    },

    // 2+ alpha-numeric + _
    checkHandle () {
      return /^\w{2,}$/.test(this.role.handle || '') ? null : false
    },

    canSubmit () {
      return !this.processing &&
        this.checkHandle === null &&
        this.checkName === null
    },
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
      this.error = null

      this.$SystemAPI.roleRead({ roleID: this.roleID })
        .then(r => {
          this.role = r
          return this.$SystemAPI.roleMemberList(r)
        })
        .then((mm) => { this.members = mm })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    onDelete () {
      this.processing = true
      this.error = null

      this.$SystemAPI.roleDelete({ roleID: this.roleID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'roles' })
        })
        .catch(this.stdReject)
        .finally(this.finalize)
    },

    onSubmit () {
      this.processing = true
      this.error = null

      const payload = { ...this.role, members: this.members }

      if (this.roleID) {
        this.$SystemAPI.roleUpdate(payload)
          .then(this.handler)
          .catch(this.stdReject)
          .finally(this.finalize)
      } else {
        this.$SystemAPI.roleCreate(payload)
          .then(this.handler)
          .then(({ roleID }) => {
            this.$router.push({ name: 'roles.role', params: { roleID } })
          })
          .catch(this.stdReject)
          .finally(this.finalize)
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

    finalize () {
      this.processing = false
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
