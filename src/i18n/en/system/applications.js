export default {
  navItem: {
    label: 'Applications',
  },

  list: {
    title: 'Applications',
    new: 'New',
    permissions: 'Permissions',
    yaml: 'YAML',
    loading: 'Loading applications',
    numFound: `{{count}} application found`,
    numFound_plural: `{{count}} applications found`,

    filterForm: {
      query: {
        label: 'Filter applications list',
        placeholder: 'Filter applications by name',
      },

      excluded: {
        label: 'Without',
      },

      inclusive: {
        label: 'Including',
      },

      exclusive: {
        label: 'Only',
      },

      deleted: {
        label: 'deleted applications',
      },
    },

    columns: {
      name: 'Name',
      createdAt: 'Created',
      enabled: 'Enabled',
      actions: '',
    },
  },

  editor: {
    title: 'Edit application',
    new: 'New',
    permissions: 'Permissions',

    info: {
      title: 'Basic information',

      id: 'ID',
      name: 'Name',
      enabled: 'Enabled',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',

      submit: 'Submit',
    },

    unify: {
      title: 'Unify app selector',

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
      listed: 'Listed',
      config: {
        label: 'Configuration',
        description: 'Application configuration (JSON)',
      },

      submit: 'Submit',
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
