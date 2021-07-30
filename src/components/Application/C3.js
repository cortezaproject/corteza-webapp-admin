// INFO: this is what we can do for now
// https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
// when/if ECMAScript® 2O21 supports direct exports, we'll be able to do one-liner:
// export * as CApplicationEditorInfo from './CApplicationEditorUnify.c3'
//
// (no need to keep this note, remove it please)

import * as CApplicationEditorInfo from './CApplicationEditorInfo.c3'
import * as CApplicationEditorUnify from './CApplicationEditorUnify.c3'

export {
  CApplicationEditorInfo,
  CApplicationEditorUnify,
}
