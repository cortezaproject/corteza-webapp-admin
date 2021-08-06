import cmpInput from './C3Input'
import cmpTextarea from './C3Textarea'
import cmpCheckbox from './C3Checkbox'
import cmpSelect from './C3Select.vue'

function generic (component, label, prop) {
  let handlers = {
    value: (props) => {
      // eslint-disable-next-line no-eval
      return eval('props.' + prop)
    },

    // eslint-disable-next-line no-eval
    update: (props, value) => eval('props.' + prop + '= value'),
  }

  return {
    label,
    component,
    ...handlers,
  }
}

export default generic

export function input (label, prop) {
  return generic(cmpInput, label, prop)
}

export function textarea (label, prop) {
  return generic(cmpTextarea, label, prop)
}

export function checkbox (label, prop) {
  return generic(cmpCheckbox, label, prop)
}

export function select (label, prop) {
  return generic(cmpSelect, label, prop)
}
