<template>
  <b-form @submit.prevent="onSubmit">
    <div class="header">
      <router-link :to="{ name: 'roles' }" class="float-right"><b-button-close></b-button-close></router-link>
      <h2 class="header-subtitle header-row">
        Role Information
      </h2>
    </div>
    <div class="role">
      <b-form-group label="Name" horizontal>
        <b-form-input v-model="role.name" />
      </b-form-group>

      <b-form-group label="Last updavte" horizontal>
        <b-form-text>{{ role.updatedAt }}</b-form-text>
      </b-form-group>

      <b-form-group label="Created" horizontal>
        <b-form-text>{{ role.createdAt }}</b-form-text>
      </b-form-group>
      <role-members :current-members.sync="members"></role-members>
    </div>

    <div class="footer">
      <confirmation-toggle @confirmed="onDelete">Delete role</confirmation-toggle>
      <b-button type="submit" variant="primary" :disabled="processing">Submit</b-button>
    </div>
  </b-form>
</template>

<script>
import RoleMembers from '@/components/RoleMembers'
import ConfirmationToggle from '@/components/ConfirmationToggle'

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

  data () {
    return {
      processing: false,
      role: {},
      members: [],
    }
  },

  methods: {
    fetchRole () {
      this.processing = true
      this.$system.roleRead({ roleID: this.roleID }).then(r => {
        this.role = r
        return this.$system.roleMemberList(r)
      }).then((mm) => {
        this.members = mm
        this.processing = false
      })
    },

    onDelete () {
      this.$system.roleDelete({ roleID: this.roleID })
        .then(this.handler)
        .then(() => {
          this.$router.push({ name: 'roles' })
        })
    },

    onSubmit () {
      this.processing = true

      const payload = { ...this.role, members: this.members }

      if (this.roleID) {
        this.$system.roleUpdate(payload).then(this.handler)
      } else {
        this.$system.roleCreate(payload)
          .then(this.handler)
          .then(({ roleID }) => {
            this.$router.push({ name: 'roles.role', params: { roleID } })
          })
      }
    },

    handler (role) {
      this.processing = false

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
@import '@/assets/sass/_0.commons.scss';

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
