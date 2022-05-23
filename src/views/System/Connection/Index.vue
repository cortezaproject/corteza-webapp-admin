<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('title')"
    />

    <c-connection-basic-info
      :connection="connection"
      class="mb-4"
    />

    <c-external-connection-list
      class="mb-4"
    />

    <c-federated-node-list />
  </b-container>
</template>
<script>
import CConnectionBasicInfo from 'corteza-webapp-admin/src/components/Connection/CConnectionBasicInfo'
import CExternalConnectionList from 'corteza-webapp-admin/src/components/Connection/External/CExternalConnectionList'
import CFederatedNodeList from 'corteza-webapp-admin/src/components/Connection/CFederatedNodeList'

export default {
  name: 'Connection',

  components: {
    CConnectionBasicInfo,
    CExternalConnectionList,
    CFederatedNodeList,
  },

  i18nOptions: {
    namespaces: 'system.connections',
    keyPrefix: 'list',
  },

  data () {
    return {
      connection: {
        connectionID: '1',
        location: 'Ireland',
        ownership: 'ACME Ltd.',
      },
    }
  },
}
</script>
