export default {
  /**
   * Permission translations are also in their respective permission translation files
   * They are duplicated for the permissionsButton component
   */
  navigation: {
    namespace: 'Namespaces',
    module: 'Modules',
    page: 'Pages',
    chart: 'Charts',
    automation: 'Automation',
    publicPages: 'Public pages',
    configuration: 'Configuration',
    adminPanel: 'Admin panel',
    more: 'More',
    noPageTitle: 'No page title',
    help: {
      forum: 'Help',
      documentation: 'Documentation',
      feedback: 'Send feedback',
      version: 'Version:',
    },
    userSettings: {
      loggedInAs: 'Logged in as {{user}}',
      profile: 'Profile',
      changePassword: 'Change password',
      logout: 'Logout',
    },
  },
  permission: {
    resetBack: 'Reset back to "{{current}}"',
    setFor: 'Set permissions for {{target}}',
    saveChanges: 'Save changes',
    base: {
      system: 'System',
      compose: 'Compose',
    },

    // @todo should be split per component and merged with <component>/permissions.js
    systemComponent: {
      title: 'System service',
      service: {
        NoPermissions: 'You don’t have permission for this action',
        UserHandleNotUnique: 'Handle is already used',
        RoleHandleNotUnique: 'Handle is already used',
      },

      operations: {
        grant: {
          title: 'Grant permission on system service',
          description: 'Default: deny',
        },
        access: {
          title: 'Allow access to administration',
          description: 'Default: deny',
        },
        roleCreate: {
          title: 'Create new role',
          description: 'Default: deny',
        },
        userCreate: {
          title: 'Create new user',
          description: 'Default: deny',
        },
        applicationCreate: {
          title: 'Create new application',
          description: 'Default: deny',
        },
        settingsRead: {
          title: 'Access all settings',
          description: 'Default: deny',
        },
        settingsManage: {
          title: 'Manage all settings',
          description: 'Default: deny',
        },
        reminderAssign: {
          title: 'Allow reminder assignment',
          description: 'Default: deny',
        },
      },
    },
    systemRole: {
      all: 'all roles',
      specific: 'role "{{target}}"',

      operations: {
        read: {
          title: 'Read any role',
          specific: 'Read {{target}}',
          description: 'Default: deny',
        },
        update: {
          title: 'Update any role',
          specific: 'Update {{target}}',
          description: 'Default: deny',
        },
        'delete': {
          title: 'Delete any role',
          specific: 'Delete {{target}}',
          description: 'Default: deny',
        },
        membersManage: {
          title: 'Manage members for any role',
          specific: 'Manage members for {{target}}',
          description: 'Default: deny',
        },
      },
    },
    systemTemplate: {
      all: 'all templates',
      specific: 'template "{{target}}"',

      operations: {
        read: {
          title: 'Read any template',
          specific: 'Read {{target}}',
          description: 'Default: deny',
        },
        update: {
          title: 'Update any template',
          specific: 'Update {{target}}',
          description: 'Default: deny',
        },
        render: {
          title: 'Render any template',
          specific: 'Render {{target}}',
          description: 'Default: deny',
        },
        'delete': {
          title: 'Delete any template',
          specific: 'Delete {{target}}',
          description: 'Default: deny',
        },
      },
    },
    systemUser: {
      all: 'all users',
      specific: 'user "{{target}}"',

      operations: {
        read: {
          title: 'Read any user',
          specific: 'Read {{target}}',
          description: 'Default: deny',
        },
        update: {
          title: 'Update any user',
          specific: 'Update {{target}}',
          description: 'Default: deny',
        },
        'delete': {
          title: 'Delete any user',
          specific: 'Delete {{target}}',
          description: 'Default: deny',
        },
        suspend: {
          title: 'Suspend any user',
          specific: 'Suspend {{target}}',
          description: 'Default: deny',
        },
        unsuspend: {
          title: 'Unsuspend any user',
          specific: 'Unsuspend {{target}}',
          description: 'Default: deny',
        },
        nameUnmask: {
          title: 'Show name details for any user',
          specific: 'Show name details for {{target}}',
          description: 'Default: deny',
        },
        emailUnmask: {
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
    },
    systemApplication: {
      all: 'all applications',
      specific: 'application "{{target}}"',

      operations: {
        read: {
          title: 'Read any application',
          specific: 'Read {{target}}',
          description: 'Default: deny',
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
    },
    systemAuthClient: {
      all: 'all auth clients',
      specific: 'auth client "{{target}}"',

      operations: {
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
    },
    automationWorkflow: {
      all: 'all workflows',
      specific: 'workflow "{{target}}"',

      operations: {
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
