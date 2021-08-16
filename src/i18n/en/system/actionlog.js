export default {
  navItem: {
    label: 'Action log',
  },

  list: {
    title: 'Action log',

    loadOlder: 'Load older actions',

    columns: {
      timestamp: 'Timestamp',
      description: 'Description',
      resource: 'Resource',
      requestOrigin: 'Origin',
      action: 'Action',
      actor: 'User',
      severity: 'Severity',
    },

    filter: {
      from: 'Starting from',
      to: 'Ending at',
      'choose-date': 'Choose a date',
      'no-time': 'No time selected',
      today: 'Today',
      resource: 'Resource',
      action: 'Action',
      actor: 'User ID',
      search: 'Search',
    },

    severity: {
      emergency: 'Emergency',
      alert: 'Alert',
      critical: 'Critical',
      error: 'Error',
      warning: 'Warning',
      notice: 'Notice',
      info: 'Info',
      debug: 'Debug',
    },

    details: {
      id: 'ID',
      header: 'Details',
      timestamp: 'Timestamp',
      requestOrigin: 'Request Origin',
      requestID: 'Request ID',
      actorIPAddr: 'Actor/User',
      actor: 'User',
      actorID: 'User ID',
      severity: 'Severity',
      resource: 'Resource',
      action: 'Action',
      headerAdditional: 'Additional information',
      description: 'Description',
      error: 'Error',
    },
  },
}
