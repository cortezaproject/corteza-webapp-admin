export default {
  navItem: {
    label: 'Settings',

  },

  editor: {
    title: 'System settings',

    auth: {
      title: 'Authentication',

      internal: {
        title: 'Internal',
        enabled: 'Internal authentication enabled',
        'password-reset': {
          enabled: 'Password reset enabled',
        },
        signup: {
          enabled: 'Signup enabled',
          'email-confirmation-required': 'Signup email confirmation required',
        },
      },

      mfa: {
        title: 'Multi-factor authentication',
        emailOTP: {
          enabled: 'Allow users to use one-time-password over email',
          enforced: 'Force users to use one-time-password over email',
          expires: {
            label: 'Valid for',
            description: 'How long will password be valid before it expires.',
          },
        },

        TOTP: {
          enabled: 'Allow users to use time based one-time-password',
          enforced: 'Force users to use one-time-password over email',
          issuer: {
            label: 'Issuer',
            description: 'Issuer name will be send to authenticator app when user configures it.',
          },
        },
      },

      mail: {
        title: 'Authentication email sender mail',
        'from-address': 'Sender\'s address',
        'from-name': 'Sender\'s name',
      },
    },

    external: {
      title: 'External Authentication Providers',

      handle: 'Handle',
      external: 'External',
      enabled: 'Enable external authentication',
      'client-key': 'Client key',
      secret: 'Secret',
      issuer: 'OIDC Issuer URL',
      'provider-enabled': 'Enable this external authentication provider',
      oidc: 'OpenID Connect',
      google: 'Google',
      facebook: 'Facebook',
      github: 'GitHub',
      linkedin: 'LinkedIn',

      saml: {
        title: 'SAML',
        cert: 'Certificate public key',
        'cert-key': 'Certificate private key',
        idp: {
          title: 'Identity provider',
          url: 'URL',
          'ident-name': 'Identity payload name',
          'ident-handle': 'Identity payload handle',
          'ident-identifier': 'Identity payload default identifier',
        },

        desc: {
          cert: 'Content will be minimized',
          'cert-key': 'Content will be minimized',
          idp: {
            'ident-name': 'Name field coming from idp',
            'ident-handle': 'Handle field coming from idp',
            'ident-identifier': 'Determines by which field do we match, usually email',
          },
        },
      },
    },
  },
}
