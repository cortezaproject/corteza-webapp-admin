export default {
  navItem: {
    label: 'Permissions',
  },

  list: {
    title: 'System permissions',

    rules: {
      title: 'List of rules',
      loading: 'Loading permissions',
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
          read: 'Access any role',
          update: 'Update any role',
          delete: 'Delete any role',
          members: {
            manage: 'Manage members for any role',
          },
        },
        user: {
          title: 'Users',

          create: 'Create new user',
          read: 'Access any user',
          update: 'Update any user',
          delete: 'Delete any user',
          suspend: 'Suspend any user',
          unsuspend: 'Unsuspend any user',
        },
        application: {
          title: 'Applications',

          create: 'Create new application',
          read: 'Access any application',
          update: 'Update any application',
          delete: 'Delete any application',
        },
        settings: {
          read: 'Access all settings',
          manage: 'Manage all settings',
        },
        'automation-script': {
          title: 'Automation scripts',

          create: 'Create automation scripts',
          read: 'Read any script',
          update: 'Update any script',
          delete: 'Delete any script',
        },
        'automation-trigger': {
          title: 'Automation triggers',

          run: 'Run any trigger (on any script)',
        },
        reminder: {
          assign: 'Allow reminder assignment',
        },
      },
    },
  },
}
