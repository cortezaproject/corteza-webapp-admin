export { default as component } from './CApplicationEditorInfo.vue'

export const props = {
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

export const controls = [
  {
    label: 'Name',
    type: 'b-form-input',
    value: (props) => {
      return props.application.name
    },
    handle: (props, value) => {
      props.application.name = value
    },
  },
  {
    label: 'Enabled',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.application.enabled
    },
    handle: (props, value) => {
      props.application.enabled = value
    },
  },
  {
    label: 'Processing',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.processing
    },
    handle: (props, value) => {
      props.processing = value
    },
  },
  {
    label: 'Success',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.success
    },
    handle: (props, value) => {
      props.success = value
    },
  },
  {
    label: 'CanCreate',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.canCreate
    },
    handle: (props, value) => {
      props.canCreate = value
    },
  },
]

export const scenarios = [
  { label: 'Full form',
    props,
  },
  { label: 'Empty form',
    props: {
      ...props,
      application: {
        ...props.application,
        enabled: false,
        name: '',
      },
      canPin: false,
      canCreate: false,
    },
  },
]
