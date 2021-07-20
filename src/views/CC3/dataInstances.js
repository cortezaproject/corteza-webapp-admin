import CApplicationEditorInfo from '../../components/Application/CApplicationEditorInfo.vue'
import CApplicationEditorUnify from '../../components/Application/CApplicationEditorUnify.vue'
import CC3ApplicationEditorInfo from '../../components/Application/CC3ApplicationEditorInfo.c3'
import CC3ApplicationEditorUnify from '../../components/Application/CC3ApplicationEditorUnify.c3'

export default {
  components: [
    {
      cmp: CApplicationEditorInfo,
      def: CC3ApplicationEditorInfo,
    },
    {
      cmp: CApplicationEditorUnify,
      def: CC3ApplicationEditorUnify,
    },
  ],
}
