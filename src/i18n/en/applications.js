export default {
  label: 'Applications',

  list: {
    searchForm: {
      query: {
        label: 'Filter applications list',
        placeholder: 'Filter applications by name',
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
    information: 'Application information',
    enabled: 'Enabled',
    listed: 'Listed',
    'manage-id-permissions': 'Manage permissions for this application',
    'manage-wc-permissions': 'Manage permissions for all applications',
    add: 'Add Application',
    'delete': 'Delete application',
    id: {
      label: 'ID',
    },
    name: {
      label: 'Name',
      description: 'As an alternative to application name',
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
      description: 'Logo used in Unify application selector',
    },
    url: {
      label: 'URL',
      description: 'Application URL',
    },
    config: {
      label: 'Configuration',
      description: 'Application configuration (JSON)',
    },
    lastUpdate: {
      label: 'Last update',
    },
    created: {
      label: 'Created',
    },
  },
}