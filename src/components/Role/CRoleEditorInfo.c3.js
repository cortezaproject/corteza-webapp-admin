export { default as component } from './CRoleEditorMembers.vue'

export const props = {
  role: {
    roleID: '234900180359446530',
    name: 'Name',
    handle: 'Handle',
    createdAt: '2021-06-09T12:03:36Z',
    updatedAt: '2021-06-09T12:03:36Z',
    archivedAt: '',
    deletedAt: '',
  },
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
