export default {
  /**
   * Permission translations are also in their respective permission translation files
   * They are duplicated for the permissionsButton component
   */
  permission: {
    resetBack: 'Reset back to "{{current}}"',
    setFor: 'Set permissions for {{target}}',
    saveChanges: 'Save changes',
    base: {
      system: 'System',
      compose: 'Compose',
    },

    role: {
      all: 'all roles',
      specific: 'role "{{target}}"',
    },
    template: {
      all: 'all templates',
      specific: 'template "{{target}}"',
    },
    user: {
      all: 'all users',
      specific: 'user "{{target}}"',
    },
    'auth-client': {
      all: 'all auth clients',
      specific: 'auth client "{{target}}"',
    },
    application: {
      all: 'all applications',
      specific: 'application "{{target}}"',
    },
    workflow: {
      all: 'all workflows',
      specific: 'workflow "{{target}}"',
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
        title: 'Read any role',
        specific: 'Read {{target}}',
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
    'system-template': {
      read: {
        title: 'Read any template',
        specific: 'Read {{target}}',
        description: 'Default: allow',
      },
      update: {
        title: 'Update any template',
        specific: 'Update {{target}}',
        description: 'Default: deny',
      },
      render: {
        title: 'Render any template',
        specific: 'Render {{target}}',
        description: 'Default: allow',
      },
      'delete': {
        title: 'Delete any template',
        specific: 'Delete {{target}}',
        description: 'Default: deny',
      },
    },
    'system-user': {
      read: {
        title: 'Read any user',
        specific: 'Read {{target}}',
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
      'unmask-name': {
        title: 'Show name details for any user',
        specific: 'Show name details for {{target}}',
        description: 'Default: deny',
      },
      'unmask-email': {
        title: 'Show email details for any user',
        specific: 'Show email details for {{target}}',
        description: 'Default: deny',
      },
      impersonate: {
        title: 'Impersonate any user',
        specific: 'Impersonate this user {{target}}',
        description: 'Default: deny',
      },
    },
    'system-application': {
      read: {
        title: 'Read any application',
        specific: 'Read {{target}}',
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
    'system-auth-client': {
      read: {
        title: 'Read any client',
        specific: 'Read client "{{target}}',
        description: 'Default: deny',
      },
      update: {
        title: 'Update any client',
        specific: 'Update client "{{target}}',
        description: 'Default: deny',
      },
      delete: {
        title: 'Delete any client',
        specific: 'Delete client "{{target}}',
        description: 'Default: deny',
      },
      authorize: {
        title: 'Authorize any client',
        specific: 'Authorize client "{{target}}',
        description: 'User can authorize (use) this client. Default: deny',
      },
    },
    'automation-workflow': {
      read: {
        title: 'Read any workflow',
        specific: 'Read this workflow',
        description: 'Default: deny',
      },
      update: {
        title: 'Update any workflow',
        specific: 'Update this workflow',
        description: 'Default: deny',
      },
      delete: {
        title: 'Delete any workflow',
        specific: 'Delete this workflow',
        description: 'Default: deny',
      },
      undelete: {
        title: 'Undelete any workflow',
        specific: 'Undelete this workflow',
        description: 'Default: deny',
      },
      execute: {
        title: 'Execute any workflow',
        specific: 'Execute this workflow',
        description: 'Default: deny',
      },
      'triggers-manage': {
        title: 'Manage all triggers',
        specific: 'Manage triggers for this workflow',
        description: 'Default: deny',
      },
      'sessions-manage': {
        title: 'Manage all sessions',
        specific: 'Manage sessions for this workflow',
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
    noAccess: 'You do not have permissions to access Admin panel',
    logout: 'Logout',

    pagination: {
      prev: 'Prev',
      next: 'Next',
    },

    label: {
      submit: 'Submit',
      yes: 'Yes',
      no: 'No',
    },
  },
}
