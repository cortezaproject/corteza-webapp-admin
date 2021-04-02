export default {
  navItem: {
    label: 'Workflows',
  },

  list: {
    title: 'Workflows',
    new: 'New',
    permissions: 'Permissions',
    yaml: 'YAML',
    loading: 'Loading workflows',
    numFound: `{{count}} workflow found`,
    numFound_plural: `{{count}} workflows found`,

    filterForm: {
      query: {
        label: 'Filter workflows list',
        placeholder: 'Filter workflows by name',
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
        label: 'deleted workflows',
      },
    },

    columns: {
      handle: 'Name',
      createdAt: 'Created',
      enabled: 'Enabled',
      actions: '',
    },
  },

  editor: {
    title: 'Edit workflow',
    new: 'New',
    permissions: 'Permissions',

    info: {
      title: 'Basic information',

      id: 'ID',
      name: 'Name',
      handle: 'Handle',
      enabled: 'Enabled',
      openBuilder: 'Open builder',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',
    },

    triggers: {
      title: 'Triggers',

      columns: {
        resourceType: 'Resource',
        eventType: 'Event',
        constraints: 'Constraints',
      },
    },
  },
}
