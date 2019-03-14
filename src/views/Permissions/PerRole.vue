<template>
  <b-form @submit.prevent="onSubmit">
    <div class="header">
      <router-link :to="{ name: 'roles' }" class="float-right"><b-button-close></b-button-close></router-link>
      <h2 class="header-subtitle header-row">
        Role permissions
      </h2>
      <b-form-group label="Search/filter permissions" horizontal>
        <b-input-group>
          <b-form-input v-model="filter" />
          <b-input-group-append>
            <b-button @click="filter = ''">Clear filter</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <b-form-group :label="`Set on all filtered (${filtered().length})`" horizontal>
        <permission-value @change="setAllFiltered"></permission-value>
      </b-form-group>
    </div>
    <div class="rules">
      <table cellspacing="0" cellpadding="0" border="0">
        <permission-group title="System service"
                          :permissions="filtered('system')" ></permission-group>
        <permission-group title="Messaging service"
                          :permissions="filtered('messaging')" ></permission-group>
        <permission-group title="Compose service"
                          :permissions="filtered('compose')" ></permission-group>
      </table>
    </div>
    <div class="footer">
      <b-button type="submit" variant="primary" :disabled="!submittable">Save changes</b-button>
    </div>
  </b-form>
</template>

<script>
import PermissionValue from '@/components/PermissionValue'
import PermissionGroup from '@/components/PermissionGroup'

const t = {
  privileges: {
    'system': {
      'grant': {
        title: 'Grant permission on system service',
        description: 'Default: deny',
      },

      'access': {
        title: 'Allow access to administration',
        description: 'Default: deny',
      },

      'organisation.create': {
        title: 'Create new organisation',
        description: 'Default: deny',
      },

      'role.create': {
        title: 'Create new role',
        description: 'Default: deny',
      },

      'application.create': {
        title: 'Create new application',
        description: 'Default: deny',
      },
    },

    'system:role': {
      'read': {
        title: 'Access any role',
        description: 'Default: allow',
      },

      'update': {
        title: 'Update any role',
        description: 'Default: allow',
      },

      'delete': {
        title: 'Delete any role',
        description: 'Default: allow',
      },

      'members.manage': {
        title: 'Manage members for any role',
        description: 'Default: allow',
      },
    },

    'system:application': {
      'read': {
        title: 'Access any application',
        description: 'Default: allow',
      },

      'update': {
        title: 'Update any application',
        description: 'Default: deny',
      },

      'delete': {
        title: 'Delete any application',
        description: 'Default: deny',
      },
    },

    'system:organisation': {
      'access': {
        title: 'Access to all organisations',
        description: 'Default: deny',
      },
    },

    'messaging': {
      'access': {
        title: 'Access to messaging',
        description: 'Default: deny',
      },
      'grant': {
        title: 'Grant permissions on messaging service',
        description: 'Default: deny',
      },
      'channel.public.create': {
        title: 'Create public channels',
        description: 'Default: allow',
      },
      'channel.private.create': {
        title: 'Create private channels',
        description: 'Default: allow',
      },
      'channel.group.create': {
        title: 'Create direct messages and group channels',
        description: 'Default: allow',
      },
    },

    'messaging:channel': {
      'message.send': {
        title: 'Message sending on any channel',
        description: 'Default: allow',
      },
      'message.embed': {
        title: 'Embedding in messages on any channel ',
        description: 'Default: allow',
      },
      'message.attach': {
        title: 'File attaching on any channel',
        description: 'Default: allow',
      },
      'read': {
        title: 'View any channel',
        description: 'Default: allow for public channels or channels you are member of',
      },
      'join': {
        title: 'Join any channel',
        description: 'Default: allow for public channels',
      },
      'leave': {
        title: 'Leave any channel',
        description: 'Default: allow',
      },
      'update': {
        title: 'Update any channel',
        description: 'Default: allow if you are owner of the channel, otherwise deny',
      },
      'delete': {
        title: 'Delete any channel',
        description: 'Default: allow if you are owner of the channel, otherwise deny',
      },
      'undelete': {
        title: 'Undelete any channel',
        description: 'Default: allow if you are owner of the channel, otherwise deny',
      },
      'archive': {
        title: 'Archive any channel',
        description: 'Default: allow if you are owner of the channel, otherwise deny',
      },
      'unarchive': {
        title: 'Unarchive any channel',
        description: 'Default: allow if you are owner of the channel, otherwise deny',
      },
      'members.manage': {
        title: 'Manage members on any channel',
        description: 'Default: allow if you are owner of the channel, otherwise deny',
      },
      'webhooks.manage': {
        title: 'Manage webhooks on any channel',
        description: 'Default: deny',
      },
      'message.update.own': {
        title: 'Update own messages on any channel',
        description: 'Default: allow',
      },
      'message.update.all': {
        title: 'Update any message on any channel',
        description: 'Default: deny',
      },
      'message.delete.own': {
        title: 'Delete own messages on any channel',
        description: 'Default: allow',
      },
      'message.delete.all': {
        title: 'Delete any message on any channel',
        description: 'Default: deny',
      },
      'message.reply': {
        title: 'Reply to messages on any channel',
        description: 'Default: allow',
      },
      'message.react': {
        title: 'React on messages on any channel',
        description: 'Default: allow',
      },
      'attachments.manage': {
        title: 'Manage attachments on any channel',
        description: 'Default: deny',
      },
    },

    'compose': {
      'access': {
        title: 'Access to compose',
        description: 'Default: deny',
      },
      'grant': {
        title: 'Grant permissions on compose service',
        description: 'Default: deny',
      },
      'namespace.create': {
        title: 'Create namespaces',
        description: 'Default: deny',
      },
    },

    'compose:page': {
      'read': {
        title: 'Read any page',
        description: 'Default: deny',
      },
      'update': {
        title: 'Update any page',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any page',
        description: 'Default: deny',
      },
    },

    'compose:trigger': {
      'read': {
        title: 'Read any trigger',
        description: 'Default: deny',
      },
      'update': {
        title: 'Update any trigger',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any trigger',
        description: 'Default: deny',
      },
    },

    'compose:namespace': {
      'read': {
        title: 'Read/access any namespace',
        description: 'Default: deny',
      },
      'update': {
        title: 'Update any namespace',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any namespace',
        description: 'Default: deny',
      },
      'module.create': {
        title: 'Create modules under any namespace',
        description: 'Default: deny',
      },
      'chart.create': {
        title: 'Create charts under any namespace',
        description: 'Default: deny',
      },
      'trigger.create': {
        title: 'Create triggers under any namespace',
        description: 'Default: deny',
      },
      'page.create': {
        title: 'Create pages under any namespace',
        description: 'Default: deny',
      },
    },

    'compose:module': {
      'read': {
        title: 'Read any module',
        description: 'Default: deny',
      },
      'update': {
        title: 'Update any module',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any module',
        description: 'Default: deny',
      },
      'record.create': {
        title: 'Create record under any module',
        description: 'Default: deny',
      },
      'record.read': {
        title: 'Read records under any module',
        description: 'Default: deny',
      },
      'record.update': {
        title: 'Update records under any module',
        description: 'Default: deny',
      },
      'record.delete': {
        title: 'Delete records under any module',
        description: 'Default: deny',
      },
    },

    'compose:chart': {
      'read': {
        title: 'Read any chart',
        description: 'Default: deny',
      },
      'update': {
        title: 'Update any chart',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any chart',
        description: 'Default: deny',
      },
    },
  },
}

