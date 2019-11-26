import editorHelpers from './editorHelpers'

export default {
  mixins: [
    editorHelpers,
  ],

  data () {
    return {
      // Array of roleID's included in the permission list
      rolesIncluded: ['1', '2'],
      // Array of roleID's not included in the permission list
      rolesExcluded: [],

      roles: [],
      rolePermissions: [],
      permissions: {},
      effective: {},

      api: this.$SystemAPI,
      loaded: {
        roles: false,
        permissions: false,
        effective: false,
      },
      permission: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    isLoaded () {
      const { roles, permissions } = this.loaded
      return roles && permissions
    },
  },

  methods: {
    fetchRoles () {
      this.incLoader()

      this.$SystemAPI.roleList()
        .then(({ set }) => {
          this.roles = set
          this.rolePermissions = []
          this.rolesExcluded = []

          // We read permissions for included roles
          Promise.all(this.roles.map(role => {
            const { roleID } = role

            return this.api.permissionsRead({ roleID })
              .then(rolePermissions => {
                if (this.rolesIncluded.includes(roleID)) {
                  rolePermissions = rolePermissions
                    .reduce((map, { resource, operation, access }) => {
                      map[`${resource}/${operation}`] = access
                      return map
                    }, {})

                  this.rolePermissions.push({ roleID, rules: rolePermissions })
                } else {
                  // Keep track of excluded roles that can be added to the list
                  this.rolesExcluded.push(role)
                }
              })
          }))
            .catch(this.stdReject)
            .finally(() => {
              this.roles = this.roles.filter(r => this.rolesIncluded.includes(r.roleID))

              // Add new role column
              if (this.roles.length < 9) {
                this.roles.push({ roleID: `-2` })
              }
              this.loaded.roles = true
              this.decLoader()
            })
        })
        .catch(this.stdReject)
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
          this.loaded.permissions = true
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
          this.loaded.effective = true
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

    addRole ({ roleID }) {
      this.loaded.roles = false
      this.rolesIncluded.push(roleID)
      this.rolesExcluded = []
      this.fetchRoles()
    },
  },
}
