import { default as component } from './CApplicationEditorInfo.vue'
import { components } from '@cortezaproject/corteza-vue'
const { checkbox } = components.C3.controls

const props = {
  application: { applicationID: '' },
  processing: false,
  success: false,
  canCreate: true,
}

export default {
  name: 'Info editor',
  group: ['Applications'],
  component,
  props,

  controls: [
    checkbox('Processing', 'processing'),
    checkbox('Success', 'success'),
    checkbox('CanCreate', 'canCreate'),
    checkbox('Enable delete', {
      value (p) { return p.application.applicationID.length > 0 },
      update (p, val) { p.application.applicationID = val ? '123456789' : '' },
    }),

    // no need for the following controls, user can change the
    // values via component inputs anyway..

    // input('Name', 'application.name'),
    // checkbox('Enabled', 'application.enabled'),
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
