export default {
  label: 'Roles',

  list: {
    searchForm: {
      query: {
        label: 'Filter roles list',
        placeholder: 'Filter roles by name',
      },
    },

    columns: {
      name: 'Name',
      createdAt: 'Created',
      enabled: 'Enabled',
      actions: '',
    },
  },

  ____legacy: {
    information: 'Role information',
    enabled: 'Enabled',
    listed: 'Listed',
    'manage-id-permissions': 'Manage permissions for this role',
    'manage-wc-permissions': 'Manage permissions for all roles',
    add: 'Add Role',
    'delete': 'Delete role',
    id: {
      label: 'ID',
    },
    name: {
      label: 'Name',
      description: 'As an alternative to role name',
    },
    appSelector: {
      label: 'Unify app selector',
    },
    icon: {
      label: 'Icon',
      description: 'Icon used in Unify tab',
    },
    logo: {
      label: 'Logo',
      description: 'Logo used in Unify role selector',
    },
    url: {
      label: 'URL',
      description: 'Role URL',
    },
    config: {
      label: 'Configuration',
      description: 'Role configuration (JSON)',
    },
    lastUpdate: {
      label: 'Last update',
    },
    created: {
      label: 'Created',
    },
  },
}
