const props = {
  roles: [
    {
      canDeleteRole: false,
      canGrant: true,
      canUpdateRole: false,
      createdAt: '2021-06-09T12:03:36Z',
      handle: 'everyone',
      name: 'Everyone',
      roleID: '1',
    },
    {
      canDeleteRole: true,
      canGrant: true,
      canUpdateRole: true,
      createdAt: '2021-06-09T12:03:36Z',
      handle: 'admins',
      name: 'Administrators',
      roleID: '2',
    },
    {
      canDeleteRole: true,
      canGrant: true,
      canUpdateRole: true,
      createdAt: '2021-06-09T12:03:36Z',
      handle: 'federation',
      name: 'Federation',
      roleID: '234900176853467138',
    },
    {
      canDeleteRole: true,
      canGrant: true,
      canUpdateRole: true,
      createdAt: '2021-06-09T12:03:36Z',
      handle: 'developers',
      name: 'Developers',
      roleID: '234900176886562818',
    },
  ],
  rolesExcluded: [
    {
      canDeleteRole: true,
      canGrant: true,
      canUpdateRole: true,
      createdAt: '2021-06-09T12:03:36Z',
      handle: 'developers',
      name: 'Developers',
      roleID: '234900176886562818',
    },
  ],
  permissions: {},
  rolePermissions: [],
  canGrant: true,
  loaded: true,
  processing: false,
  success: false,
}

const controls = [
  {
    label: 'CanGrant',
    type: 'b-form-checkbox',
    value: props.canGrant,
    handle: (props, value) => {
      props.canGrant = value
    },
  },
  {
    label: 'Loaded',
    type: 'b-form-checkbox',
    value: props.loaded,
    handle: (props, value) => {
      props.loaded = value
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
]

const scenarios = [
  { label: 'full form',
    props,
  },
  { label: 'empty form',
    props: {
      ...props,
      canGrant: false,
    },
  },
]

export default {
  props,
  controls,
  scenarios,
}
