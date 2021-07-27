const props = {
  application: {
    applicationID: '234900176853008386',
    createdAt: '2021-06-09T12:03:36Z',
    enabled: true,
    name: 'Low Code',
  },
  unify: {
    config: '"data"',
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
  {
    label: 'Unify name',
    type: 'b-form-input',
    value: (props) => {
      return props.unify.name
    },
    handle: (props, value) => {
      props.unify.name = value
    },
  },
  {
    label: 'Logo',
    type: 'b-form-input',
    value: (props) => {
      return props.unify.logo
    },
    handle: (props, value) => {
      props.unify.logo = value
    },
  },
  {
    label: 'URL',
    type: 'b-form-input',
    value: (props) => {
      return props.unify.url
    },
    handle: (props, value) => {
      props.unify.url = value
    },
  },
  {
    label: 'Listed',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.unify.listed
    },
    handle: (props, value) => {
      props.unify.listed = value
    },
  },
  {
    label: 'CanPin',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.canPin
    },
    handle: (props, value) => {
      props.canPin = value
    },
  },
  {
    label: 'Pinned',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.unify.pinned
    },
    handle: (props, value) => {
      props.unify.pinned = value
    },
  },
  {
    label: 'Config',
    type: 'b-form-textarea',
    value: (props) => {
      return props.unify.config
    },
    handle: (props, value) => {
      props.unify.config = value
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
      unify: {
        ...props.unify,
        listed: false,
        name: '',
        config: '',
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
