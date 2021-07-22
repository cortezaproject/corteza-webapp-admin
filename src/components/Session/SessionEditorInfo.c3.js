const props = {
  session: {
    sessionID: '234900180359446530',
    workflowID: '234900180359446530',
    status: 'Happy',
    error: '',
    resourceType: 'resourceType',
    eventType: 'eventType',
    createdBy: 'Me',
    completedAt: '2021-06-09T12:03:38Z',
    createdAt: '2021-06-09T12:03:38Z',
    deletedAt: '',
  },
  user: {
    userID: '234900180359446530',
    name: 'Dave',
    username: 'DD',
    email: 'dd@bg.com',
  },
  processing: false,
}

const controls = null

const scenarios = [
  { label: 'full form',
    props,
  },
  { label: 'empty form',
    props: {
      ...props,
      canCreate: false,
    },
  },
]

export default {
  props,
  controls,
  scenarios,
}
