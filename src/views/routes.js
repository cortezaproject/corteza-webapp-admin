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
 * @param ns {String} namespace
 * @param name {String}
 * @param opt {Object}
 * @returns {Object}
 */
function combo (ns, name, opt = {}) {
  const cptlz = (s) => s.slice(0, 1).toUpperCase() + s.slice(1)

  opt = {
    pkey: `${name}ID`,
    plural: `${name}s`,
    cmpDir: cptlz(ns) + '/' + cptlz(name),
    ...opt,
  }

  return {
    ...wrap(`${ns}.${name}`, `/${ns}/${name}`),
    redirect: `/${ns}/${name}/list`,
    children: [
      r(`${ns}.${name}.list`, `list`, `${opt.cmpDir}/List`),
      r(`${ns}.${name}.new`, `new`, `${opt.cmpDir}/Editor`),
      r(`${ns}.${name}.edit`, `edit/:${opt.pkey}`, `${opt.cmpDir}/Editor`),
    ],
  }
}

export default [
  r('settings', '/settings', 'Settings'),

  {
    ...wrap(`system`, `/system`),

    children: [
      r('system.stats', 'stats', 'System/Stats'),

      combo('system', 'user'),
      combo('system', 'role'),
      combo('system', 'application'),
      combo('system', 'script'),

      r('system.settings', 'settings', 'System/Settings'),
      r('system.settings.auth', 'settings/auth', 'System/Settings/Auth'),
      r('system.settings.external-auth', 'settings/external-auth', 'System/Settings/ExternalAuth'),
      r('system.settings.email', 'settings/email', 'System/Settings/Email'),

      r('system.permissions', 'permissions', 'System/Permissions'),
    ],
  },

  {
    ...wrap(`compose`, `/compose`),
    children: [
      r('compose.settings', 'settings', 'Compose/Settings'),
      r('compose.permissions', 'permissions', 'Compose/Permissions'),
    ],
  },

  {
    ...wrap(`messaging`, `/messaging`),
    children: [
      r('messaging.settings', 'settings', 'Messaging/Settings'),
      r('messaging.permissions', 'permissions', 'Messaging/Permissions'),
    ],
  },

  r('auth', '/auth', 'Auth'),
]
