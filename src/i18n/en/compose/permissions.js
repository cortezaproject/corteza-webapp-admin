export default {
  navItem: {
    label: 'Permissions',
  },

  list: {
    title: 'Compose permissions',

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
        type: { label: 'Compose service' },
        operations: {
          grant: 'Grant permissions on compose service',
          namespaceCreate: 'Create namespaces',
          namespacesSearch: 'List and search namespaces',
          settingsRead: 'Access all settings',
          settingsManage: 'Manage all settings',
        },
      },

      namespace: {
        type: { label: 'Namespaces' },
        operations: {
          read: 'Access any namespace',
          manage: 'Manage any namespace',
          update: 'Update any namespace',
          delete: 'Delete any namespace',

          moduleCreate: 'Create modules under any namespace',
          modulesSearch: 'List and search modules under any namespace',
          chartCreate: 'Create charts under any namespace',
          chartsSearch: 'List and search charts under any namespace',
          pageCreate: 'Create pages under any namespace',
          pagesSearch: 'List and search pages under any namespace',
        },
      },
      module: {
        type: { label: 'Modules' },
        operations: {
          read: 'Read any module',
          update: 'Update any module',
          delete: 'Delete any module',
          recordCreate: 'Create record under any module',
          recordsSearch: 'List and search records under any module',
        },
      },
      moduleField: {
        type: { label: 'Module fields' },
        operations: {
          recordValueRead: 'Read any module field',
          recordValueUpdate: 'Update any module field',
        },
      },
      page: {
        type: { label: 'Pages' },
        operations: {
          read: 'Read any page',
          update: 'Update any page',
          delete: 'Delete any page',
        },
      },
      record: {
        type: { label: 'Records' },
        operations: {
          read: 'Read any record',
          update: 'Update any record',
          delete: 'Delete any record',
        },
      },
      chart: {
        type: { label: 'Charts' },
        operations: {
          read: 'Read any chart',
          update: 'Update any chart',
          delete: 'Delete any chart',
        },
      },
    },
  },
}