export default {
  components: {
    PermissionValue,
    PermissionGroup,
  },

  props: {
    roleID: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      processing: true,
      role: {},

      filter: '',

      rules: [],
      permissions: [],
    }
  },

  computed: {
    filtered () {
      const filterParts = this.filter.trim().toLocaleLowerCase().split(/\s+/)

      const has = ({ resource, operation, title, description, value }) => {
        if (!filterParts) {
          return true
        }

        const idx = `${resource} ${operation} ${title} ${description} ${value}`.toLocaleLowerCase()
        for (const fp of filterParts) {
          if (idx.indexOf(fp) === -1) {
            return false
          }
        }

        return true
      }

      return (prefix) => this.rules.filter(p => (!prefix || p.resource.indexOf(prefix) === 0) && (has(p)))
    },

    dirty () {
      return this.collectChangedRules().length > 0
    },

    submittable () {
      return this.dirty && !this.processing
    },
  },

  watch: {
    roleID: {
      handler () {
        this.fetchRules()
      },
    },
  },

  created () {
    this.fetchPermissionsList().then(() => {
      this.fetchRules()
    })
  },

  methods: {
    fetchPermissionsList () {
      this.processing = true
      return this.$system.permissionsList().then((pp) => {
        this.permissions = pp
          .map(this.describePermission)
          .map(this.appendWildcard)

        this.processing = false
      })
    },

    fetchRules () {
      this.processing = true
      return this.$system.permissionsRead({ roleID: this.roleID }).then((rules) => {
        this.setCurrentRules(rules)
        this.processing = false
      })
    },

    onSubmit () {
      this.processing = true
      const permissions = this.collectChangedRules()

      return this.$system.permissionsUpdate({ roleID: this.roleID, permissions }).then((rules) => {
        this.setCurrentRules(rules)
        this.processing = false
      })
    },

    collectChangedRules () {
      return this.rules.filter(r => r.value !== r.current).map(({ resource, operation, value }) => {
        return { resource, operation, value }
      })
    },

    setCurrentRules (rules) {
      const findCurrent = ({ resource, operation }) => {
        return (rules.find(r => r.resource === resource && r.operation === operation) || {}).value || 'inherit'
      }

      this.rules = this.permissions.map((p) => {
        const current = findCurrent(p)
        return { ...p, value: current, current }
      })
    },

    setAllFiltered (value) {
      this.filtered().forEach(rule => {
        rule.value = value
      })
    },

    describePermission (p) {
      return {
        ...p,
        title: this._(p.resource, p.operation, 'title'),
        description: this._(p.resource, p.operation, 'description'),
      }
    },

    // Append wildcard to all resources that have more than 1 level
    appendWildcard (p) {
      if (p.resource.split(':').length > 1) {
        p.resource += ':*'
      }

      return p
    },

    _ (res, op, key) {
      try {
        return t.privileges[res][op][key]
      } catch (e) {
        return `${res} ${op} ${key}`.toUpperCase()
      }
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';

form {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);

  .header {
    flex: 1;
    border-bottom: 2px solid $appcream;
  }

  .footer {
    flex: 1;
    text-align: right;
  }

  .rules {
    flex: 1;
    flex-grow: 100;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-top: 2px;

    table {
      width: 100%;
    }
  }
}

</style>
