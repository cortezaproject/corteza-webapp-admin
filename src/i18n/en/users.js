export default {
  label: 'Users',

  list: {
    searchForm: {
      query: {
        label: 'Filter users list',
        placeholder: 'Filter users by name, email',
      },
    },

    columns: {
      name: 'Name',
      email: 'Email',
      createdAt: 'Created',
      enabled: 'Enabled',
      actions: '',
    },
  },

  ____legacy: {
    information: 'User information',
    enabled: 'Enabled',
    listed: 'Listed',
    'manage-id-permissions': 'Manage permissions for this user',
    'manage-wc-permissions': 'Manage permissions for all users',
    add: 'Add User',
    'delete': 'Delete user',
    id: {
      label: 'ID',
    },
    name: {
      label: 'Name',
      description: 'As an alternative to user name',
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
      description: 'Logo used in Unify user selector',
    },
    url: {
      label: 'URL',
      description: 'User URL',
    },
    config: {
      label: 'Configuration',
      description: 'User configuration (JSON)',
    },
    lastUpdate: {
      label: 'Last update',
    },
    created: {
      label: 'Created',
    },
  },
}
