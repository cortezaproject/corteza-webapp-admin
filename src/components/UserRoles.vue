<template>
  <b-form-group :label="$t('user.roles.count', { count: filteredRoles.length })" label-cols="2">
    <table v-if="filteredRoles">
      <tr v-for="r in filteredRoles" :key="r.userID">
        <td>{{ r.name || r.handle || r.roleID || $t('role.unnamed') }}</td>
        <td class="action">
          <b-button @click="removeRole(r)">{{ $t('general.label.remove') }}</b-button>
        </td>
      </tr>
    </table>
    <b-input-group>
      <b-input-group-prepend>
        <b-input-group-text>{{ $t('general.label.searchRoles') }}</b-input-group-text>
      </b-input-group-prepend>
      <b-form-input v-model.trim="filter"></b-form-input>
    </b-input-group>
    <table v-if="filter && filtered">
      <tr v-for="r in filtered" :key="r.roleID">
        <td>{{ r.name || r.handle || r.roleID || $t('role.unnamed') }}</td>
        <td class="action">
          <b-button @click="addRole(r)">{{ $t('general.label.add') }}</b-button>
        </td>
      </tr>
    </table>
  </b-form-group>
</template>

<script>
export default {
  props: {
    currentRoles: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data () {
    return {
      filter: '',
      error: null,
    }
  },

  computed: {
    roles: {
      get () {
        return this.currentRoles
      },

      set (roles) {
        this.$emit('update:current-roles', roles)
      },
    },

    filtered () {
      const match = ({ name = '', handle = '', roleID = '' }) => {
        return `${name} ${handle} ${roleID}`.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) > -1
      }

      return this.roles.filter(r => match(r) && !this.hasRole(r))
    },

    filteredRoles () {
      return this.roles.filter(this.hasRole)
    },
  },

  watch: {
    currentRoles: {
      immediate: true,
      handler () {
        this.filter = ''
      },
    },
  },

  methods: {
    hasRole (r) {
      return r.dirty
    },

    addRole (r) {
      r.dirty = true
    },

    removeRole (r) {
      r.dirty = false
    },
  },
}
</script>
<style scoped lang="scss">
.roles {
  min-height: 100px;
}
table {
  width: 100%;
  margin: 0;
  padding: 0;

  tr {
    td.action {
      margin: 0;
      padding: 0;
      width: 100px;
      text-align: right;
    }
  }
}
</style>
