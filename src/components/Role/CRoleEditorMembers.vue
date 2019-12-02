<template>
  <b-card
    class="shadow-sm"
    header-bg-variant="white"
    footer-bg-variant="white"
  >
    <b-form
      @submit.prevent="$emit('submit')"
    >
      <b-form-group
        :label="$t('count', { count: members.length })"
        label-cols="2"
        class="mb-0"
      >
        <table
          v-if="members && users"
          class="w-100 m-0 p-0"
        >
          <tr
            v-for="u in memberUsers"
            :key="u.userID"
          >
            <td>{{ u.name || u.handle || u.username || u.email || $t('unnamed') }}</td>
            <td class="m-0 p-0 float-right">
              <b-button @click="removeMember(u)">
                {{ $t('remove') }}
              </b-button>
            </td>
          </tr>
        </table>
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>{{ $t('searchUsers') }}</b-input-group-text>
          </b-input-group-prepend>
          <b-form-input v-model.trim="filter" />
        </b-input-group>
        <table
          v-if="filter && users"
          class="w-100 m-0 p-0"
        >
          <tr
            v-for="u in filtered"
            :key="u.userID"
          >
            <td>{{ u.name || u.handle || u.username || u.email || $t('unnamed') }}</td>
            <td class="m-0 p-0 float-right">
              <b-button
                v-if="isMember(u)"
                @click="removeMember(u)"
              >
                {{ $t('remove') }}
              </b-button>
              <b-button
                v-else
                @click="addMember(u)"
              >
                {{ $t('add') }}
              </b-button>
            </td>
          </tr>
        </table>
      </b-form-group>
    </b-form>

    <template #header>
      <h3 class="m-0">
        {{ $t('title') }}
      </h3>
    </template>

    <template #footer>
      <c-submit-button
        class="float-right"
        :processing="processing"
        :success="success"
        @submit="$emit('submit')"
      />
    </template>
  </b-card>
</template>

<script>
import CSubmitButton from 'corteza-webapp-admin/src/components/CSubmitButton'

export default {
  i18nOptions: {
    namespaces: [ 'system.roles' ],
    keyPrefix: 'editor.members',
  },

  components: {
    CSubmitButton,
  },

  props: {
    currentMembers: {
      type: Array,
      required: true,
      default: () => [],
    },

    processing: {
      type: Boolean,
      value: false,
    },

    success: {
      type: Boolean,
      value: false,
    },
  },

  data () {
    return {
      filter: '',
      users: [],

      memberUsers: [],
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
      return this.users.filter(u => !this.isMember(u))
    },
  },

  watch: {
    filter: {
      handler () {
        const query = this.filter
        this.$SystemAPI.userList({ query, incSuspended: true, incDeleted: true })
          .then(({ set: items = [] }) => {
            this.users = items
          }).catch(({ message }) => {
            this.$store.dispatch('ui/appendAlert', message)
          })
      },
    },
  },

  mounted () {
    const userID = this.members
    if (userID.length > 0) {
      this.$SystemAPI.userList({ userID, incSuspended: true, incDeleted: true })
        .then(({ set: items = [] }) => {
          this.memberUsers = items
        }).catch(({ message }) => {
          this.$store.dispatch('ui/appendAlert', message)
        })
    }
  },

  methods: {
    memberIndex (u) {
      return this.members.indexOf(typeof u === 'object' ? u.userID : u)
    },

    isMember (u) {
      return this.members.indexOf(typeof u === 'object' ? u.userID : u) >= 0
    },

    addMember (u) {
      const i = this.memberIndex(u)
      if (i < 0) {
        this.members = this.members.concat(typeof u === 'object' ? u.userID : u)
        this.memberUsers.push(u)
      }
    },

    removeMember (u) {
      const i = this.memberIndex(u)
      if (i > -1) {
        let m = [...this.members]
        m.splice(i, 1)
        this.members = m
        this.memberUsers = this.memberUsers.filter(user => user.userID !== u.userID)
      }
    },
  },
}
</script>
