export default {
  navItem: {
    label: 'Messaging Queues',
  },

  list: {
    title: 'Messaging queues',
    new: 'New',
    loading: 'Loading messaging queues',

    columns: {
      queue: 'Queue',
      consumer: 'Consumer',
      createdAt: 'Created At',
      actions: 'Actions',
    },

    filterForm: {
      handle: {
        label: 'Filter queues list',
        placeholder: 'Filter queues by name',
      },

      excluded: {
        label: 'Without',
      },

      inclusive: {
        label: 'Including',
      },

      exclusive: {
        label: 'Only',
      },

      deleted: {
        label: 'deleted queues',
      },
    },
  },

  editor: {
    new: 'New',

    title: {
      new: 'Add a queue',
      edit: 'Edit queue',
    },

    info: {
      title: 'Basic information',
      consumer: 'Consumer',
      name: 'Queue name',

      dispatch_events: 'Dispatch events',
      dispatch_events_desc: 'Dispatch events notifies the eventbus of queue message changes (new, processed, ...)',

      poll_delay: 'Polling changes delay',
      poll_delay_empty: 'Poll delay will not be used; to enable, use duration format (ie: 1h / 1m15s / 1h90s)',
      poll_delay_set: 'Poll delay will be used; if empty, it will not be used.',

      deletedAt: 'Deleted at',
      updatedAt: 'Updated at',
      createdAt: 'Created at',

      delete: 'Delete',
      undelete: 'Undelete',
    },
  },
}
