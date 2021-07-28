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

const controls = [
  {
    label: 'Consumer',
    type: 'b-form-select',
    options: props.consumers,
  },
  {
    label: 'Queue name',
    type: 'b-form-input',
    value: (props) => {
      return props.queue.queue
    },
    handle: (props, value) => {
      props.queue.queue = value
    },
  },
  {
    label: 'Poll delay',
    type: 'b-form-input',
    value: (props) => {
      return props.queue.meta.poll_delay
    },
    handle: (props, value) => {
      props.queue.meta.poll_delay = value
    },
  },
  {
    label: 'Processing',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.processing
    },
    handle: (props, value) => {
      props.processing = value
    },
  },
  {
    label: 'Success',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.success
    },
    handle: (props, value) => {
      props.success = value
    },
  },
  {
    label: 'CanCreate',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.canCreate
    },
    handle: (props, value) => {
      props.canCreate = value
    },
  },
]

const scenarios = [
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
]

export default {
  props,
  controls,
  scenarios,
}
