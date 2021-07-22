const props = {
  queue: {
    queueID: '234900180359446530',
    queue: 'Name',
    meta: {
      poll_delay: '2021-06-09T12:03:38Z',
      dispatch_events: 'test',
      createdAt: '2021-06-09T12:03:38Z',
      updatedAt: '2021-06-09T12:03:38Z',
      deletedAt: '',
    },
    // consumer: not a string,
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
    label: 'Queue name',
    type: 'b-form-input',
    value: props.queue.queue,
    handle: (props, value) => {
      props.queue.queue = value
    },
  },
  {
    label: 'Poll delay',
    type: 'b-form-input',
    value: props.queue.meta.poll_delay,
    handle: (props, value) => {
      props.queue.meta.poll_delay = value
    },
  },
  {
    label: 'Processing',
    type: 'b-form-checkbox',
    value: props.processing,
    handle: (props, value) => {
      props.processing = value
    },
  },
  {
    label: 'Success',
    type: 'b-form-checkbox',
    value: props.success,
    handle: (props, value) => {
      props.success = value
    },
  },
  {
    label: 'CanCreate',
    type: 'b-form-checkbox',
    value: props.canCreate,
    handle: (props, value) => {
      props.canCreate = value
    },
  },
  // {
  //   label: 'Store',
  //   type: 'b-form-select',
  //   value: props.consumers,
  //   text: props.consumers,
  //   handle: (props, value) => {
  //     props.consumers[0].value = value
  //   },
  // },
]

const scenarios = [
  { label: 'full form',
    props,
  },
  { label: 'empty form',
    props: {
      ...props,
      queue: {
        queue: '',
        meta: {
          poll_delay: '',
        },
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
