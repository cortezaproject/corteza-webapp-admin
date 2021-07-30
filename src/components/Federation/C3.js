export { default as component } from './CFederationEditorInfo.vue'

export const props = {
  node: {
    name: 'Name',
    baseURL: 'https://google.com/federation',
    contact: 'Admin',
    status: 'Good',
    updatedAt: '2021-06-09T12:03:36Z',
    deletedAt: '',
    createdAt: '2021-06-09T12:03:36Z',
    nodeID: '234900176853008386',
  },
  processing: false,
  success: false,
}

function inputControl (label, value) {
  return {
    label,
    type: 'b-form-input',
    value: (props) => {
      // return eval(value)
    },
    handle: (props, currentValue) => {
    },
  }
}

export const controls = [
  inputControl('Name', 'node.name'),
]

// export const controls = [
//   {
//     label: 'Name',
//     type: 'b-form-input',
//     value: (props) => {
//       return props.node.name
//     },
//     handle: (props, value) => {
//       props.node.name = value
//     },
//   },
//   {
//     label: 'BaseURL',
//     type: 'b-form-input',
//     value: (props) => {
//       return props.node.baseURL
//     },
//     handle: (props, value) => {
//       props.node.baseURL = value
//     },
//   },
//   {
//     label: 'Contact',
//     type: 'b-form-input',
//     value: (props) => {
//       return props.node.contact
//     },
//     handle: (props, value) => {
//       props.node.contact = value
//     },
//   },
//   {
//     label: 'Processing',
//     type: 'b-form-checkbox',
//     value: (props) => {
//       return props.processing
//     },
//     handle: (props, value) => {
//       props.processing = value
//     },
//   },
//   {
//     label: 'Success',
//     type: 'b-form-checkbox',
//     value: (props) => {
//       return props.success
//     },
//     handle: (props, value) => {
//       props.success = value
//     },
//   },
// ]

export const scenarios = [
  { label: 'Full form',
    props,
  },
  { label: 'Empty form',
    props: {
      ...props,
      node: {
        ...props.node,
        name: '',
        baseURL: '',
        contact: '',
      },
    },
  },
]
