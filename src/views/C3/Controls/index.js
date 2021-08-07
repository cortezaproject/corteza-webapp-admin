import cmpInput from './C3Input'
import cmpTextarea from './C3Textarea'
import cmpCheckbox from './C3Checkbox'
import cmpSelect from './C3Select.vue'

function makeHandler (prop) {
  return {
    value: (props) => {
      // eslint-disable-next-line no-eval
      return eval('props.' + prop)
    },

    // eslint-disable-next-line no-eval
    update: (props, value) => eval('props.' + prop + '= value'),
  }
}

function generic (component, { handler, props }) {
  if (typeof handler === 'string') {
    handler = makeHandler(handler)
  }

  return {
    component,
    props,
    ...handler,
  }
}

export default generic

export function input (label, handler) {
  return generic(cmpInput, { handler, props: { label } })
}

export function textarea (label, handler) {
  return generic(cmpTextarea, { handler, props: { label } })
}

export function checkbox (label, handler) {
  return generic(cmpCheckbox, { handler, props: { label } })
}

export function select (label, handler, options) {
  return generic(cmpSelect, {
    handler,
    props: {
      label,
      options,
    },
  })
}
