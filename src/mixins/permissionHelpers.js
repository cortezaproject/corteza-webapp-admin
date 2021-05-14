import editorHelpers from './editorHelpers'

const systemRoles = ['1', '2']
const lsKey = 'permissionList.roles'

/**
 * Determines what roles should be included in the table
 * @returns {Array<String>}
 */
function getIncludedRoles () {
  const udRoles = JSON.parse(localStorage.getItem(lsKey) || '[]')
  return systemRoles.concat(udRoles)
}

/**
 * Filters out system roles and stores to localStorage
 * @param {Array<String>} roles Roles to store
 */
function setIncludedRoles (roles = []) {
  roles = roles.filter(r => !systemRoles.includes(r))
  localStorage.setItem(lsKey, JSON.stringify(roles))
}

export default {
  mixins: [
    editorHelpers,
  ],

  data () {
    return {
      // Array of roleID's included in the permission list
      rolesIncluded: getIncludedRoles(),
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
      const { roles, permissions, effective } = this.loaded
      return roles && permissions && effective
    },
  },

  methods: {
    fetchRoles () {
      this.incLoader()

      this.$SystemAPI.roleList()
        .then(({ set }) => {
          this.roles = set.filter(r => this.rolesIncluded.includes(r.roleID))
          this.rolePermissions = []
          this.rolesExcluded = []

          // We read permissions for included roles
          Promise.all(set.map(role => {
            const { roleID } = role

            if (this.rolesIncluded.includes(roleID)) {
              return this.api.permissionsRead({ roleID })
                .then(rolePermissions => {
                  rolePermissions = rolePermissions
                    .reduce((map, { resource, operation, access }) => {
                      if ((this.permissions[`${resource}/`] || []).find(op => operation === op)) {
                        map[`${resource}/${operation}`] = access
                      }
                      return map
                    }, {})

                  this.rolePermissions.push({ roleID, rules: rolePermissions })
                })
            } else {
              // Keep track of excluded roles that can be added to the list
              this.rolesExcluded.push(role)
            }
          }))
            .catch(this.stdReject)
            .finally(() => {
              this.loaded.roles = true
              this.decLoader()
            })
        })
        .catch(this.stdReject)
    },

    fetchPermissions () {
      this.incLoader()

      this.fetchEffective()

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

          this.fetchRoles()
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

    addRole (role) {
      this.loaded.roles = false
      const { roleID } = role
      this.rolesIncluded.push(roleID)
      this.rolesExcluded = this.rolesExcluded.filter(r => r.roleID !== roleID)

      // Store for next time
      setIncludedRoles(this.rolesIncluded)

      this.api.permissionsRead({ roleID })
        .then(rolePermissions => {
          rolePermissions = rolePermissions
            .reduce((map, { resource, operation, access }) => {
              if ((this.permissions[`${resource}/`] || []).find(op => operation === op)) {
                map[`${resource}/${operation}`] = access
              }
              return map
            }, {})

          this.rolePermissions.push({ roleID, rules: rolePermissions })

          // Add new role
          this.roles.push(role)
          this.loaded.roles = true
        })
        .catch(this.stdReject)
        .finally(() => {
          this.loaded.roles = true
        })
    },
  },
}
