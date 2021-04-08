import stats from './stats'
import applications from './applications'
import users from './users'
import roles from './roles'
import templates from './templates'
import scripts from './scripts'
import settings from './settings'
import authclients from './authclients'
import permissions from './permissions'
import actionlog from './actionlog'

export default {
  system: {
    navGroup: {
      label: 'System',
    },
  },

  'system.stats': stats,
  'system.applications': applications,
  'system.users': users,
  'system.roles': roles,
  'system.templates': templates,
  'system.scripts': scripts,

  'system.settings': settings,
  'system.authclients': authclients,
  'system.permissions': permissions,
  'system.actionlog': actionlog,
}
