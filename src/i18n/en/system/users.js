export default {
  navItem: {
    label: 'Users',
  },

  list: {
    title: 'Users',
    new: 'New',
    permissions: 'Permissions',
    yaml: 'YAML',
    loading: 'Loading users',
    numFound: `{{0}} user(s) found`,

    filterForm: {
      query: {
        label: 'Filter users list',
        placeholder: 'Filter users by name, email',
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

      suspended: {
        label: 'suspended users',
      },

      deleted: {
        label: 'deleted users',
      },
    },

    columns: {
      name: 'Name',
      email: 'Email',
      handle: 'Handle',
      createdAt: 'Created',
      enabled: 'Enabled',
      actions: '',
    },
  },

  editor: {
    title: 'Edit user',
    new: 'New',
    permissions: 'Permissions',

    info: {
      title: 'Basic information',

      email: 'Email',
      name: 'Full name',
      handle: 'Handle',

      suspend: 'Suspend',
      unsuspend: 'Unsuspend',
      suspendedAt: 'Suspended at',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',

      submit: 'Submit',
    },

    password: {
      title: 'Password',

      new: 'New password',
      confirm: 'Confirm password',
      missmatch: 'The passwords must match !',
      length: 'The passwords must be at least {{length}} characters long!',

      submit: 'Submit',
    },

    roles: {
      title: 'Role membership',

      count: 'Roles ({{count}})',
      unnamed: 'Unnamed role',

      add: 'Add',
      remove: 'Remove',
      searchRoles: 'Search roles',

      submit: 'Submit',
    },
  },
}
