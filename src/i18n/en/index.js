import admin from './admin'
import system from './system'
import compose from './compose'
import messaging from './messaging'

export default {
  admin,
  ...system,
  ...compose,
  ...messaging,
}
