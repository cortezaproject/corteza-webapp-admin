export { default as component } from './CRoleEditorInfo.vue'

export const props = {
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
  processing: false,
  success: false,
  canCreate: true,
}

export const controls = [
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

export const scenarios = [
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
