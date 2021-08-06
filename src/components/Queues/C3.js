import * as c3Controls from '../../views/C3/Controls'
import { default as component } from './CQueueEditorInfo.vue'

const props = {
  queue: {
    queueID: '234900180359446530',
    queue: 'Name',
    meta: {
      poll_delay: '1h',
      dispatch_events: 'test',
    },
    consumer: null,
  },
  processing: false,
  success: false,
  canCreate: true,
  consumers: [
    { value: 'store', text: 'Store' },
    { value: 'eventbus', text: 'Eventbus' },
    { value: 'corteza', text: 'Corteza' },
    { value: 'redis', text: 'Redis' },
  ],
}

export default {
  component,
  props,

  controls: [
    c3Controls.select('Consumer', 'consumers'),
    c3Controls.input('Queue name', 'queue.queue'),
    c3Controls.input('Poll delay', 'queue.meta.poll_delay'),
    c3Controls.checkbox('Processing', 'processing'),
    c3Controls.checkbox('Success', 'success'),
    c3Controls.checkbox('CanCreate', 'canCreate'),
  ],

  scenarios: [
    { label: 'Full form',
      props,
    },
    { label: 'Empty form',
      props: {
        ...props,
        queue: {
          queue: '',
          meta: {
            poll_delay: '',
          },
          consumer: null,
        },
        canCreate: false,
      },
    },
  ],
}
// export const controls = [
//   {
//     label: 'Consumer',
//     type: 'b-form-select',
//     options: props.consumers,
//   },
// ]
