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

      system: {
        title: 'System service',

        grant: 'Grant permission on system service',
        access: 'Allow access to administration',
        organisation: {
          title: 'Organisations',

          create: 'Create new organisation',
          access: 'Access to all organisations',
        },
        role: {
          title: 'Roles',

          create: 'Create new role',
          read: 'Read any role',
          update: 'Update any role',
          delete: 'Delete any role',
          members: {
            manage: 'Manage members for any role',
          },
        },
        user: {
          title: 'Users',

          create: 'Create new user',
          read: 'Read any user',
          update: 'Update any user',
          delete: 'Delete any user',
          suspend: 'Suspend any user',
          unsuspend: 'Unsuspend any user',
          unmask: {
            email: 'Show email details',
            name: 'Show name details',
          },
          impersonate: 'Impersonate any user',
        },
        application: {
          title: 'Applications',

          create: 'Create new application',
          read: 'Access any application',
          update: 'Update any application',
          delete: 'Delete any application',

          flag: {
            self: 'Can pin application for themselves',
            global: 'Can pin application for everyone',
          },
        },
        template: {
          title: 'Templates',

          create: 'Create new template',
          read: 'Read any template',
          update: 'Update any template',
          delete: 'Delete any template',
          render: 'Render any template',
        },
        settings: {
          read: 'Access all settings',
          manage: 'Manage all settings',
        },
        reminder: {
          assign: 'Allow reminder assignment',
        },
        'authClient': {
          create: 'Create new auth client',
        },
        'auth-client': {
          title: 'Auth clients',

          create: 'Create new auth client',
          read: 'Read any client',
          update: 'Update any client',
          delete: 'Delete any client',
          authorize: 'Authorize any client',
        },
        'messagebus-queue': {
          title: 'Messaging queues',

          create: 'Create new messaging queue',
          read: 'Read any queue',
          update: 'Update any queue',
          delete: 'Delete any queue',
          queue: {
            read: 'Read messages from queue',
            write: 'Write messages to queue',
          },
        },
      },
    },
  },
}
