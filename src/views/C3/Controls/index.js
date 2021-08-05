import cmpInput from './C3Input'
import cmpTextarea from './C3Textarea'
import cmpCheckbox from './C3Checkbox'

function generic (component, label, prop) {
  let handlers = {
    value: (props) => {
      console.log(props, prop, 'props.' + prop)
      // eslint-disable-next-line no-eval
      eval('props.' + prop)
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

// if prop needs to be explicitly changed => { change goes here }
export function checkbox (label, prop) {
  return generic(cmpCheckbox, label, prop)
}
