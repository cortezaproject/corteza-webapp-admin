<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="title"
    />

    <c-external-datasource-editor-info
      :datasource="datasource"
      :processing="info.processing"
      :success="info.success"
    />

    <c-external-datasource-capabilities
      v-if="datasource && datasourceID"
      :datasource="datasource"
      :processing="capabilities.processing"
      :success="capabilities.success"
      class="mt-4"
    />
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CExternalDatasourceEditorInfo from 'corteza-webapp-admin/src/components/Datasource/External/CExternalDatasourceEditorInfo'
import CExternalDatasourceCapabilities from 'corteza-webapp-admin/src/components/Datasource/External/CExternalDatasourceCapabilities'
import { mapGetters } from 'vuex'

export default {
  components: {
    CExternalDatasourceEditorInfo,
    CExternalDatasourceCapabilities,
  },

  i18nOptions: {
    namespaces: 'system.datasources',
    keyPrefix: 'external',
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    datasourceID: {
      type: String,
      default: undefined,
    },
  },

  data () {
    return {
      datasources: [
        { datasourceID: '1', name: 'Primary Data Lake', url: 'dsnsdnsdnnsdnsnd', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: true },
        { datasourceID: '2', name: 'Internal ERP', url: 'nannanananana', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: false },
        { datasourceID: '3', name: 'ELK', url: 'batmaaaan', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: false },
      ],

      datasource: {},

      info: {
        processing: false,
        success: false,
      },

      capabilities: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    title () {
      return this.datasourceID ? this.$t('title.edit') : this.$t('title.create')
    },
  },

  watch: {
    datasourceID: {
      immediate: true,
      handler (datasourceID) {
        if (datasourceID) {
          this.datasource = this.datasources.find(ds => ds.datasourceID === datasourceID)
        } else {
          this.datasource = {}
        }
      },
    },
  },
}
</script>
