export default [
  {
    items: [
      {
        label: 'dashboard:navItem.label',
        route: 'dashboard',
        icon: 'tachometer-alt',
      },
    ],
  },
  {
    header: {
      label: 'system:navGroup.label',
    },
    items: [
      {
        label: 'system.users:navItem.label',
        route: 'system.user',
        icon: 'users',
      },
      {
        label: 'system.roles:navItem.label',
        route: 'system.role',
        icon: 'hat-cowboy',
      },
      {
        label: 'system.applications:navItem.label',
        route: 'system.application',
        icon: 'th-large',
      },
      {
        label: 'system.templates:navItem.label',
        route: 'system.template',
        icon: 'file-code',
      },
      {
        label: 'system.settings:navItem.label',
        route: 'system.settings',
        icon: 'sliders-h',
        can: ['system/', 'settings.read'],
      },
      {
        label: 'system.permissions:navItem.label',
        route: 'system.permissions',
        icon: 'lock',
        can: ['system/', 'grant'],
      },
      {
        label: 'system.authclients:navItem.label',
        route: 'system.authClient',
        icon: 'key',
      },
      {
        label: 'system.actionlog:navItem.label',
        route: 'system.actionlog',
        icon: 'glasses',
        can: ['system/', 'grant'],
      },
      {
        label: 'system.queues:navItem.label',
        route: 'system.queue',
        icon: 'stream',
      },
    ],
  },

  {
    header: { label: 'compose:navGroup.label' },
    items: [
      {
        label: 'compose.settings:navItem.label',
        route: 'compose.settings',
        icon: 'sliders-h',
        can: ['compose/', 'settings.read'],
      },

      {
        label: 'compose.permissions:navItem.label',
        route: 'compose.permissions',
        icon: 'lock',
        can: ['compose/', 'grant'],
      },
    ],
  },

  {
    header: { label: 'automation:navGroup.label' },
    items: [
      {
        label: 'automation.workflows:navItem.label',
        route: 'automation.workflow',
        icon: 'project-diagram',
        can: ['automation/', 'workflows.search'],
      },

      {
        label: 'automation.sessions:navItem.label',
        route: 'automation.session',
        icon: 'business-time',
        can: ['automation/', 'sessions.search'],
      },

      {
        label: 'automation.scripts:navItem.label',
        route: 'automation.scripts',
        icon: 'scroll',
      },

      {
        label: 'automation.permissions:navItem.label',
        route: 'automation.permissions',
        icon: 'lock',
        can: ['automation/', 'grant'],
      },
    ],
  },
  {
    header: { label: 'federation:navGroup.label' },
    items: [
      {
        label: 'federation.nodes:navItem.label',
        route: 'federation.nodes',
        icon: 'share-alt',
        can: ['federation/', 'pair'],
      },
      {
        label: 'federation.permissions:navItem.label',
        route: 'federation.permissions',
        icon: 'lock',
        can: ['federation/', 'grant'],
      },
    ],
  },
]
