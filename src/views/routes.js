function view (name) {
  return function (resolve) {
    return require([`./${name}.vue`], resolve)
  }
}

// @todo make route def. helper (same as one we have with compose, auth)
export default [
  { path: '/auth', name: 'auth', component: view('Auth') },

  { path: '/settings',
    name: 'settings',
    component: view('Settings/Index'),
    children: [
      { path: '/auth-settings', name: 'auth-settings', component: view('Settings/Auth'), props: true, canReuse: false },
      { path: '/external-providers', name: 'external-providers', component: view('Settings/External'), props: true, canReuse: false },
      { path: '/compose', name: 'compose', component: view('Settings/Compose'), props: true, canReuse: false },
      { path: '/messaging', name: 'messaging', component: view('Settings/Messaging'), props: true, canReuse: false },
      { path: '/email', name: 'email', component: view('Settings/Email'), props: true, canReuse: false },
    ],
  },
  { path: '/roles',
    name: 'roles',
    component: view('Roles/Index'),
    children: [
      { path: '/:roleID', name: 'roles.role', component: view('Roles/Role'), props: true, canReuse: false },
    ],
  },
  { path: '/users',
    name: 'users',
    component: view('Users/Index'),
    children: [
      { path: '/:userID?', name: 'users.user', component: view('Users/User'), props: true },
    ],
  },
  { path: '/permissions',
    name: 'permissions',
    component: view('Permissions/Index'),
  },
  { path: '/applications',
    name: 'applications',
    component: view('Applications/Index'),
    children: [
      { path: '/:applicationID?', name: 'applications.application', component: view('Applications/Application'), props: true },
    ],
  },
  { path: '/automation',
    name: 'automation',
    component: view('Automation/Index'),
    children: [
      { path: ':scriptID?', name: 'automation.script', component: view('Automation/Script'), props: true },
    ],
  },

  {
    path: '*',
    redirect: { name: 'root' },
  },
]
