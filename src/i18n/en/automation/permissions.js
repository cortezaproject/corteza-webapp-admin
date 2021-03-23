export default {
  navItem: {
    label: 'Permissions',
  },

  list: {
    title: 'Automation permissions',

    rules: {
      title: 'List of rules',
      loading: 'Loading permissions',
      add: 'Add role',
      addRole: 'Add new role',
      noRole: 'No role selected',
      tip1: 'Click on permission/role cell to allow a specific operation',
      tip2: 'Use Alt-Click to set explicit deny on operation',
      submit: 'Submit',

      automation: {
        title: 'Automation',

        access: 'Access to automation',
        grant: 'Grant permissions on automation',
        create: 'Pair nodes',

        triggers: {
          search: 'Search triggers',
        },

        sessions: {
          search: 'Search sessions',
        },

        workflow: {
          title: 'Workflow',

          create: 'Create new workflow',
          read: 'Read workflow',
          update: 'Update workflow',
          delete: 'Delete workflow',
          undelete: 'Undelete workflow',
          execute: 'Execute workflow',
          triggers: {
            manage: 'Manage workflow triggers',
          },
          sessions: {
            manage: 'Manage workflow sessions',
          },
        },
      },
    },
  },
}
