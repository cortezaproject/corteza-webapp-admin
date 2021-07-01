export default {
  navItem: {
    label: 'Permissions',
  },

  list: {
    title: 'Automation permissions',

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
        type: { label: 'Automation' },
        operations: {
          grant: 'Grant permissions on automation',
          triggersSearch: 'Search triggers',
          sessionsSearch: 'Search sessions',
          workflowCreate: 'Create new workflow',
          workflowsSearch: 'Search workflows',
        },
      },

      workflow: {
        type: { label: 'Workflow' },
        operations: {
          read: 'Read workflow',
          update: 'Update workflow',
          delete: 'Delete workflow',
          undelete: 'Undelete workflow',
          execute: 'Execute workflow',
          triggersManage: 'Manage workflow triggers',
          sessionsManage: 'Manage workflow sessions',
        },
      },
    },
  },
}
