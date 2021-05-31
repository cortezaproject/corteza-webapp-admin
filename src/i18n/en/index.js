import admin from './admin'
import system from './system'
import compose from './compose'
import federation from './federation'
import automation from './automation'
import dashboard from './dashboard'

export default {
  admin,
  dashboard,
  ...system,
  ...compose,
  ...federation,
  ...automation,
}
