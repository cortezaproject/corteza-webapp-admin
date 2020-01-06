<script>
import listHelpers from 'corteza-webapp-admin/src/mixins/listHelpers'
import systemAutomationView from 'corteza-webapp-admin/src/views/System/Automation/Index.vue'

export default {
  extends: systemAutomationView,

  mixins: [
    listHelpers,
  ],

  i18nOptions: {
    namespaces: [ 'compose.automation' ],
    keyPrefix: 'list',
  },

  methods: {
    items () {
      return this.procListResults(this.$ComposeAPI.automationList(this.encodeListParams()))
    },
  },
}
</script>
