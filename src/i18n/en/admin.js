export default {
  navigation: {
    stats: 'Statistics',
    users: 'Users',
    roles: 'Roles',
    permissions: 'Permissions',
    automation: 'Automation',
    settings: 'Settings',
  },

  permission: {
    clearFilter: 'Clear filter',
    setOnAllFiltered: 'Set on all filtered ({{count}})',
    search: 'Search/filter permissions',
    resetBack: 'Reset back to "{{current}}"',
    managePermissions: 'Set base permissions',
    setFor: 'Set permissions for {{target}}',
    saveChanges: 'Save changes',
    base: {
      system: 'System',
      compose: 'Compose',
      messaging: 'Messaging',
    },
    role: {
      all: 'all roles',
      specific: 'role "{{target}}"',
    },
    user: {
      all: 'all users',
      specific: 'user "{{target}}"',
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
        description: 'Default: deny',
      },
      'settings-manage': {
        title: 'Manage all settings',
        description: 'Default: deny',
      },
      'automation-script-create': {
        title: 'Create automation scripts',
        description: 'Default: allow',
      },
      'reminder-assign': {
        title: 'Allow reminder assignment',
        description: 'Default: deny',
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
    'system-automation-script': {
      read: {
        title: 'Read any script',
        specific: 'Read script "{{target}}"',
        description: 'Default: deny',
      },
      update: {
        title: 'Update any script',
        specific: 'Update script "{{target}}"',
        description: 'Default: deny',
      },
      'delete': {
        title: 'Delete any script',
        specific: 'Delete script "{{target}}"',
        description: 'Default: deny',
      },
    },
    'system-automation-trigger': {
      run: {
        title: 'Run any trigger (on any script)',
        specific: 'Can run this trigger',
        description: 'Controls ability to run scripts through manual (or user-invoked) triggers either explicitly or implicitly through browser (Scripts, runnable in User-Agent). Other kinds of automation scripts and triggers that run implicitly on the backend are always executed. Default: allow',
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
      'settings-read': {
        title: 'Access all settings',
        description: 'Default: deny',
      },
      'settings-manage': {
        title: 'Manage all settings',
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
      'settings-read': {
        title: 'Access all settings',
        description: 'Default: deny',
      },
      'settings-manage': {
        title: 'Manage all settings',
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
    handle: 'Handle',
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
    statusChange: 'Change status',
    suspend: 'Suspend user',
    activate: 'Activate user',
    suspendedAt: 'Suspended at',
    active: 'Active',
    kind: 'Kind/Type',
    manage: 'Manage users ({{count}})',
    roles: {
      count: 'Roles ({{count}})',
      manage: 'Manage user\'s roles',
    },
    password: {
      'new': 'New password',
      change: 'Change password',
      confirm: 'Confirm password',
      missmatch: 'The passwords must match !',
    },
    'manage-id-permissions': 'Manage permissions for this user',
    'manage-wc-permissions': 'Manage permissions for all users',
  },
  automation: {
    title: 'List of automation script',
    newLabel: 'Create a new script',
    newPlaceholder: 'Script name',
    import: 'Import automation script(s)',
    add: 'Add script',

    manage: 'Manage automation scripts ({{count}})',

    'manage-id-permissions': 'Manage permissions for this script',
    'manage-wc-permissions': 'Manage permissions for all scripts',

    list: {
      unnamed: '(Unnamed script)',
      column: {
        label: {
          async: 'Async.',
          runAs: 'Run As',
          runInUA: 'In browser',
          critical: 'Critical',
          enabled: 'Enabled',
        },
      },
    },

    edit: {
      settingsTabLabel: 'Settings',

      delete: 'Delete script',

      title: 'Automation script',

      nameLabel: 'Name',
      namePlaceholder: 'Automation script name',

      criticalLabel: 'Critical script',
      criticalHelp: 'Wait until this script is executed. In case of errors, abort execution of other scripts and before* trigger',

      asyncLabel: 'Run this script asynchronously',
      asyncHelp: 'Do not wait for results and ignore errors. Incompatible with critical flag.',

      enabledLabel: 'Enabled',
      enabledHelp: 'Disabled scripts will be ignored',

      securityLabel: 'Security',
      runAsHelp: 'Script runner',
      userPickerPlaceholder: 'Select user',
      runAsCurrentUser: 'Run as "{{ user }}"',

      timeoutLabel: 'Script execution timeout',
      timeoutPlaceholder: '1500',
      timeoutHelp: 'How much time do we wait before aborting the script? Value in milliseconds (1000ms = 1s). It defaults (when 0) to 2s with 30s as maximum. Consult with your administrator for exact numbers and limitations.',

      codeTabLabel: 'Code',

      scheduledTriggers: {
        tabLabel: 'Scheduled',
      },

      mailAutomationTriggers: {
        tabLabel: 'Mail triggers',
        addTrigger: 'Add trigger',
        deleteTrigger: 'Delete',
        addMatcher: 'Add condition',
        matchAll: 'Must match all conditions',
        enable: 'Enable trigger',
        delete: 'Delete trigger',

        matcher: {
          match: 'Value to match',

          fields: {
            placeholder: 'Mail header field',
            subject: 'Subject',
            to: 'To',
            from: 'From',
            cc: 'CC',
            bcc: 'BCC',
            replyTo: 'Reply To',
          },

          operators: {
            placeholder: 'Operator',
            'prefix-ci': 'Match prefix',
            'suffix-ci': 'Match suffix',
            'equal-ci': 'Match full',
            'regex': 'Regex',
            'user': 'Existing user',
          },
        },
      },
    },
    testing: {
      parametersHeadline: 'Parameters & payload:',
      resultsHeadline: 'Results:',
      load: 'Load',
      testInCorredor: 'Test in Corredor',
      testInBrowser: 'Test in Browser',
      warning: '',
    },
  },
  auth: {
    notSignedIn: 'You\'re not signed in',
    noAccess: 'Not allowed to access Crust Admin',
  },
  settings: {
    system: {
      auth: {
        title: 'Authentication',
        'external-providers': {
          title: 'External Authentication Providers',
          external: 'External',
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
        internal: {
          title: 'Internal',
          enabled: 'Internal authentication enabled',
          'password-reset': {
            enabled: 'Password reset enabled',
          },
          signup: {
            enabled: 'Signup enabled',
          },
          'signup-email-confirmation-required': 'Signup email confirmation required',
        },
        frontend: {
          title: 'Frontend',
          url: {
            base: 'Base',
            'email-confirmation': 'Email confirmation',
            'password-reset': 'Password reset',
            redirect: 'Redirect',
          },
        },
        mail: {
          title: 'Mail',
          'from-address': 'Sender address',
          'from-name': 'Sender name',
          emailConfirmation: {
            title: 'Email Confirmation',
            subject: 'Subject',
            body: 'Body',
          },
          passwordReset: {
            title: 'Password Reset',
            subject: 'Subject',
            body: 'Body',
          },
        },
      },
    },
    compose: {
      title: 'Compose',
      ui: {
        title: 'User interface',
        'namespace-switcher': {
          enabled: 'Enable namespace switcher',
          defaultOpen: 'Namespace switcher opened by default',
        },
      },
      file: {
        title: 'File',
        'max-size': 'Max size (MB)',
        type: {
          whitelist: 'File type whitelist',
          description: 'MIME types, sepparated with ",". Example: "text/plain,text/csv"',
        },
      },
    },
    messaging: {
      title: 'Messaging',
      emoji: {
        title: 'Emoji',
        enabled: 'Enable emoji',
      },
      message: {
        attachment: {
          title: 'Attachments',
          enabled: 'Enable attachments',
          'max-size': 'Max size (MB)',
          source: {
            gallery: {
              enabled: 'Enable attchment upload from gallery',
            },
            camera: {
              enabled: 'Enable attachment upload from camera',
            },
          },
          type: {
            whitelist: 'File type whitelist',
            description: 'MIME types, sepparated with ",". Example: "text/plain,text/csv"',
          },
        },
      },
      notification: {
        title: 'Notifications',
        enabled: 'Enable notifications',
        header: {
          template: 'Template for notification header',
          // eslint-disable-next-line
          description: 'Use ${user}/${channel} in place of user and channel names',
        },
        message: {
          'max-length': 'Number of characters shown in the notification',
        },
      },
    },
    mail: {
      title: 'Email',
      header: 'Header (EmailHeaderEn):',
      footer: 'Footer (EmailFooterEn):',
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
