export default {
  navItem: {
    label: 'Permissions',
  },

  list: {
    title: 'System permissions',

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
          label: 'System service',
        },

        operations: {
          grant: 'Grant permission on system service',
          actionLogRead: 'Access action log',
          roleCreate: 'Create new role',
          rolesSearch: 'List and search roles',
          userCreate: 'Create new user',
          usersSearch: 'List and search users',
          applicationCreate: 'Create new application',
          applicationsSearch: 'List and search applications',
          applicationFlagSelf: 'Can pin application for themselves',
          applicationFlagGlobal: 'Can pin application for everyone',
          authClientCreate: 'Create new auth client',
          authClientsSearch: 'List and search auth clients',
          queueCreate: 'Create new messaging queue',
          queuesSearch: 'List and search messaging queues',
          templateCreate: 'Create new template',
          templatesSearch: 'List and search templates',
          settingsRead: 'Access all settings',
          settingsManage: 'Manage all settings',
          reminderAssign: 'Allow reminder assignment',
        },
      },

      role: {
        type: {
          label: 'Roles',
        },

        operations: {
          read: 'Read any role',
          update: 'Update any role',
          delete: 'Delete any role',
          membersManage: 'Manage members for any role',
        },
      },
      user: {
        type: {
          label: 'Users',
        },

        operations: {
          read: 'Read any user',
          update: 'Update any user',
          delete: 'Delete any user',
          suspend: 'Suspend any user',
          unsuspend: 'Unsuspend any user',

          emailUnmask: 'Show email details',
          nameUnmask: 'Show name details',

          impersonate: 'Impersonate any user',
        },
      },
      application: {
        type: {
          label: 'Applications',
        },

        operations: {
          read: 'Access any application',
          update: 'Update any application',
          delete: 'Delete any application',
        },
      },
      template: {
        type: {
          label: 'Templates',
        },

        operations: {
          read: 'Read any template',
          update: 'Update any template',
          delete: 'Delete any template',
          render: 'Render any template',
        },
      },

      authClient: {
        type: {
          label: 'Auth clients',
        },

        operations: {
          read: 'Read any client',
          update: 'Update any client',
          delete: 'Delete any client',
          authorize: 'Authorize any client',
        },
      },

      queue: {
        type: {
          label: 'Messaging queues',
        },

        operations: {
          read: 'Read any queue',
          update: 'Update any queue',
          delete: 'Delete any queue',
          queueRead: 'Read messages from queue',
          queueWrite: 'Write messages to queue',
        },
      },
    },
  },
}
