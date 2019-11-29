export default {
  navItem: {
    label: 'Settings',
  },

  editor: {
    title: 'Messaging settings',

    basic: {
      title: 'Basic',

      ui: {
        title: 'User Interface',

        emoji: {
          enabled: 'Enable emoji',
        },

        'browser-notifications': {
          title: 'Notifications',
          enabled: 'Enable notifications',
          header: {
            title: 'Template for notification header',
            // eslint-disable-next-line
            description: 'Use ${user}/${channel} in place of user and channel names',
          },
          'message-trim': 'Number of characters shown in the notification',
        },
      },

      message: {
        attachments: {
          title: 'Attachments',
          enabled: 'Enable attachments',
          'max-size': 'Max size (MB)',
          source: {
            gallery: {
              enabled: 'Enable attachment upload from gallery',
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

      submit: 'Submit',
    },
  },
}
