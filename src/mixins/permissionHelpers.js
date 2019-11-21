import editorHelpers from './editorHelpers'

export default {
  mixins: [
    editorHelpers,
  ],

  data () {
    return {
      roles: [],
      rolePermissions: [],
      permissions: {},
      effective: {},

      api: this.$SystemAPI,
      // Set loaded to 3 if fetchEffective is user, 2 otherwise
      loaded: 2,
      permission: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    isLoaded () {
      return this.loaded <= 0
    },
  },

  methods: {
    fetchRoles () {
      this.incLoader()

      this.$SystemAPI.roleList()
        .then(({ set }) => {
          this.roles = set

          this.roles.forEach(({ roleID }) => {
            this.incLoader()
            this.loaded++

            this.api.permissionsRead({ roleID })
              .then(rolePermissions => {
                rolePermissions = rolePermissions
                  .reduce((map, { resource, operation, access }) => {
                    map[`${resource}/${operation}`] = access
                    return map
                  }, {})

                this.rolePermissions.push({ roleID, rules: rolePermissions })
              })
              .catch(this.stdReject)
              .finally(() => {
                this.loaded--
                this.decLoader()
              })
          })
        })
        .catch(this.stdReject)
        .finally(() => {
          this.loaded--
          this.decLoader()
        })
    },

    fetchPermissions () {
      this.incLoader()

      this.api.permissionsList()
        .then(permissions => {
          this.permissions = permissions
            .reduce((map, { resource, operation }) => {
              if (resource.includes(':')) {
                resource = `${resource}*/`
              } else {
                resource = `${resource}/`
              }

              if (!map[resource]) {
                map[resource] = []
              }

              map[resource].push(operation)
              return map
            }, {})
        })
        .catch(this.stdReject)
        .finally(() => {
          this.loaded--
          this.decLoader()
        })
    },

    fetchEffective () {
      this.incLoader()

      this.api.permissionsEffective()
        .then(effective => {
          this.effective = effective
            .reduce((map, { resource, operation, allow }) => {
              map[`${resource}/${operation}`] = allow
              return map
            }, {})
        })
        .catch(this.stdReject)
        .finally(() => {
          this.loaded--
          this.decLoader()
        })
    },

    onSubmit (roleRules) {
      this.permission.processing = true
      Promise.all(roleRules.map(({ roleID, rules }) => {
        const externalRules = []
        Object.entries(rules).forEach(([ key, value ]) => {
          let [ resource, operation ] = key.split('/')
          externalRules.push({ roleID, resource, operation, access: value })
        })

        return this.api.permissionsUpdate({ roleID, rules: externalRules })
          .then(() => {
            this.animateSuccess('permission')
          })
      }))
        .catch(this.stdReject)
        .finally(() => {
          this.permission.processing = false
        })
    },
  },
}
