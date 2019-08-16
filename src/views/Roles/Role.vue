<template>
  <b-form @submit.prevent="onSubmit" class="d-flex flex-column">
    <div class="sticky-top bg-white px-3 py-2 border-bottom">
      <h5 class="float-left">
        {{ $t('role.information') }}
      </h5>
      <permissions-button :title="role.name" :resource="'system:role:'+roleID" :roleID="roleID" class="float-right">{{ $t('role.manage-id-permissions') }}</permissions-button>
    </div>
    <div class="flex-grow-1 overflow-auto p-5">
      <b-form-group :label="$t('general.label.name')" label-cols-lg="1">
        <b-form-input v-model="role.name" />
      </b-form-group>
      <b-form-group :label="$t('general.label.created')" class="d-inline w-50">
        <b-form-text>{{ role.createdAt }}</b-form-text>
      </b-form-group>
      <b-form-group :label="$t('general.label.lastUpdate')" class="d-inline w-50">
        <b-form-text>{{ role.updatedAt }}</b-form-text>
      </b-form-group>

      <role-members :current-members.sync="members" class="mt-2 pt-2 border-top"></role-members>
    </div>

    <div class="sticky-bottom mb-3 bg-white p-1 border-top text-right">
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
        .finally(this.finalize)
    },

    onDelete () {
      this.processing = true
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
  height: calc(100vh - 50px);
}
</style>
