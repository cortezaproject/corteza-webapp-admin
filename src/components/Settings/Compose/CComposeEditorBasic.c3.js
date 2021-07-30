export { default as component } from './CComposeEditorBasic.vue'

export const props = {
  basic: {
    'compose.ui.namespace-switcher.enabled': true,
    'compose.ui.namespace-switcher.defaultOpen': true,
    'compose.page.attachments.max-size': 22,
    'compose.page.attachments.mimetypes': null,
    'compose.record.attachments.max-size': 33,
    'compose.record.attachments.mimetypes': null,
  },
  processing: false,
  success: false,
  canManage: true,
}

export const controls = [
  {
    label: 'Max page size (MB)',
    type: 'b-form-input',
    value: (props) => {
      return props.basic['compose.page.attachments.max-size']
    },
    handle: (props, value) => {
      props.basic['compose.page.attachments.max-size'] = value
    },
  },
  {
    label: 'File page type whitelist',
    type: 'b-form-input',
    value: (props) => {
      return props.basic['compose.page.attachments.mimetypes']
    },
    handle: (props, value) => {
      props.basic['compose.page.attachments.mimetypes'] = value
    },
  },
  {
    label: 'Max record size (MB)',
    type: 'b-form-input',
    value: (props) => {
      return props.basic['compose.record.attachments.max-size']
    },
    handle: (props, value) => {
      props.basic['compose.record.attachments.max-size'] = value
    },
  },
  {
    label: 'File record type whitelist',
    type: 'b-form-input',
    value: (props) => {
      return props.basic['compose.record.attachments.mimetypes']
    },
    handle: (props, value) => {
      props.basic['compose.record.attachments.mimetypes'] = value
    },
  },
  {
    label: 'Enable namespace switcher',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.basic['compose.ui.namespace-switcher.enabled']
    },
    handle: (props, value) => {
      props.basic['compose.ui.namespace-switcher.enabled'] = value
    },
  },
  {
    label: 'Namespace switcher open by default',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.basic['compose.ui.namespace-switcher.defaultOpen']
    },
    handle: (props, value) => {
      props.basic['compose.ui.namespace-switcher.defaultOpen'] = value
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
    label: 'CanManage',
    type: 'b-form-checkbox',
    value: (props) => {
      return props.canManage
    },
    handle: (props, value) => {
      props.canManage = value
    },
  },
]

export const scenarios = [
  { label: 'Full form',
    props,
  },
  { label: 'Empty form',
    props: {
      basic: {
        'compose.ui.namespace-switcher.enabled': false,
        'compose.ui.namespace-switcher.defaultOpen': false,
        'compose.page.attachments.max-size': 0,
        'compose.page.attachments.mimetypes': null,
        'compose.record.attachments.max-size': 0,
        'compose.record.attachments.mimetypes': null,
      },
      canManage: false,
    },
  },
]
