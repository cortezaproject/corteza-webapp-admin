import stats from './stats'
import applications from './applications'
import users from './users'
import roles from './roles'
import scripts from './scripts'
import settings from './settings'
import permissions from './permissions'

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
  'system.scripts': scripts,

  'system.settings': settings,
  'system.permissions': permissions,
}
