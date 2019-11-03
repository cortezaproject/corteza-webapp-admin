function r (name, path, component) {
  return {
    path,
    name,
    component: () => import(`./${component}.vue`),
    props: true,
  }
}

// Generates 3 routes - list, new-form, edit-form
function combo (name, opt) {
  opt = {
    pkey: `${name}ID`,
    plural: `${name}s`,
    cmpDir: name.slice(0, 1).toUpperCase() + name.slice(1),
    ...opt,
  }

  return [
    r(`${name}.list`, `/${name}/list`, `${opt.cmpDir}/List`),
    r(`${name}.new`, `/${name}/new`, `${opt.cmpDir}/Editor`),
    r(`${name}.edit`, `/${name}/edit/:${opt.pkey}`, `${opt.cmpDir}/Editor`),
  ]
}

// @todo make route def. helper (same as one we have with compose, auth)
export default [

  r('settings', '/settings', 'Settings'),

  ...combo('user'),
  ...combo('role'),
  ...combo('application'),
  ...combo('script'),

  // { path: '/settings',
  //   name: 'settings',
  //   component: view('Settings/Index'),
  //   children: [
  //     { path: '/auth-settings', name: 'auth-settings', component: view('Settings/Auth'), props: true, canReuse: false },
  //     { path: '/external-providers', name: 'external-providers', component: view('Settings/External'), props: true, canReuse: false },
  //     { path: '/compose', name: 'compose', component: view('Settings/Compose'), props: true, canReuse: false },
  //     { path: '/messaging', name: 'messaging', component: view('Settings/Messaging'), props: true, canReuse: false },
  //     { path: '/email', name: 'email', component: view('Settings/Email'), props: true, canReuse: false },
  //   ],
  // },
  // { path: '/permissions',
  //   name: 'permissions',
  //   component: view('Permissions/Index'),
  // },

  r('auth', '/auth', 'Auth'),

  // {
  //   path: '*',
  //   redirect: { name: 'root' },
  // },
]
