<template>
  <b-form @submit.prevent="onSubmit">
    <div class="header">
      <router-link :to="{ name: 'roles' }" class="float-right"><b-button-close></b-button-close></router-link>
      <h2 class="header-subtitle header-row">
        {{ $t('permission.role') }}
      </h2>
      <b-form-group :label="$t('permission.search')" horizontal>
        <b-input-group>
          <b-form-input v-model="filter" />
          <b-input-group-append>
            <b-button @click="filter = ''">{{ $t('permission.clearFilter') }}</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <b-form-group :label="$t('permission.setOnAllFiltered', {count: filtered().length})" horizontal>
        <permission-value @change="setAllFiltered"></permission-value>
      </b-form-group>
    </div>
    <div class="rules">
      <table cellspacing="0" cellpadding="0" border="0">
        <permission-group :title="$t('permission.system.title')"
                          :permissions="filtered('system')" ></permission-group>
        <permission-group :title="$t('permission.messaging.title')"
                          :permissions="filtered('messaging')" ></permission-group>
        <permission-group :title="$t('permission.compose.title')"
                          :permissions="filtered('compose')" ></permission-group>
      </table>
    </div>
    <div class="footer">
      <b-button type="submit" variant="primary" :disabled="!submittable">{{ $t('permission.saveChanges') }}</b-button>
    </div>
  </b-form>
</template>

<script>
import PermissionValue from '@/components/PermissionValue'
import PermissionGroup from '@/components/PermissionGroup'

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
      let { resource, operation } = p
      resource = resource.replace(/:/g, '-')
      operation = operation.replace(/\./g, '-')

      if (resource.slice(-1) === '-') {
        resource = resource.slice(0, -1)
      }

      const tString = `permission.${resource}.${operation}`
      return {
        ...p,
        title: this.$t(`${tString}.title`),
        description: this.$t(`${tString}.description`),
      }
    },

    // Append wildcard to all resources that have more than 1 level
    appendWildcard (p) {
      if (p.resource.split(':').length > 1) {
        p.resource += '*'
      }

      return p
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
