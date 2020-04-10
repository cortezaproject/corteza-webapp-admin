<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    >
      <b-button-group
        v-if="roleID && canCreate"
      >
        <b-button
          variant="link"
          :to="{ name: 'system.role.new' }"
        >
          {{ $t('new') }}
        </b-button>
      </b-button-group>
      <b-button-group
        v-if="roleID && canGrant"
      >
        <c-permissions-button
          :title="role.name"
          :target="role.name"
          :resource="'system:role:'+roleID"
          button-variant="link"
        >
          {{ $t('permissions') }}
        </c-permissions-button>
      </b-button-group>

      <c-corredor-manual-buttons
        ui-page="role/editor"
        ui-slot="toolbar"
        resource-type="system:role"
        default-variant="link"
        class="mr-1"
        @click="dispatchCortezaSystemRoleEvent($event, { role })"
      />
    </c-content-header>

    <c-role-editor-info
      :role="role"
      :processing="info.processing"
      :success="info.success"
      :can-create="canCreate"
      @submit="onInfoSubmit"
      @delete="onDelete"
      @status="onStatusChange"
    />

    <c-role-editor-members
      v-if="role && role.roleID && roleMembers"
      class="mt-3"
      :processing="members.processing"
      :success="members.success"
      :current-members.sync="roleMembers"
      @submit="onMembersSubmit"
    />
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CRoleEditorInfo from 'corteza-webapp-admin/src/components/Role/CRoleEditorInfo'
import CRoleEditorMembers from 'corteza-webapp-admin/src/components/Role/CRoleEditorMembers'

export default {
  components: {
    CRoleEditorInfo,
    CRoleEditorMembers,
  },

  i18nOptions: {
    namespaces: [ 'system.roles' ],
    keyPrefix: 'editor',
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    roleID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      role: {},
      roleMembers: null,

      canCreate: false,
      canGrant: false,

      info: {
        processing: false,
        success: false,
      },
      members: {
        processing: false,
        success: false,
      },
    }
  },

  watch: {
    roleID: {
      immediate: true,
      handler () {
        this.fetchEffective()
        if (this.roleID) {
          this.fetchRole()
        } else {
          this.role = {}
        }
      },
    },
  },

  methods: {
    fetchRole () {
      this.incLoader()

      if (this.roleID === '1') {
        // Do not show editor for role everyone
        this.$router.push({ name: 'system.role.list' })
      }

      this.$SystemAPI.roleRead({ roleID: this.roleID })
        .then(r => {
          this.role = r
          return this.$SystemAPI.roleMemberList(r)
        })
        .then((mm = []) => { this.roleMembers = mm })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    fetchEffective () {
      this.incLoader()

      this.$SystemAPI.permissionsEffective()
        .then(rules => {
          this.canCreate = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'role.create').allow
          this.canGrant = rules.find(({ resource, operation, allow }) => resource === 'system' && operation === 'grant').allow
        })
        .catch(this.stdReject)
        .finally(() => {
          this.decLoader()
        })
    },

    onDelete () {
      this.incLoader()

      if (this.role.deletedAt) {
        this.$SystemAPI.roleUndelete({ roleID: this.roleID })
          .then(() => {
            this.fetchRole()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.roleDelete({ roleID: this.roleID })
          .then(() => {
            this.fetchRole()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },

    onInfoSubmit (role) {
      this.info.processing = true

      if (this.roleID) {
        this.$SystemAPI.roleUpdate(role)
          .then(role => {
            this.animateSuccess('info')
            this.role = role
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$SystemAPI.roleCreate(role)
          .then(({ roleID }) => {
            this.animateSuccess('info')
            this.$router.push({ name: 'system.role.edit', params: { roleID } })
          })
          .catch(this.stdReject)
          .finally(() => {
            this.info.processing = false
          })
      }
    },

    /**
     * Handles user status change event, calls suspend or unsuspend API endpoint
     * and handles response & errors
     */
    onStatusChange () {
      this.incLoader()

      const roleID = this.roleID

      if (this.role.archivedAt) {
        this.$SystemAPI.roleUnarchive({ roleID })
          .then(() => {
            this.fetchRole()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.roleArchive({ roleID })
          .then(() => {
            this.fetchRole()
          })
          .catch(this.stdReject)
          .finally(() => {
            this.decLoader()
          })
      }
    },

    onMembersSubmit () {
      this.members.processing = true

      if (this.roleID) {
        this.$SystemAPI.roleUpdate({ ...this.role, members: this.roleMembers })
          .then(role => {
            this.animateSuccess('members')
            this.role = role
          })
          .catch(this.stdReject)
          .finally(() => {
            this.members.processing = false
          })
      }
    },
  },
}
</script>
