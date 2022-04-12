<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <c-data-sources-editor-info
      :data-source="dataSources"
      class="mb-4"
    />

    <c-external-data-sources-list
      class="mb-4"
    />

    <c-record-federation-list />
  </b-container>
</template>
<script>
import CDataSourcesEditorInfo from 'corteza-webapp-admin/src/components/DataSources/CDataSourcesEditorInfo'
import CExternalDataSourcesList from 'corteza-webapp-admin/src/components/DataSources/External/CExternalDataSourcesList'
import CRecordFederationList from 'corteza-webapp-admin/src/components/DataSources/CRecordFederationList'

export default {
  name: 'DataSources',

  components: {
    CDataSourcesEditorInfo,
    CExternalDataSourcesList,
    CRecordFederationList,
  },

  i18nOptions: {
    namespaces: 'system.datasources',
    keyPrefix: 'list',
  },

  data () {
    return {
      dataSources: {
        dataSourceID: '1',
        location: 'Ireland',
        ownership: 'ACME Ltd.',
      },
    }
  },
}
</script>
