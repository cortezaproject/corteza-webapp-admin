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
      },

      'organisation.create': {
        title: 'Create new organisation',
      },

      'role.create': {
        title: 'Create new role',
      },

      'application.create': {
        title: 'Create new application',
      },
    },

    'system:role': {
      'read': {
        title: 'Access any role',
      },

      'update': {
        title: 'Update any role',
      },

      'delete': {
        title: 'Delete any role',
      },

      'members.manage': {
        title: 'Manage members for any role',
      },
    },

    'system:application': {
      'read': {
        title: 'Access any application',
      },

      'update': {
        title: 'Update any application',
      },

      'delete': {
        title: 'Delete any application',
      },
    },

    'system:organisation': {
      'access': {
        title: 'Access to all organisations',
      },
    },

    'messaging': {
      'access': {
        title: 'Access to messaging',
      },
      'grant': {
        title: 'Grant permissions on messaging service',
      },
      'channel.public.create': {
        title: 'Create public channels',
      },
      'channel.private.create': {
        title: 'Create private channels',
      },
      'channel.direct.create': {
        title: 'Create direct message channels',
      },
    },

    'messaging:channel': {
      'message.send': {
        title: 'Message sending on any channel',
      },
      'message.embed': {
        title: 'Embedding in messages on any channel ',
      },
      'message.attach': {
        title: 'File attaching on any channel',
      },
      'read': {
        title: 'View any channel',
      },
      'join': {
        title: 'Join any channel',
      },
      'leave': {
        title: 'Leave any channel',
      },
      'update': {
        title: 'Update any channel',
      },
      'members.manage': {
        title: 'Manage members on any channel',
      },
      'webhooks.manage': {
        title: 'Manage webhooks on any channel',
      },
      'message.update.own': {
        title: 'Update own messages on any channel',
      },
      'message.update.all': {
        title: 'Update messages on any channel',
      },
      'message.reply': {
        title: 'Reply to messages on any channel',
      },
      'message.react': {
        title: 'React on messages on any channel',
      },
      'attachments.manage': {
        title: 'Manage attachments on any channel',
      },
    },

    'compose': {
      'access': {
        title: 'Access to compose',
      },
      'grant': {
        title: 'Grant permissions on compose service',
      },
      'namespace.create': {
        title: 'Create namespaces',
      },
    },

    'compose:page': {
      'read': {
        title: 'Read any page',
      },
      'update': {
        title: 'Update any page',
      },
      'delete': {
        title: 'Delete any page',
      },
    },

    'compose:trigger': {
      'read': {
        title: 'Read any trigger',
      },
      'update': {
        title: 'Update any trigger',
      },
      'delete': {
        title: 'Delete any trigger',
      },
    },

    'compose:namespace': {
      'read': {
        title: 'Read/access any namespace',
      },
      'update': {
        title: 'Update any namespace',
      },
      'delete': {
        title: 'Delete any namespace',
      },
      'module.create': {
        title: 'Create modules under any namespace',
      },
      'chart.create': {
        title: 'Create charts under any namespace',
      },
      'trigger.create': {
        title: 'Create triggers under any namespace',
      },
      'page.create': {
        title: 'Create pages under any namespace',
      },
    },

    'compose:module': {
      'read': {
        title: 'Read any module',
      },
      'update': {
        title: 'Update any module',
      },
      'delete': {
        title: 'Delete any module',
      },
      'record.create': {
        title: 'Create record under any module',
      },
      'record.read': {
        title: 'Read records under any module',
      },
      'record.update': {
        title: 'Update records under any module',
      },
      'record.delete': {
        title: 'Delete records under any module',
      },
    },

    'compose:chart': {
      'read': {
        title: 'Read any chart',
      },
      'update': {
        title: 'Update any chart',
      },
      'delete': {
        title: 'Delete any chart',
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
