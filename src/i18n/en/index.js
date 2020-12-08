import admin from './admin'
import system from './system'
import compose from './compose'
import federation from './federation'
import messaging from './messaging'
import dashboard from './dashboard'
import ui from './ui'

export default {
  admin,
  dashboard,
  ...system,
  ...compose,
  ...federation,
  ...messaging,
  ...ui,
}
