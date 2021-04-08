export default {
  navItem: {
    label: 'Corredor Scripts',
  },

  list: {
    title: 'Corredor Scripts',

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
