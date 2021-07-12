export default {
  navItem: {
    label: 'API gateways',
  },

  list: {
    title: 'API gateways',
    new: 'New',
    permissions: 'Permissions',
    yaml: 'YAML',
    loading: 'Loading API gateways',
    numFound: `{{count}} API gateway found`,
    numFound_plural: `{{count}} API gateways found`,

    filterForm: {
      query: {
        label: 'Filter API gateways list',
        placeholder: 'Filter API gateways by name',
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
        label: 'deleted API gateways',
      },
    },

    columns: {
      endpoint: 'Endpoint',
      createdAt: 'Created',
      enabled: 'Enabled',
      actions: '',
    },
  },

  editor: {
    title: 'Edit API gateway',
    new: 'New',
    permissions: 'Permissions',

    info: {
      title: 'Basic information',

      id: 'ID',
      endpoint: 'Endpoint',
      method: 'Method',
      enabled: 'Enabled',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',
    },
  },
}
