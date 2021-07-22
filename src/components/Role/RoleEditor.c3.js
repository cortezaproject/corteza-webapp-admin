const props = {
  // info
  role: {
    roleID: '234900180359446530',
    name: 'Name',
    handle: 'Handle',
    createdAt: '2021-06-09T12:03:36Z',
    updatedAt: '2021-06-09T12:03:36Z',
    archivedAt: '',
    deletedAt: '',
  },
  // members
  members: {
    processing: false,
    success: false,
  },
  currentMembers: [
    {
      email: 'katrin.yordanova@crust.tech',
      emailConfirmed: true,
      handle: 'KY',
      name: 'Katrin Yordanova',
      userID: '241120280292884482',
    },
  ],
  // for both components
  processing: false,
  success: false,
  canCreate: true,
}

const controls = [
  {
    label: 'Processing',
    type: 'b-form-checkbox',
    value: props.processing,
    handle: (props, value) => {
      props.processing = value
    },
  },
  {
    label: 'Success',
    type: 'b-form-checkbox',
    value: props.success,
    handle: (props, value) => {
      props.success = value
    },
  },
  {
    label: 'CanCreate',
    type: 'b-form-checkbox',
    value: props.canCreate,
    handle: (props, value) => {
      props.canCreate = value
    },
  },
]

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
