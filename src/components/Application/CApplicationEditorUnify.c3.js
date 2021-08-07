import { default as component } from './CApplicationEditorUnify.vue'
import { components } from '@cortezaproject/corteza-vue'
const { checkbox } = components.C3.controls

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
  name: 'Unify editor',
  group: ['Applications'],
  component,
  props,

  controls: [
    checkbox('Processing', 'processing'),
    checkbox('Success', 'success'),

    // no need for the following controls, user can change the
    // values via component inputs anyway..

    // input('Name', 'unify.name'),
    // input('URL', 'unify.url'),
    // textarea('Configuration', 'unify.config'),
    // checkbox('Listed', 'unify.listed'),
    // checkbox('Pinned', 'unify.pinned'),
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
