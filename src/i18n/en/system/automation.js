export default {
  navItem: {
    label: 'Automation',
  },

  list: {
    title: 'System Automation',

    columns: {
      updatedAt: 'Last update',
    },

    filter: {
      searchQuery: 'Search query',
      incScriptsWithErrors: 'Errors ({{ count }})',
      incScriptsWithTriggers: 'Triggers ({{ count }})',
      incScriptsWithIterator: 'Iterator ({{ count }})',
      incScriptsWithSecurity: 'Security ({{ count }})',
      absoluteTime: 'Show absolute time',
    },
    flags: {
      security: 'Security',
      triggers: 'Triggers',
      iterator: 'Iterator',
    },

    labelMissing: '&lt;label missing&gt;',
  },

}
