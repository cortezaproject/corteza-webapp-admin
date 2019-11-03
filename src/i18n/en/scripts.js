export default {
  label: 'Scripts',

  list: {
    searchForm: {
      query: {
        label: 'Filter scripts list',
        placeholder: 'Filter scripts by name',
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
    information: 'Script information',
    enabled: 'Enabled',
    listed: 'Listed',
    'manage-id-permissions': 'Manage permissions for this script',
    'manage-wc-permissions': 'Manage permissions for all scripts',
    add: 'Add Script',
    'delete': 'Delete script',
    id: {
      label: 'ID',
    },
    name: {
      label: 'Name',
      description: 'As an alternative to script name',
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
      description: 'Logo used in Unify script selector',
    },
    url: {
      label: 'URL',
      description: 'Script URL',
    },
    config: {
      label: 'Configuration',
      description: 'Script configuration (JSON)',
    },
    lastUpdate: {
      label: 'Last update',
    },
    created: {
      label: 'Created',
    },
  },
}
