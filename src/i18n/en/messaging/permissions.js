export default {
  navItem: {
    label: 'Permissions',
  },

  list: {
    title: 'System permissions',

    rules: {
      title: 'List of rules',
      loading: 'Loading permissions',
      submit: 'Submit',

      messaging: {
        title: 'Messaging service',

        access: 'Access to messaging',
        grant: 'Grant permissions on messaging service',
        settings: {
          read: 'Access all settings',
          manage: 'Manage all settings',
        },
        webhook: {
          create: 'Create webhooks',
          manage: {
            all: 'Manage all webhooks',
            own: 'Manage own webhooks',
          },
        },
        channel: {
          title: 'Channels',

          read: 'View any channel',
          join: 'Join any channel',
          leave: 'Leave any channel',
          update: 'Update any channel',
          delete: 'Delete any channel',
          undelete: 'Undelete any channel',
          archive: 'Archive any channel',
          unarchive: 'Unarchive any channel',
          public: {
            create: 'Create public channels',
          },
          private: {
            create: 'Create private channels',
          },
          group: {
            create: 'Create direct messages and group channels',
          },
          members: {
            manage: 'Manage members on any channel',
          },
          webhooks: {
            manage: 'Manage webhooks on any channel',
          },
          attachments: {
            manage: 'Manage attachments on any channel',
          },
          message: {
            send: 'Message sending on any channel',
            embed: 'Embedding in messages on any channel ',
            attach: 'File attaching on any channel',
            reply: 'Reply to messages on any channel',
            react: 'React on messages on any channel',
            update: {
              own: 'Update own messages on any channel',
              all: 'Update any message on any channel',
            },
            delete: {
              own: 'Delete own messages on any channel',
              all: 'Delete any message on any channel',
            },
          },
        },
      },
    },
  },
}
