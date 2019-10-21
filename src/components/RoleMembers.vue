<template>
  <b-form-group :label="$t('role.members', { count: members.length })" label-cols="2">
    <table v-if="members && users">
      <tr v-for="u in filteredMembers" :key="u.userID">
        <td>{{ u.name }}</td>
        <td>{{ u.handle }}</td>
        <td>{{ u.username }}</td>
        <td>{{ u.email }}</td>
        <td class="action">
          <b-button @click="removeMember(u)">{{ $t('general.label.remove') }}</b-button>
        </td>
      </tr>
    </table>
    <b-input-group>
      <b-input-group-prepend>
        <b-input-group-text>{{ $t('general.label.searchUsers') }}</b-input-group-text>
      </b-input-group-prepend>
      <b-form-input v-model.trim="filter"></b-form-input>
      <b-input-group-append>
        <b-button>{{ $t('general.label.search') }}</b-button>
      </b-input-group-append>
    </b-input-group>
    <table v-if="filter && users">
      <tr v-for="u in filtered" :key="u.userID">
        <td>{{ u.name }}</td>
        <td>{{ u.handle }}</td>
        <td>{{ u.username }}</td>
        <td>{{ u.email }}</td>
        <td class="action">
          <b-button v-if="isMember(u)" @click="removeMember(u)">{{ $t('general.label.remove') }}</b-button>
          <b-button v-else @click="addMember(u)">{{ $t('general.label.add') }}</b-button>
        </td>
      </tr>
    </table>
  </b-form-group>
</template>

<script>
export default {
  props: {
    currentMembers: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data () {
    return {
      filter: '',
      error: null,
      users: [],
    }
  },

  computed: {
    members: {
      get () {
        return this.currentMembers
      },

      set (members) {
        this.$emit('update:current-members', members)
      },
    },

    filtered () {
      const match = ({ name = '', handle = '', username = '', email = '', userID = '' }) => {
        return `${name} ${handle} ${username} ${email} ${userID}`.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) > -1
      }

      return this.users.filter(u => match(u))
    },

    filteredMembers () {
      return this.users.filter(this.isMember)
    },
  },

  created () {
    this.$SystemAPI.userList().then(({ set }) => {
      this.users = set
    }).catch(({ message }) => {
      this.error = message
    })
  },

  methods: {
    memberIndex (u) {
      return this.members.indexOf(typeof u === 'object' ? u.userID : u)
    },

    isMember (u) {
      return this.memberIndex(u) > -1
    },

    addMember (u) {
      const i = this.memberIndex(u)
      if (i < 0) {
        this.members = this.members.concat(typeof u === 'object' ? u.userID : u)
      }
    },

    removeMember (u) {
      const i = this.memberIndex(u)
      if (i > -1) {
        let m = [...this.members]
        m.splice(i, 1)
        this.members = m
      }
    },
  },
}
</script>
<style scoped lang="scss">

table {
  width: 100%;
  margin: 0;
  padding: 0;

  tr {
    border-bottom: 1px solid $light;
    td.action {
      margin: 0;
      padding: 0;
      width: 100px;
      text-align: right;
    }
  }
}

</style>
