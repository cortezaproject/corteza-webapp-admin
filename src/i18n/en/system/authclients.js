export default {
  navItem: {
    label: 'Auth Clients',
  },

  list: {
    title: 'Auth Clients',
    new: 'New',
    permissions: 'Permissions',
    yaml: 'YAML',
    loading: 'Loading clients',
    numFound: `{{count}} clients found`,
    numFound_plural: `{{count}} clients found`,

    filterForm: {
      query: {
        label: 'Filter clients list',
        placeholder: 'Filter clients',
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
        label: 'deleted clients',
      },
    },

    columns: {
      handle: 'Handle',
      enabled: 'Enabled',
      createdAt: 'Created',
      actions: '',
    },
  },

  editor: {
    title: 'Edit client',
    new: 'New',
    permissions: 'Permissions',

    info: {
      title: 'Basic information',

      handle: 'Handle',

      redirectURI: 'Redirect URI\'s',
      secret: 'Secret',

      profile: 'Allow client access to user\'s profile',
      api: 'Allow client access to Corteza API on behalf of user',

      trusted: {
        label: 'Trusted',
        description: 'When client is trusted users do not see authorization step',
      },
      enabled: 'Enabled',

      validFrom: {
        label: 'Valid from',
        description: 'If not defined the client is valid until expiration',
      },

      expiresAt: {
        label: 'Expires at',
        description: 'If not defined the client has no expiration date',
      },

      security: {
        permittedRoles: {
          label: 'Permitted roles ({{count}})',
          description: 'Only roles in this list will be added into security context when user authorizes this client',
        },
        forbiddenRoles: {
          label: 'Forbidden roles ({{count}})',
          description: 'Roles from this list will be removed from security context when user authorizes this client',
        },
        forcedRoles: {
          label: 'Forced roles ({{count}})',
          description: 'Roles from this list will be always added to security context when user authorizes this client',
        },
      },

      unnamed: 'Unnamed role',

      grant: {
        authorization_code: 'Will be used to authenticate users (grant type = authorization_code)',
        client_credentials: 'Will be used to authenticate machines (grant type = client_credentials)',
      },

      add: 'Add',
      remove: 'Remove',
      searchRoles: 'Search roles',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',
    },
  },
}
