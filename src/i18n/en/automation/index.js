import workflows from './workflows'
import scripts from './scripts'
import sessions from './sessions'
import permissions from './permissions'

export default {
  automation: {
    navGroup: {
      label: 'Automation',
    },
  },

  'automation.workflows': workflows,
  'automation.scripts': scripts,
  'automation.sessions': sessions,
  'automation.permissions': permissions,
}
