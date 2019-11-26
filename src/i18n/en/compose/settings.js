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
          title: 'Enable namespace switcher',
        },
      },
      attachments: {
        page: 'Page attachments',

        record: 'Record attachments',

        'max-size': 'Max size (MB)',
        type: {
          whitelist: 'File type whitelist',
          description: 'MIME types, sepparated with ",". Example: "text/plain,text/csv"',
        },
      },

      submit: 'Submit',
    },
  },
}