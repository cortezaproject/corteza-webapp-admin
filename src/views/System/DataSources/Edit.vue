<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('external.title.edit')"
    />

    <c-external-data-sources-editor-info
      :data-source="dataSource"
      class="mt-4"
    />
  </b-container>
</template>

<script>
import CExternalDataSourcesEditorInfo from 'corteza-webapp-admin/src/components/DataSources/External/CExternalDataSourcesEditorInfo'

export default {
  i18nOptions: {
    namespaces: 'system.datasources',
  },

  components: {
    CExternalDataSourcesEditorInfo,
  },

  props: {
    dataSourceID: {
      type: String,
      required: false,
      default: undefined,
    },
  },

  data () {
    return {
      dataSources: [
        { dataSourceID: '1', name: 'Primary Data Lake', url: 'dsnsdnsdnnsdnsnd', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: true },
        { dataSourceID: '2', name: 'Internal ERP', url: 'nannanananana', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: false },
        { dataSourceID: '3', name: 'ELK', url: 'batmaaaan', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: false },
      ],
      dataSource: {},
    }
  },

  created () {
    this.dataSource = this.dataSources.find(ds => ds.dataSourceID === this.dataSourceID)
  },
}
</script>
