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
    },

    password: {
      title: 'Password',
      // @todo
    },

    roles: {
      title: 'Role membership',
      // @todo
    },
  },
}
