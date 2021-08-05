import * as c3Controls from '../../views/C3/Controls'
import { default as component } from './CApplicationEditorInfo.vue'

const props = {
  application: {
    applicationID: '234900176853008386',
    createdAt: '2021-06-09T12:03:36Z',
    enabled: true,
    name: 'Low Code',
  },
  processing: false,
  success: false,
  canCreate: true,
}

export default {
  component,
  props,

  controls: [
    c3Controls.input('Name', 'application.name'),
    c3Controls.checkbox('Enabled', 'application.enabled'),
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
        application: {
          ...props.application,
          enabled: false,
          name: '',
        },
        canCreate: false,
      },
    },
  ],
}
