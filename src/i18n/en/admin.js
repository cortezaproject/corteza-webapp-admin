export default {
  navigation: {
    app: 'Applications',
    user: 'Users',
    role: 'Roles',
    permission: 'Permissions',
    manageApps: 'Manage applications',
    'auth-settings': 'Authentication settings',
  },
  application: {
    information: 'Application information',
    enabled: 'Enabled',
    listed: 'Listed',
    'manage-id-permissions': 'Manage permissions for this application',
    'manage-wc-permissions': 'Manage permissions for all applications',
    add: 'Add Application',
    'delete': 'Delete application',
    id: {
      label: 'ID',
    },
    name: {
      label: 'Name',
      description: 'As an alternative to application name',
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
      description: 'Logo used in Unify application selector',
    },
    url: {
      label: 'URL',
      description: 'Application URL',
    },
    config: {
      label: 'Configuration',
      description: 'Application configuration (JSON)',
    },
    lastUpdate: {
      label: 'Last update',
    },
    created: {
      label: 'Created',
    },
  },
  permission: {
    clearFilter: 'Clear filter',
    setOnAllFiltered: 'Set on all filtered ({{count}})',
    search: 'Search/filter permissions',
    saveChanges: 'Save changes',
    resetBack: 'Reset back to "{{current}}"',
    managePermissions: 'Set base permissions',
    setFor: 'Set permissions for {{target}}',
    base: {
      system: 'System',
      compose: 'Compose',
      messaging: 'Messaging',
    },
    role: {
      all: 'all roles',
      specific: 'role "{{target}}"',
    },
    application: {
      all: 'all applications',
      specific: 'application "{{target}}"',
    },
    system: {
      title: 'System service',
      grant: {
        title: 'Grant permission on system service',
        description: 'Default: deny',
      },
      access: {
        title: 'Allow access to administration',
        description: 'Default: deny',
      },
      'organisation-create': {
        title: 'Create new organisation',
        description: 'Default: deny',
      },
      'role-create': {
        title: 'Create new role',
        description: 'Default: deny',
      },
      'user-create': {
        title: 'Create new user',
        description: 'Default: deny',
      },
      'application-create': {
        title: 'Create new application',
        description: 'Default: deny',
      },
      'settings-read': {
        title: 'Access all settings',
        description: 'Default: allow',
      },
      'settings-manage': {
        title: 'Manage all settings',
        description: 'Default: allow',
      },
    },
    'system-role': {
      read: {
        title: 'Access any role',
        specific: 'Access {{target}}',
        description: 'Default: allow',
      },
      update: {
        title: 'Update any role',
        specific: 'Update {{target}}',
        description: 'Default: allow',
      },
      'delete': {
        title: 'Delete any role',
        specific: 'Delete {{target}}',
        description: 'Default: allow',
      },
      'members-manage': {
        title: 'Manage members for any role',
        specific: 'Manage members for {{target}}',
        description: 'Default: allow',
      },
    },
    'system-user': {
      read: {
        title: 'Access any user',
        specific: 'Access {{target}}',
        description: 'Default: allow',
      },
      update: {
        title: 'Update any user',
        specific: 'Update {{target}}',
        description: 'Default: allow',
      },
      'delete': {
        title: 'Delete any user',
        specific: 'Delete {{target}}',
        description: 'Default: allow',
      },
      suspend: {
        title: 'Suspend any user',
        specific: 'Suspend {{target}}',
        description: 'Default: allow',
      },
      unsuspend: {
        title: 'Unsuspend any user',
        specific: 'Unsuspend {{target}}',
        description: 'Default: allow',
      },
    },
    'system-application': {
      read: {
        title: 'Access any application',
        specific: 'Access {{target}}',
        description: 'Default: allow',
      },
      update: {
        title: 'Update any application',
        specific: 'Update {{target}}',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any application',
        specific: 'Delete {{target}}',
        description: 'Default: deny',
      },
    },
    'system-organisation': {
      access: {
        title: 'Access to all organisations',
        description: 'Default: deny',
      },
    },
    messaging: {
      title: 'Messaging service',
      access: {
        title: 'Access to messaging',
        description: 'Default: deny',
      },
      grant: {
        title: 'Grant permissions on messaging service',
        description: 'Default: deny',
      },
      'channel-public-create': {
        title: 'Create public channels',
        description: 'Default: allow',
      },
      'channel-private-create': {
        title: 'Create private channels',
        description: 'Default: allow',
      },
      'channel-group-create': {
        title: 'Create direct messages and group channels',
        description: 'Default: allow',
      },
      'webhook-create': {
        title: 'Create webhooks',
        description: 'Default: deny',
      },
      'webhook-manage-all': {
        title: 'Manage all webhooks',
        description: 'Default: deny',
      },
      'webhook-manage-own': {
        title: 'Manage own webhooks',
        description: 'Default: deny',
      },
    },
    'messaging-channel': {
      read: {
        title: 'View any channel',
        description: 'Default: allow for public channels or channels you are member of',
      },
      join: {
        title: 'Join any channel',
        description: 'Default: allow for public channels or channels you are member of',
      },
      leave: {
        title: 'Leave any channel',
        description: 'Default: allow',
      },
      update: {
        title: 'Update any channel',
        description: 'Default: allow for public channels or channels you are member of',
      },
      'delete': {
        title: 'Delete any channel',
        description: 'Default: allow for public channels',
      },
      undelete: {
        title: 'Undelete any channel',
        description: 'Default: allow for public channels or channels you are member of',
      },
      archive: {
        title: 'Archive any channel',
        description: 'Default: allow if you are owner of the channel, otherwise deny',
      },
      unarchive: {
        title: 'Unarchive any channel',
        description: 'Default: allow if you are owner of the channel, otherwise deny',
      },
      'members-manage': {
        title: 'Manage members on any channel',
        description: 'Default: allow if you are owner of the channel, otherwise deny',
      },
      'webhooks-manage': {
        title: 'Manage webhooks on any channel',
        description: 'Default: deny',
      },
      'attachments-manage': {
        title: 'Manage attachments on any channel',
        description: 'Default: deny',
      },
      'message-send': {
        title: 'Message sending on any channel',
        description: 'Default: allow',
      },
      'message-embed': {
        title: 'Embedding in messages on any channel ',
        description: 'Default: allow',
      },
      'message-attach': {
        title: 'File attaching on any channel',
        description: 'Default: allow',
      },
      'message-update-own': {
        title: 'Update own messages on any channel',
        description: 'Default: allow',
      },
      'message-update-all': {
        title: 'Update any message on any channel',
        description: 'Default: deny',
      },
      'message-delete-own': {
        title: 'Delete own messages on any channel',
        description: 'Default: allow',
      },
      'message-delete-all': {
        title: 'Delete any message on any channel',
        description: 'Default: deny',
      },
      'message-reply': {
        title: 'Reply to messages on any channel',
        description: 'Default: allow',
      },
      'message-react': {
        title: 'React on messages on any channel',
        description: 'Default: allow',
      },
    },
    compose: {
      title: 'Compose service',
      access: {
        title: 'Access to compose',
        description: 'Default: deny',
      },
      grant: {
        title: 'Grant permissions on compose service',
        description: 'Default: deny',
      },
      'namespace-create': {
        title: 'Create namespaces',
        description: 'Default: deny',
      },
    },
    'compose-page': {
      read: {
        title: 'Read any page',
        description: 'Default: deny',
      },
      update: {
        title: 'Update any page',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any page',
        description: 'Default: deny',
      },
    },
    'compose-trigger': {
      read: {
        title: 'Read any trigger',
        description: 'Default: deny',
      },
      update: {
        title: 'Update any trigger',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any trigger',
        description: 'Default: deny',
      },
    },
    'compose-namespace': {
      read: {
        title: 'Read-access any namespace',
        description: 'Default: deny',
      },
      update: {
        title: 'Update any namespace',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any namespace',
        description: 'Default: deny',
      },
      'module-create': {
        title: 'Create modules under any namespace',
        description: 'Default: deny',
      },
      'chart-create': {
        title: 'Create charts under any namespace',
        description: 'Default: deny',
      },
      'trigger-create': {
        title: 'Create triggers under any namespace',
        description: 'Default: deny',
      },
      'page-create': {
        title: 'Create pages under any namespace',
        description: 'Default: deny',
      },
    },
    'compose-module': {
      read: {
        title: 'Read any module',
        description: 'Default: deny',
      },
      update: {
        title: 'Update any module',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any module',
        description: 'Default: deny',
      },
      'record-create': {
        title: 'Create record under any module',
        description: 'Default: deny',
      },
      'record-read': {
        title: 'Read records under any module',
        description: 'Default: deny',
      },
      'record-update': {
        title: 'Update records under any module',
        description: 'Default: deny',
      },
      'record-delete': {
        title: 'Delete records under any module',
        description: 'Default: deny',
      },
    },
    'compose-chart': {
      read: {
        title: 'Read any chart',
        description: 'Default: deny',
      },
      update: {
        title: 'Update any chart',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any chart',
        description: 'Default: deny',
      },
    },
  },
  role: {
    information: 'Role Information',
    'delete': 'Delete role',
    add: 'Add Role',
    members: 'Members {{count}}',
    unnamed: 'Unnamed role',
    'manage-id-permissions': 'Manage permissions for this role',
    'manage-wc-permissions': 'Manage permissions for all roles',
  },
  user: {
    information: 'User Information',
    'delete': 'Delete user',
    add: 'Add user',
    email: 'Email',
    submit: 'Submit',
    fullName: 'Full name',
    handle: 'Handle (name, username)',
    status: 'User status',
    suspended: 'Suspended',
    active: 'Active',
    kind: 'Kind/Type',
    manage: 'Manage users ({{count}})',
    roles: 'Roles {{count}}',
    password: {
      'new': 'New password',
      change: 'Change password',
      confirm: 'Confirm password',
      missmatch: 'The passwords must match !',
    },
  },
  auth: {
    notSignedIn: 'You\'re not signed in',
    noAccess: 'Not allowed to access Crust Admin',
  },
  'auth-settings': {
    'external-providers': {
      title: 'External providers',
      enabled: 'Enable external authentication',
      handle: 'Handle',
      'client-key': 'Client key',
      secret: 'Secret',
      issuer: 'OIDC Issuer URL',
      'provider-enabled': 'Enable this external authentication provider',
      oidc: 'OpenID Connect',
      gplus: 'Google',
      facebook: 'Facebook',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
  },
  general: {
    label: {
      submit: 'Submit',
      add: 'Add',
      remove: 'Remove',
      search: 'Search',
      searchUsers: 'Search users',
      searchRoles: 'Search roles',
      yes: 'Yes',
      no: 'No',
      name: 'Name',
      lastUpdate: 'Last update',
      created: 'Created',
    },
  },
}
