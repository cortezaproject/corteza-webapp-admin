import * as applications from './Application/C3'
// import * as settings from './Settings/C3'
import * as federation from './Federation/C3'
import * as queue from './Queues/C3'

export default {
  ...applications,
  // ...settings,
  federation,
  queue,
}
