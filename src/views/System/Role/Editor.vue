<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="title"
    >
      <span
        class="text-nowrap"
      >
        <b-button
          v-if="roleID && canCreate"
          variant="primary"
          class="mr-2"
          :to="{ name: 'system.role.new' }"
        >
          {{ $t('new') }}
        </b-button>
        <c-permissions-button
          v-if="roleID && canGrant"
          :title="role.name"
          :target="role.name"
          :resource="'corteza::system:role/'+roleID"
          button-variant="light"
        >
          <font-awesome-icon :icon="['fas', 'lock']" />
          {{ $t('permissions') }}
        </c-permissions-button>
      </span>
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
import { mapGetters } from 'vuex'

export default {
  components: {
    CRoleEditorInfo,
    CRoleEditorMembers,
  },

  i18nOptions: {
    namespaces: 'system.roles',
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

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    canCreate () {
      return this.can('system/', 'role.create')
    },

    canGrant () {
      return this.can('system/', 'grant')
    },

    title () {
      return this.roleID ? this.$t('title.edit') : this.$t('title.create')
    },
  },

  watch: {
    roleID: {
      immediate: true,
      handler () {
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
        .catch(this.toastErrorHandler(this.$t('notification:role.fetch.error')))
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

            this.toastSuccess(this.$t('notification:role.undelete.success'))
          })
          .catch(this.toastErrorHandler(this.$t('notification:role.undelete.error')))
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.roleDelete({ roleID: this.roleID })
          .then(() => {
            this.fetchRole()

            this.toastSuccess(this.$t('notification:role.delete.success'))
          })
          .catch(this.toastErrorHandler(this.$t('notification:role.delete.error')))
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
            this.role = role

            this.animateSuccess('info')
            this.toastSuccess(this.$t('notification:role.update.success'))
          })
          .catch(this.toastErrorHandler(this.$t('notification:role.update.error')))
          .finally(() => {
            this.info.processing = false
          })
      } else {
        this.$SystemAPI.roleCreate(role)
          .then(({ roleID }) => {
            this.animateSuccess('info')
            this.toastSuccess(this.$t('notification:role.create.success'))

            this.$router.push({ name: 'system.role.edit', params: { roleID } })
          })
          .catch(this.toastErrorHandler(this.$t('notification:role.create.error')))
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

            this.toastSuccess(this.$t('notification:role.unarchive.success'))
          })
          .catch(this.toastErrorHandler(this.$t('notification:role.unarchive.error')))
          .finally(() => {
            this.decLoader()
          })
      } else {
        this.$SystemAPI.roleArchive({ roleID })
          .then(() => {
            this.fetchRole()

            this.toastSuccess(this.$t('notification:role.archive.success'))
          })
          .catch(this.toastErrorHandler(this.$t('notification:role.archive.error')))
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
            this.role = role

            this.animateSuccess('members')
            this.toastSuccess(this.$t('notification:role.membershipUpdate.success'))
          })
          .catch(this.toastErrorHandler(this.$t('notification:role.membershipUpdate.error')))
          .finally(() => {
            this.members.processing = false
          })
      }
    },
  },
}
</script>
