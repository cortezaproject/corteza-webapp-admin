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
    title: {
      edit: 'Edit application',
      create: 'Create application',
    },
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
    },

    unify: {
      title: 'Unify app selector',

      name: {
        label: 'Name',
        description: 'Name used in the application selector',
      },
      logo: {
        label: 'Logo',
        description: 'Logo used in the application selector',
        placeholder: 'Choose a logo or drop it here...',
      },
      url: {
        label: 'URL',
        description: 'Application URL',
      },
      listed: 'Listed',
      pinned: 'Pinned',
      config: {
        label: 'Configuration',
        description: 'Application configuration (JSON)',
      },
    },
  },
}
