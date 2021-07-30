export function genericControl (type, label, prop) {
  let handlers = {
    value: (props) => eval('props.' + prop),
    handle: (props, currentValue) => eval('props.' + prop + '= currentValue'),
  }
  return {
    label,
    type,
    ...handlers,
  }
}

export function inputControl (label, prop) {
  return genericControl('b-form-input', label, prop)
}

// if prop needs to be explicitly changed => { change goes here }
export function checkboxControl (label, prop) {
  return genericControl('b-form-checkbox', label, prop)
}
