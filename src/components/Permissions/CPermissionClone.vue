<template>
  <div
    class="d-inline-block"
  >
    <b-button
      variant="secondary"
      class="mr-2"
      @click="showModal = true"
    >
      {{ $t('permissions:ui.clone.label') }}
    </b-button>

    <b-modal
      v-model="showModal"
      ok-variant="primary"
      cancel-variant="link"
      centered
      :title="$t('permissions:ui.clone.title')"
      :ok-title="$t('permissions:ui.clone.clone')"
      :ok-disabled="!selectedRoles.length || processingRoles || processingSubmit"
      @ok="clonePermissions()"
    >
      <b-form-group
        :description="$t('permissions:ui.clone.description')"
        class="mb-0"
      >
        <vue-select
          v-model="selectedRoles"
          label="name"
          :options="roles"
          :reduce="role => role.roleID"
          :loading="processingRoles"
          multiple
          placeholder="Pick a role"
          class="bg-white"
        />
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import VueSelect from 'vue-select'

export default {
  components: {
    VueSelect,
  },

  props: {
    roleId: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      showModal: false,

      roles: [],
      selectedRoles: [],

      processingSubmit: false,
      processingRoles: false,
    }
  },

  mounted () {
    this.processingRoles = true

    this.$SystemAPI.roleList()
      .then(({ set: roles = [] }) => {
        this.roles = roles
      })
      .catch(this.toastErrorHandler(this.$t('notification:role.fetch.error')))
      .finally(() => {
        this.processingRoles = false
      })
  },

  methods: {
    clonePermissions () {
      this.processingSubmit = true

      this.$SystemAPI.permissionsClone({ roleID: this.roleId, cloneToRoleID: this.selectedRoles })
        .then(() => {
          this.selectedRoles = []
          this.toastSuccess(this.$t('notification:permissions.clone.success'))
        })
        .catch(this.toastErrorHandler(this.$t('notification:permissions.clone.error')))
        .finally(() => {
          this.processingSubmit = false
          this.showModal = false
        })
    },
  },
}
</script>
