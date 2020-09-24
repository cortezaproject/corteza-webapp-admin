export default {
  navItem: {
    label: 'Federation',
  },

  list: {
    title: 'Federated Networks',
    new: 'Generate Federation Link',
    yaml: 'YAML',
    loading: 'Loading users',
    numFound: `{{count}} server found`,
    numFound_plural: `{{count}} servers found`,

    filterForm: {
      query: {
        label: 'Filter servers list',
        placeholder: 'Filter servers by name',
      },
    },

    columns: {
      name: 'Name',
      enabled: 'Enabled',
      createdAt: 'Created',
      status: 'Status',
      tags: '',
      actions: '',
    },

    generate: {
      description: 'To add your organization to a federated network send an email invite or share the link below with an administrator of another organization.',
      sendEmail: 'Send Email',
      subject: 'Subject:',
      invitation: 'Invitation to Federated Network',
      hello: 'Hello,',
      body: '{{ userLabel }} is sending you an invitation for Corteza Federated Network. To start sharing data between organizations, go to the admin panel of your Corteza application, click on “Federation” and select “Pair Federation Network” on top right corner. Copy the link below and await confirmation from another administrator.',
      kindRegards: 'Kind regards, Corteza team.',
    },

    pair: {
      label: 'Pair Federation Node',
      note: 'Note:',
      networkEstablished: 'Federated network will be established after the final confirmation from the administrator of another Corteza Federation Node.',

      undefined: {
        description: 'To pair your organization with a federated network, paste the generated URL of another organization below.',
      },

      pending: {
        description: 'Pairing successful, pending final confirmation by administrator',
      },

      confirmPending: {
        description: '{{ email }} accepted the invitation to join “{{ name }}” Federated Network. Click on “Confirm” to start sharing the data.',
      },

    },
  },

  editor: {
    title: 'Edit Federated Node',

    info: {
      title: 'Basic information',

      name: 'Server name',
      url: 'Server URL',
      email: 'Admin Contact',
      tags: {
        label: 'Tags',
        placeholder: '+Add',
      },
      enabled: 'Enabled',
      status: 'Status',

      delete: 'Delete',
      undelete: 'Undelete',
      deletedAt: 'Deleted at',

      updatedAt: 'Updated at',
      createdAt: 'Created at',

      submit: 'Submit',
    },
  },
}
