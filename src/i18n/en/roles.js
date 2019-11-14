export default {
  label: 'Roles',

  list: {
    title: 'Roles',
    loading: 'Loading roles',
    numFound: `{{0}} role(s) found`,

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

  editor: {
    title: 'Edit role',

    info: {
      title: 'Basic information',
      name: 'Role name',
      handle: 'Handle',

      archive: 'Archive',
      unarchive: 'Unarchive',
      archivedAt: 'Archived at',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',

      submit: 'Submit',
    },

    members: {
      title: 'Role members',

      count: 'Members ({{count}})',
      unnamed: 'Unnamed user',

      add: 'Add',
      remove: 'Remove',
      searchUsers: 'Search users',

      submit: 'Submit',
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
