const props = {
  settings: {
    'auth.internal.enabled': true,
    'auth.internal.password-reset.enabled': true,
    'auth.internal.signup.email-confirmation-required': true,
    'auth.internal.signup.enabled': true,
    'auth.multi-factor.email-otp.enabled': true,
    'auth.multi-factor.email-otp.enforced': true,
    'auth.multi-factor.email-otp.expires': 22,
    'auth.multi-factor.totp.enabled': true,
    'auth.multi-factor.totp.enforced': true,
    'auth.multi-factor.totp.issuer': 'Corteza',
    'auth.mail.from-address': 'Corteza@gmail.com',
    'auth.mail.from-name': 'Name',
  },
  // too dynamic for my taste :P
  // external: [
  //   'auth.external.saml.enabled': true,
  //   'auth.external.saml.cert': 'saml cert',
  //   'auth.external.saml.key': 'saml key',
  //   'auth.external.saml.idp.url': 'url',
  //   'auth.external.saml.idp.ident-name': 'name',
  //   'auth.external.saml.idp.ident-handle': 'handle',
  //   'auth.external.saml.idp.ident-identifier': 'identifier',
  //   'auth.external.enabled': true,
  // ],
  processing: false,
  success: false,
  canManage: true,
}

const controls = [
  {
    label: 'Internal enabled',
    type: 'b-form-checkbox',
    value: props.settings['auth.internal.enabled'],
    handle: (props, value) => {
      props.settings['auth.internal.enabled'] = value
    },
  },
  {
    label: 'Internal password reset enabled',
    type: 'b-form-checkbox',
    value: props.settings['auth.internal.password-reset.enabled'],
    handle: (props, value) => {
      props.settings['auth.internal.password-reset.enabled'] = value
    },
  },
  {
    label: 'Internal email confirmation required',
    type: 'b-form-checkbox',
    value: props.settings['auth.internal.signup.email-confirmation-required'],
    handle: (props, value) => {
      props.settings['auth.internal.signup.email-confirmation-required'] = value
    },
  },
  {
    label: 'Internal signup enabled',
    type: 'b-form-checkbox',
    value: props.settings['auth.internal.signup.enabled'],
    handle: (props, value) => {
      props.settings['auth.internal.signup.enabled'] = value
    },
  },
  {
    label: 'Multi factor email OTP enabled',
    type: 'b-form-checkbox',
    value: props.settings['auth.multi-factor.email-otp.enabled'],
    handle: (props, value) => {
      props.settings['auth.internal.signup.enabled'] = value
    },
  },
  {
    label: 'Multi factor email OTP enforced',
    type: 'b-form-checkbox',
    value: props.settings['auth.multi-factor.email-otp.enforced'],
    handle: (props, value) => {
      props.settings['auth.multi-factor.email-otp.enforced'] = value
    },
  },
  {
    label: 'Multi factor email OTP expires',
    type: 'b-form-checkbox',
    value: props.settings['auth.multi-factor.email-otp.expires'],
    handle: (props, value) => {
      props.settings['auth.multi-factor.email-otp.expires'] = value
    },
  },
  {
    label: 'Multi factor OTP enabled',
    type: 'b-form-checkbox',
    value: props.settings['auth.multi-factor.totp.enabled'],
    handle: (props, value) => {
      props.settings['auth.multi-factor.totp.enabled'] = value
    },
  },
  {
    label: 'Multi factor email TOTP enabled',
    type: 'b-form-checkbox',
    value: props.settings['auth.multi-factor.totp.enabled'],
    handle: (props, value) => {
      props.settings['auth.multi-factor.totp.enabled'] = value
    },
  },
  {
    label: 'Multi factor email TOTP enforced',
    type: 'b-form-checkbox',
    value: props.settings['auth.multi-factor.totp.enforced'],
    handle: (props, value) => {
      props.settings['auth.multi-factor.totp.enforced'] = value
    },
  },
  {
    label: 'Multi factor email OTP issuer',
    type: 'b-form-checkbox',
    value: props.settings['auth.multi-factor.totp.issuer'],
    handle: (props, value) => {
      props.settings['auth.multi-factor.totp.issuer'] = value
    },
  },
  {
    label: 'Mail from address',
    type: 'b-form-checkbox',
    value: props.settings['auth.mail.from-address'],
    handle: (props, value) => {
      props.settings['auth.mail.from-address'] = value
    },
  },
  {
    label: 'Mail from name',
    type: 'b-form-checkbox',
    value: props.settings['auth.mail.from-name'],
    handle: (props, value) => {
      props.settings['auth.mail.from-name'] = value
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
    label: 'CanManage',
    type: 'b-form-checkbox',
    value: props.canManage,
    handle: (props, value) => {
      props.canManage = value
    },
  },
]

const scenarios = [
  { label: 'full form',
    props,
  },
  { label: 'empty form',
    props: {
      settings: {
        'auth.internal.enabled': false,
        'auth.internal.password-reset.enabled': false,
        'auth.internal.signup.email-confirmation-required': false,
        'auth.internal.signup.enabled': false,
        'auth.multi-factor.email-otp.enabled': false,
        'auth.multi-factor.email-otp.enforced': false,
        'auth.multi-factor.email-otp.expires': 0,
        'auth.multi-factor.totp.enabled': false,
        'auth.multi-factor.totp.enforced': false,
        'auth.multi-factor.totp.issuer': '',
        'auth.mail.from-address': '',
        'auth.mail.from-name': '',
      },
      canManage: false,
    },
  },
]

export default {
  props,
  controls,
  scenarios,
}
