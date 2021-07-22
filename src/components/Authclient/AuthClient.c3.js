const props = {
  authclient: {
    authClientID: '234900180359446530',
    canDeleteAuthClient: true,
    canGrant: true,
    canUpdateAuthClient: true,
    createdAt: '2021-06-09T12:03:38Z',
    enabled: true,
    grant: 'authorization_code',
    handle: 'corteza-webapp',
    meta: {
      description: '',
      name: 'Corteza Web Applications',
    },
    redirectURI: '',
    scope: 'profile api',
    security: Object,
    trusted: true,
  },
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
  processing: false,
  success: false,
}

const controls = [
  {
    label: 'Name',
    type: 'b-form-input',
    value: props.authclient.meta.name,
    handle: (props, value) => {
      props.authclient.meta.name = value
    },
  },
  {
    label: 'CanDeleteAuthClient',
    type: 'b-form-checkbox',
    value: props.authclient.canDeleteAuthClient,
    handle: (props, value) => {
      props.authclient.canDeleteAuthClient = value
    },
  },
  {
    label: 'CanGrant',
    type: 'b-form-checkbox',
    value: props.authclient.canGrant,
    handle: (props, value) => {
      props.authclient.canGrant = value
    },
  },
  {
    label: 'CanUpdateAuthClient',
    type: 'b-form-checkbox',
    value: props.authclient.canUpdateAuthClient,
    handle: (props, value) => {
      props.authclient.canUpdateAuthClient = value
    },
  },
  {
    label: 'createdAt',
    type: 'b-form-input',
    value: props.authclient.createdAt,
    handle: (props, value) => {
      props.authclient.createdAt = value
    },
  },
  {
    label: 'Enabled',
    type: 'b-form-checkbox',
    value: props.authclient.enabled,
    handle: (props, value) => {
      props.authclient.enabled = value
    },
  },
  {
    label: 'RedirectURI',
    type: 'b-form-input',
    value: props.authclient.redirectURI,
    handle: (props, value) => {
      props.authclient.redirectURI = value
    },
  },
  {
    label: 'Trusted',
    type: 'b-form-checkbox',
    value: props.authclient.trusted,
    handle: (props, value) => {
      props.authclient.trusted = value
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
    label: 'Secret',
    type: 'b-form-input',
    value: props.secret,
    handle: (props, value) => {
      props.secret = value
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
      authclient: {
        canDeleteAuthClient: false,
        canGrant: false,
        canUpdateAuthClient: false,
        enabled: false,
        trusted: false,
        redirectURI: '',
      },
      secret: {
        show: false,
        value: '',
      },
    },
  },
]

export default {
  props,
  controls,
  scenarios,
}
