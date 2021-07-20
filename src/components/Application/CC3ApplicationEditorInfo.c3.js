const props = {
  application: {
    applicationID: '234900176853008386',
    createdAt: '2021-06-09T12:03:36Z',
    enabled: true,
    name: 'Low Code',
  },
  processing: false,
  success: false,
  canCreate: true,
}

const controls = [
  {
    label: 'Name',
    type: 'b-form-input',
    value: props.application.name,
    handle: (props, value) => {
      props.application.name = value
    },
  },
  {
    label: 'createdAt',
    type: 'b-form-input',
    value: props.application.createdAt,
    handle: (props, value) => {
      props.application.createdAt = value
    },
  },
  {
    label: 'Enabled',
    type: 'b-form-checkbox',
    value: props.application.enabled,
    handle: (props, value) => {
      props.application.enabled = value
    },
  },
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
      application: {
        ...props.application,
        enabled: false,
        name: '',
      },
      canCreate: false,
    },
  },
]

export default {
  props,
  controls,
  scenarios,
}
