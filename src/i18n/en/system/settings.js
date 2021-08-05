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
          'split-credentials-check': {
            label: 'Enable split-credentials check',
            description: 'Split login into two steps: collect the email input first and show the input for the password on the 2nd screen. ' +
             'Automatically forward user to external identity provider when user does not have his password set and there is only one IdP present',
          },
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
          enabled: 'Allow users to use time based one-time-password (using mobile application)',
          enforced: 'Force users to use time based one-time-password (using mobile application)',
          issuer: {
            label: 'Issuer',
            description: 'Issuer name will be send to authenticator app when user configures it.',
          },
        },
      },

      mail: {
        title: 'Authentication email sender mail',
        'validate-email': 'Please enter valid email address.',
        'from-address': 'Sender\'s address',
        'from-name': 'Sender\'s name',
      },

      url: 'URL',
    },

    external: {
      title: 'External Authentication Providers',

      handle: 'Handle',
      enabled: 'Enable external authentication',

      clientKey: 'Client key',
      clientSecret: 'Secret',
      issuer: 'OIDC Issuer URL',
      certificate: 'Certificate',
      issuerPlaceholder: 'https://issuer.tld',
      issuerHint: 'Where to find the <code>/.well-known/openid-configuration</code> (without the <code>/.well-known/openid-configuration</code> part)',
      providerEnabled: 'Enable',
      oidc: 'OpenID Connect',
      addOidcProvider: 'Add OIDC provider',
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
