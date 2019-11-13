export default {

  list: {
    title: 'Users',
    loading: 'Loading users',
    numFound: `{{0}} user(s) found`,

    searchForm: {
      query: {
        label: 'Filter users list',
        placeholder: 'Filter users by name, email',
      },
      incSuspended: {
        label: 'Include suspended',
      },
      incDeleted: {
        label: 'Include deleted',
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

  editor: {
    title: 'Edit user',

    info: {
      title: 'Basic information',
      email: 'Email',
      name: 'Full name',
      handle: 'Handle',

      submit: 'Submit',
      delete: 'Delete',
      suspend: 'Suspend',
      unsuspend: 'Unsuspend',
    },

    status: {
      title: 'Status',

      current: 'Current status',
      active: 'Active',
      suspended: 'Suspended',

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
      // @todo
    },
  },
}
