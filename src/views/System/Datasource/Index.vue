<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <c-datasource-basic-info
      :datasource="datasource"
      class="mb-4"
    />

    <c-external-datasource-list
      class="mb-4"
    />

    <c-federated-node-list />
  </b-container>
</template>
<script>
import CDatasourceBasicInfo from 'corteza-webapp-admin/src/components/Datasource/CDatasourceBasicInfo'
import CExternalDatasourceList from 'corteza-webapp-admin/src/components/Datasource/External/CExternalDatasourceList'
import CFederatedNodeList from 'corteza-webapp-admin/src/components/Datasource/CFederatedNodeList'

export default {
  name: 'Datasource',

  components: {
    CDatasourceBasicInfo,
    CExternalDatasourceList,
    CFederatedNodeList,
  },

  i18nOptions: {
    namespaces: 'system.datasources',
    keyPrefix: 'list',
  },

  data () {
    return {
      datasource: {
        datasourceID: '1',
        location: 'Ireland',
        ownership: 'ACME Ltd.',
      },
    }
  },
}
</script>
