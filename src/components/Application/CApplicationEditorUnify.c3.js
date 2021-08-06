import * as c3Controls from '../../views/C3/Controls'
import { default as component } from './CApplicationEditorUnify.vue'

const props = {
  application: {},

  unify: {
    config: '"data"',
    listed: true,
    logo: '/applications/low-code-platform.png',
    pinned: false,
    name: 'Low Code',
    url: '/compose',
  },

  canPin: true,
  processing: false,
  success: false,
  canCreate: true,
}

export default {
  component,
  props,

  controls: [
    c3Controls.input('Name', 'unify.name'),
    c3Controls.input('URL', 'unify.url'),
    c3Controls.textarea('Configuration', 'unify.config'),
    c3Controls.checkbox('Listed', 'unify.listed'),
    c3Controls.checkbox('Pinned', 'unify.pinned'),
    c3Controls.checkbox('Processing', 'processing'),
    c3Controls.checkbox('Success', 'success'),
  ],

  scenarios: [
    { label: 'Full form',
      props,
    },
    { label: 'Empty form',
      props: {
        ...props,
        unify: {
          ...props.unify,
          listed: false,
          name: '',
          config: '',
        },
        canPin: false,
        canCreate: false,
      },
    },
  ],
}
