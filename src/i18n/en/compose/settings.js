export default {
  navItem: {
    label: 'Settings',
  },

  editor: {
    title: 'Compose settings',

    basic: {
      title: 'Basic',

      ui: {
        title: 'User Interface',
        'namespace-switcher': {
          enabled: 'Enable namespace switcher',
          defaultOpen: 'Namespace switcher open by default',
        },
      },
      attachments: {
        page: 'Page attachments',

        record: 'Record attachments',

        'max-size': 'Max size (MB)',
        type: {
          whitelist: 'File type whitelist',
          description: 'MIME types, separated with ",". Example: "text/plain,text/csv"',
        },
      },
    },
  },
}
