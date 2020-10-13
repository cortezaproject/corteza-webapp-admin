export default {
  navItem: {
    label: 'Permissions',
  },

  list: {
    title: 'Compose permissions',

    rules: {
      title: 'List of rules',
      loading: 'Loading permissions',
      add: 'Add role',
      addRole: 'Add new role',
      noRole: 'No role selected',
      tip1: 'Click on permission/role cell to allow a specific operation',
      tip2: 'Use Alt-Click to set explicit deny on operation',

      compose: {
        title: 'Compose service',

        access: 'Access to compose',
        grant: 'Grant permissions on compose service',
        namespace: {
          title: 'Namespaces',

          create: 'Create namespaces',
          read: 'Access any namespace',
          manage: 'Manage any namespace',
          update: 'Update any namespace',
          delete: 'Delete any namespace',
          module: {
            create: 'Create modules under any namespace',
          },
          chart: {
            create: 'Create charts under any namespace',
          },
          page: {
            create: 'Create pages under any namespace',
          },
          'automation-script': {
            create: 'Create automation script under any namespace',
          },
        },
        settings: {
          read: 'Access all settings',
          manage: 'Manage all settings',
        },
        module: {
          title: 'Modules',

          read: 'Read any module',
          update: 'Update any module',
          delete: 'Delete any module',
          record: {
            create: 'Create record under any module',
            read: 'Read records under any module',
            update: 'Update records under any module',
            delete: 'Delete records under any module',
          },
          'automation-trigger': {
            manage: 'Manage any automation trigger',
          },
        },
        'module-field': {
          title: 'Module fields',

          record: {
            value: {
              read: 'Read any module field',
              update: 'Update any module field',
            },
          },
        },
        page: {
          title: 'Pages',

          read: 'Read any page',
          update: 'Update any page',
          delete: 'Delete any page',
        },
        chart: {
          title: 'Charts',

          read: 'Read any chart',
          update: 'Update any chart',
          delete: 'Delete any chart',
        },
      },
    },
  },
}
