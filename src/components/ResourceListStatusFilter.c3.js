const props = {
  label: 'Label',
}

const controls = [
  {
    label: 'Excluded',
    type: 'b-form-radio',
    value: (props) => {
      console.log(props)
      return props['excluded-label']
    },
    handle: (props, value) => {
      console.log(props, value)
      props['excluded-label'] = value
    },
  },
  {
    label: 'Inclusive',
    type: 'b-form-radio',
    value: (props) => {
      return props['inclusive-label']
    },
    handle: (props, value) => {
      props['inclusive-label'] = value
    },
  },
  {
    label: 'Exclusive',
    type: 'b-form-radio',
    value: (props) => {
      return props['exclusive-label']
    },
    handle: (props, value) => {
      props['exclusive-label'] = value
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
      label: '',

    },
  },
]

export default {
  props,
  controls,
  scenarios,
}
