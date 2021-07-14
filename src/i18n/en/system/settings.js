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
      enabled: 'Enable external authentication',

      clientKey: 'Client key',
      clientSecret: 'Secret',
      issuer: 'OIDC Issuer URL',
      issuerPlaceholder: 'https://issuer.tld',
      issuerHint: 'Where to find the <code>/.well-known/openid-configuration</code> (without the <code>/.well-known/openid-configuration</code> part)',
      providerEnabled: 'Enable',
      oidc: 'OpenID Connect',
      addOidcProvider: 'Add OIDC provider',
      google: 'Google',
      facebook: 'Facebook',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
  },
}
