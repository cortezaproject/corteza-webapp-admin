export default {
  navItem: {
    label: 'OAuth2 Clients',
  },

  list: {
    title: 'OAuth2 Clients',
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

      trusted: 'Trusted',
      enabled: 'Enabled',

      validFrom: {
        label: 'Valid from',
        description: 'If not defined the client is valid until expiration',
      },

      expiresAt: {
        label: 'Expires at',
        description: 'If not defined the client has no expiration date',
      },
      count: {
        allowed: 'Allowed roles ({{count}})',
        denied: 'Denied roles ({{count}})',
        forced: 'Forced roles ({{count}})',
      },
      unnamed: 'Unnamed role',

      grant: {
        authorization_code: 'Will be used to authenticate users',
        client_credentials: 'Will be used to authenticate machines',
      },

      add: 'Add',
      remove: 'Remove',
      searchRoles: 'Search roles',

      suspend: 'Suspend',
      unsuspend: 'Unsuspend',
      suspendedAt: 'Suspended at',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',
    },
  },
}
