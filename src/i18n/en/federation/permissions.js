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

      federation: {
        title: 'Federation service',

        access: 'Access to federation',
        grant: 'Grant permissions on federation service',
        pair: 'Pair nodes',

        node: {
          title: 'Nodes',
          create: 'Create nodes',
          read: 'Access any node',
          update: 'Update any node',
          delete: 'Delete any node',
          manage: 'Manage any node',
          pair: 'Pair nodes',
          module: {
            create: 'Create modules',
          },
        },

        module: {
          title: 'Modules',
          manage: 'Manage any module',
          map: 'Map any module',
        },

        settings: {
          read: 'Access all settings',
          manage: 'Manage all settings',
        },
      },
    },
  },
}
