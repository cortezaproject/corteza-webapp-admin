import * as applications from './Application/C3'
import * as queue from './Queues/C3'

import { default as CResourceListStatusFilter } from './CResourceListStatusFilter.c3'

export default {
  ...applications,
  ...queue,

  CResourceListStatusFilter,
}
