export default {
  navItem: {
    label: 'Permissions',
  },

  list: {
    title: 'Federation permissions',

    rules: {
      title: 'List of rules',
      loading: 'Loading permissions',
      notAllowed: 'Not allowed to set permissions',
      add: 'Add role',
      addRole: 'Add new role',
      noRole: 'No role selected',
      tip1: 'Click on permission/role cell to allow a specific operation',
      tip2: 'Use Alt-Click to set explicit deny on operation',
      submit: 'Submit',

      component: {
        type: {
          label: 'Federation service',
        },

        operations: {
          grant: 'Grant permissions on federation service',
          nodeCreate: 'Create nodes',
          nodesSearch: 'List or create nodes',
          pair: 'Pair nodes',
          settingsRead: 'Access all settings',
          settingsManage: 'Manage all settings',
        },
      },

      node: {
        type: {
          label: 'Nodes',
        },

        operations: {
          read: 'Access any node',
          update: 'Update any node',
          delete: 'Delete any node',
          manage: 'Manage any node',
          pair: 'Pair nodes',
          moduleCreate: 'Create modules',
        },
      },

      sharedModule: {
        type: {
          label: 'Modules',
        },

        operations: {
          map: 'Map any module',
        },
      },

      exposedModule: {
        type: {
          label: 'Modules',
        },

        operations: {
          manage: 'Manage any module',
        },
      },
    },
  },
}
