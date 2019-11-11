/**
 * Simple route generator
 *
 * @param name {String}
 * @param path {String}
 * @param component {String}
 * @returns {Object}
 */
function r (name, path, component) {
  return {
    path,
    name,
    component: () => import(`./${component}.vue`),
    props: true,
    // canReuse: false,
  }
}

/**
 * Wrap route generator
 *
 * Creates a route with simple template that contains only router-view component
 *
 * @param name
 * @param path
 * @param name {String}
 * @param path {String}
 * @param component {String}
 * @returns {Object}
 */
function wrap (name, path) {
  return {
    path,
    name,
    component: { name: name + 'Wrap', template: `<router-view />` },
    props: true,
    // canReuse: false,
  }
}

// Generates 3 routes - list, new-form, edit-form

/**
 * Combo routes generator
 *
 * Creates 4 routes - list, editor for new and existing / wrapper
 *
 * @param name {String}
 * @param opt {Object}
 * @returns {Object}
 */
function combo (name, opt = {}) {
  opt = {
    pkey: `${name}ID`,
    plural: `${name}s`,
    cmpDir: name.slice(0, 1).toUpperCase() + name.slice(1),
    ...opt,
  }

  return [
    {
      ...wrap(`${name}`, `/${name}`),
      children: [
        r(`${name}.list`, `list`, `${opt.cmpDir}/List`),
        r(`${name}.new`, `new`, `${opt.cmpDir}/Editor`),
        r(`${name}.edit`, `edit/:${opt.pkey}`, `${opt.cmpDir}/Editor`),
      ],
    },
  ]
}

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
