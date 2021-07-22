const props = {
  application: {
    applicationID: '234900176853008386',
    createdAt: '2021-06-09T12:03:36Z',
    enabled: true,
    name: 'Low Code',
  },
  unify: {
    config: '',
    listed: true,
    logo: '/applications/low-code-platform.png',
    pinned: false,
    name: 'Low Code',
    url: '/compose',
  },
  canPin: true,
  processing: false,
  success: false,
  canCreate: true,
}

const controls = [
  // editor
  [
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
  ],
  // unify
  [
    {
      label: 'Name',
      type: 'b-form-input',
      value: props.unify.name,
      handle: (props, value) => {
        props.unify.name = value
      },
    },
    {
      label: 'Logo',
      type: 'b-form-input',
      value: props.unify.logo,
      handle: (props, value) => {
        props.unify.logo = value
      },
    },
    {
      label: 'URL',
      type: 'b-form-input',
      value: props.unify.url,
      handle: (props, value) => {
        props.unify.url = value
      },
    },
    {
      label: 'Listed',
      type: 'b-form-checkbox',
      value: props.unify.listed,
      handle: (props, value) => {
        props.unify.listed = value
      },
    },
    {
      label: 'CanPin',
      type: 'b-form-checkbox',
      value: props.canPin,
      handle: (props, value) => {
        props.canPin = value
      },
    },
    {
      label: 'Pinned',
      type: 'b-form-checkbox',
      value: props.unify.pinned,
      handle: (props, value) => {
        props.unify.pinned = value
      },
    },
    {
      label: 'Config',
      type: 'b-form-textarea',
      value: props.unify.config,
      handle: (props, value) => {
        props.unify.config = value
      },
    },
  ],
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
      unify: {
        ...props.unify,
        listed: false,
        name: '',
      },
      canPin: false,
      canCreate: false,
    },
  },
]

export default {
  props,
  controls,
  scenarios,
}
