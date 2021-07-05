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
    numFound: `{{count}} user found`,
    numFound_plural: `{{count}} users found`,

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

      confirmEmail: 'Confirm email address',
      revokeAllSession: 'Revoke all active session',

      suspend: 'Suspend',
      unsuspend: 'Unsuspend',
      suspendedAt: 'Suspended at',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',
    },

    password: {
      title: 'Password',

      new: 'New password',
      confirm: 'Confirm password',
      missmatch: 'The passwords must match!',
      length: 'The passwords must be at least {{length}} characters long!',
    },

    mfa: {
      title: 'Multi-factor authentication',

      emailOTP: {
        disabled: {
          text: 'Email OTP protection is <b>disabled</b> for this user.<br />' +
            'Email with the security code on each login will not be sent.',
        },
        disable: {
          label: 'Disable',
        },
        enabled: {
          text: 'Email OTP protection is <b>enabled</b> for this user.<br />\n' +
            'User will receive email with the security code on each login.',
        },
        enable: {
          label: 'Enable',
        },
      },
      TOTP: {
        disabled: {
          text: 'User did not configure TOTP protection.',
        },
        remove: {
          label: 'Remove',
        },
        enabled: {
          text: 'User configured TOTP protection auth mobile app.',
        },
      },
    },

    roles: {
      title: 'Role membership',

      count: 'Roles ({{count}})',
      unnamed: 'Unnamed role',

      add: 'Add',
      remove: 'Remove',
      searchRoles: 'Search roles',
    },

    notifications: {
      title: 'User updated',

      userInfoOK: 'User info successfully updated',
      passwordOK: 'Password successfully  changed',
      membershipOK: 'Membership successfully  updated',
    },
  },
}
