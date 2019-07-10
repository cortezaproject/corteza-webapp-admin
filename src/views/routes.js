function view (name) {
  return function (resolve) {
    return require([`./${name}.vue`], resolve)
  }
}

// @todo make route def. helper (same as one we have with compose, auth)
export default [
  { path: '/auth', name: 'auth', component: view('Auth') },

  {
    path: '/',
    name: 'root',
    component: view('Index'),
    children: [
      { path: 'auth-settings',
        name: 'auth-settings',
        component: view('AuthSettings/Index'),
        children: [
          { path: 'external-providers', name: 'auth-settings.external-providers', component: view('AuthSettings/ExternalProviders'), props: true, canReuse: false },
        ],
      },
      { path: 'roles',
        name: 'roles',
        component: view('Roles/Index'),
        children: [
          { path: ':roleID', name: 'roles.role', component: view('Roles/Role'), props: true, canReuse: false },
        ],
      },
      { path: 'users',
        name: 'users',
        component: view('Users/Index'),
        children: [
          { path: ':userID?', name: 'users.user', component: view('Users/User'), props: true },
        ],
      },
      { path: 'permissions',
        name: 'permissions',
        component: view('Permissions/Index'),
      },
      { path: 'applications',
        name: 'applications',
        component: view('Applications/Index'),
        children: [
          { path: ':applicationID?', name: 'applications.application', component: view('Applications/Application'), props: true },
        ],
      },
    ],
  },

  {
    path: '*',
    redirect: { name: 'root' },
  },
]
