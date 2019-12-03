export default {
  /**
   * Permission translations are also in their respective permission translation files
   * They are duplicated for the permissionsButton component
   */
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
      service: {
        NoPermissions: 'You don’t have permission for this action',
        UserHandleNotUnique: 'Handle is already used',
        RoleHandleNotUnique: 'Handle is already used',
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

  // Leaving this here incase it is needed in the future
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

  general: {
    label: {
      yes: 'Yes',
      no: 'No',
    },
  },
}
